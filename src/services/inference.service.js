const tf = require("@tensorflow/tfjs");
const ValidationError = require("../exceptions/ValidationError");
const FoodModel = require("../models/food");
const UserModel = require("../models/user");
const AuthenticationError = require("../exceptions/AuthenticationError");

class InferenceService {
  static async BMRAndCalories(model, payload, email, token) {
    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9,
    };

    let activityLevel;

    if (payload.activity.toLowerCase() === "sedentary") {
      activityLevel = "sedentary";
    } else if (payload.activity.toLowerCase() === "lightly active") {
      activityLevel = "lightlyActive";
    } else if (payload.activity.toLowerCase() === "moderately active") {
      activityLevel = "moderatelyActive";
    } else if (payload.activity.toLowerCase() === "very active") {
      activityLevel = "veryActive";
    } else if (payload.activity.toLowerCase() === "extra active") {
      activityLevel = "extraActive";
    }

    const means = [40.96729336, 69.62439272, 169.90804417];
    const vars = [13.57906225, 15.03000273, 9.88924823];

    if (payload.age && payload.height && payload.weight && payload.gender) {
      const male = payload.gender.toLowerCase() === "male" ? 1 : 0;
      const female = payload.gender.toLowerCase() === "female" ? 1 : 0;

      const basalMetabolicRate = [(payload.age - means[0]) / vars[0], (payload.weight - means[1]) / vars[1], (payload.height - means[2]) / vars[2], female, male];

      const tensor = tf.tensor([basalMetabolicRate]);
      const prediction = await model.predict(tensor).dataSync();

      const calories = Math.round(prediction[0] * activityFactors[activityLevel]);

      const data = {
        age: payload.age,
        height: payload.height,
        weight: payload.weight,
        gender: payload.gender.charAt(0).toUpperCase() + payload.gender.slice(1),
        activity: {
          level: payload.activity.charAt(0).toUpperCase() + payload.activity.slice(1),
          factor: activityFactors[activityLevel],
        },
        basalMetabolicRate: Math.round(prediction[0]).toString() + " cal",
        calories: calories.toString() + " cal",
      };

      return data;
    } else {
      const user = await UserModel.findByEmail(email);

      if (!user) {
        throw new ValidationError("User not found");
      }

      if (user.token === null) throw new AuthenticationError("User not logged in");

      if (user.token !== token) throw new AuthenticationError("Invalid token");

      const male = user.gender.toLowerCase() === "male" ? 1 : 0;
      const female = user.gender.toLowerCase() === "female" ? 1 : 0;

      const basalMetabolicRate = [(user.age - means[0]) / vars[0], (user.weight - means[1]) / vars[1], (user.height - means[2]) / vars[2], female, male];

      const tensor = tf.tensor([basalMetabolicRate]);
      const prediction = await model.predict(tensor).dataSync();

      const calories = Math.round(prediction[0] * activityFactors[activityLevel]);

      const data = {
        age: user.age,
        height: user.height,
        weight: user.weight,
        gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
        activity: {
          level: payload.activity.charAt(0).toUpperCase() + payload.activity.slice(1),
          factor: activityFactors[activityLevel],
        },
        basalMetabolicRate: Math.round(prediction[0]).toString() + " cal",
        calories: calories.toString() + " cal",
      };

      return data;
    }
  }

  static async foodPortions(foods, calories) {
    const errors = [];

    const selectedFoods = await Promise.all(
      foods?.map(async (food) => {
        const result = await FoodModel.findByName(food.charAt(0).toUpperCase() + food.slice(1));

        if (!result) {
          errors.push({
            foodItem: food,
            message: `${food} not found`,
          });
        }

        return result;
      })
    );

    if (errors.length > 0) {
      throw new ValidationError("Some foods not found", errors);
    }

    const caloriesPerFood = parseInt(calories.replace(" cal", "")) / foods?.length;

    const data = selectedFoods.map((food) => {
      return {
        food: food.FoodItem,
        calories: food.Cals_per100grams,
        portion: Math.round((parseInt(food.Cals_per100grams.replace(" cal", "")) / caloriesPerFood) * 100).toString() + "g",
      };
    });

    return data;
  }
}

module.exports = InferenceService;
