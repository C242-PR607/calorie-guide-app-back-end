const PredictSchema = require("../schemas/predict");
const InferenceService = require("../services/inference.service");
const LoadModelService = require("../services/loadModel.service");
const StoreDataService = require("../services/storeData.service");
const ApiResponse = require("../utils/response");

class PredictController {
  static async predict(req, res) {
    const { age, height, weight, gender, activity, foods } = req.body;
    const { email, token } = req.user;

    PredictSchema.payload().parse({ age, height, weight, gender, activity, foods });

    const model = await LoadModelService.loadModel();

    const data = await InferenceService.BMRAndCalories(model, { age, height, weight, gender, activity, foods }, email, token);

    data.foodProportions = await InferenceService.foodPortions(foods, data.calories);

    await StoreDataService.storeData({ age: data.age, height: data.height, weight: data.weight, gender: data.gender, activity: data.activity.level, BMR: parseInt(data.basalMetabolicRate.replace(" cal", "")), calories: data.calories });

    ApiResponse.success(res, 200, "Prediction calculated successfully", data);
  }
}

module.exports = PredictController;
