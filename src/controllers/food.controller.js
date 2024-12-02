const FoodService = require("../services/food.service");
const ApiResponse = require("../utils/response");

class FoodController {
  static async getFoods(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.q;

    const offset = (page - 1) * limit;

    const data = await FoodService.getFoods(limit, offset, search);

    ApiResponse.success(res, 200, "Foods fetched successfully", data);
  }
}

module.exports = FoodController;