const PredictModel = require("../models/predict");

class StoreDataService {
  static async storeData(data) {
    const predict = await PredictModel.create(data);

    return predict;
  }
}

module.exports = StoreDataService;
