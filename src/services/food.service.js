const FoodModel = require("../models/food");
const { v4: uuidv4 } = require("uuid");

class FoodService {
  static async getFoods(limit, offset, search) {
    const [foods, total] = await Promise.all([FoodModel.find(limit, offset, search), FoodModel.count(search)]);

    const totalPages = Math.ceil(total / limit);

    foods.map((food) => (food.id = uuidv4()));

    const data = {
      foods: foods,
      totalItems: total,
      itemsPerPage: limit,
      totalPages: totalPages,
      currentPage: offset / limit + 1,
      previousPage: offset > 0 ? offset / limit : null,
      nextPage: offset + limit < total ? (offset + limit ) / limit + 1 : null,
    };

    return data;
  }
}

module.exports = FoodService;
