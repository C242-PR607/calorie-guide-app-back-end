const { z } = require("zod");

class PredictSchema {
  static payload() {
    const genderEnum = z.enum(["male", "female"]);
    const activityEnum = z.enum(["sedentary", "lightly active", "moderately active", "very active", "extra active"]);

    return z.object({
      age: z.number({ invalid_type_error: "Age must be a number" }).min(1, "Age must be at least 1").max(100, "Age must be at most 100").optional(),
      height: z.number({ invalid_type_error: "Height must be a number" }).min(1, "Height must be at least 1").optional(),
      weight: z.number({ invalid_type_error: "Weight must be a number" }).min(1, "Weight must be at least 1").optional(),
      gender: z
        .string({ invalid_type_error: "Gender must be a string" })
        .toLowerCase()
        .refine((value) => genderEnum.options.includes(value), "Invalid gender. Valid options are: Male, Female.")
        .optional(),
      activity: z
        .string({ required_error: "Activity is required", invalid_type_error: "Activity must be a string" })
        .toLowerCase()
        .refine((value) => activityEnum.options.includes(value), {
          message: "Invalid activity level. Valid options are: Sedentary, Lightly active, Moderately active, Very active, Extra active.",
        }),
      foods: z
        .array(z.string({ invalid_type_error: "Foods must be an array of strings" }))
        .min(1, "Food cannot be empty")
        .max(10, "You can only input up to 10 foods"),
    });
  }
}

module.exports = PredictSchema;
