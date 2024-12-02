const tf = require("@tensorflow/tfjs");
const ApiError = require("../exceptions/ApiError");

class LoadModelService {
  static async loadModel() {
    try {
      const model = await tf.loadLayersModel(process.env.MODEL_URL);
      return model;
    } catch (error) {
      throw new ApiError(500, "error", error.message);
    }
  }
}

module.exports = LoadModelService;
