const { z } = require("zod");

class UserSchema {
  static register() {
    const register = z
      .object({
        email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email address" }),
        password: z
          .string({ required_error: "Password is required", invalid_type_error: "Password must be a string" })
          .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
          .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
          .regex(/(?=.*[0-9])/, "Password must contain at least one number")
          .regex(/^(?=.*[@$!%^*?&()\-_=+[{\]};:,<.>|~])/, "Password must contain at least one special character")
          .min(6, "Password must be at least 6 characters")
          .max(20, "Password must be at most 20 characters"),
        confirmPassword: z.string({ required_error: "Confirm Password is required", invalid_type_error: "Confirm Password must be a string" }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    return register;
  }

  static verifyOTP() {
    const verifyOTP = z.object({ otp: z.string({ required_error: "OTP is required", invalid_type_error: "OTP must be a string" }).min(6, "OTP must be at least 6 characters").max(6, "OTP must be at most 6 characters") });

    return verifyOTP;
  }

  static addUserInfo() {
    const genderEnum = z.enum(["male", "female"]);

    const addUserInfo = z.object({
      name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
      age: z.number({ required_error: "Age is required", invalid_type_error: "Age must be a number" }).min(1, "Age must be at least 1").max(100, "Age must be at most 100"),
      height: z.number({ required_error: "Height is required", invalid_type_error: "Height must be a number" }).min(1, "Height must be at least 1"),
      weight: z.number({ required_error: "Weight is required", invalid_type_error: "Weight must be a number" }).min(1, "Weight must be at least 1"),
      gender: z.string({ required_error: "Gender is required", invalid_type_error: "Gender must be a string" }).toLowerCase().refine((value) => genderEnum.options.includes(value), "Invalid gender. Valid options are: Male, Female."),
    });

    return addUserInfo;
  }

  static login() {
    const login = z.object({
      email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email address" }),
      password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
    });

    return login;
  }

  static forgotPassword() {
    const forgotPassword = z.object({ email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email address" }) });

    return forgotPassword;
  }

  static resetPassword() {
    const resetPassword = z
      .object({
        password: z
          .string({ required_error: "Password is required", invalid_type_error: "Password must be a string" })
          .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
          .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
          .regex(/(?=.*[0-9])/, "Password must contain at least one number")
          .regex(/^(?=.*[@$!%^*?&()\-_=+[{\]};:,<.>|~])/, "Password must contain at least one special character")
          .min(6, "Password must be at least 6 characters")
          .max(20, "Password must be at most 20 characters"),
        confirmPassword: z.string({ required_error: "Confirm Password is required", invalid_type_error: "Confirm Password must be a string" }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    return resetPassword;
  }

  static updateProfile() {
    const updateProfile = z.object({
      name: z.string({ invalid_type_error: "Name must be a string" }).min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters").optional(),
      age: z.number({ invalid_type_error: "Age must be a number" }).min(1, "Age must be at least 1").max(100, "Age must be at most 100").optional(),
      height: z.number({ invalid_type_error: "Height must be a number" }).min(1, "Height must be at least 1").optional(),
      weight: z.number({ invalid_type_error: "Weight must be a number" }).min(1, "Weight must be at least 1").optional(),
      gender: z.enum(["Male", "Female"], { invalid_type_error: "Gender must be a string" }).optional(),
    });

    return updateProfile;
  }

  static changePassword() {
    const changePassword = z
      .object({
        oldPassword: z.string({ required_error: "Old Password is required", invalid_type_error: "Old Password must be a string" }),
        newPassword: z
          .string({ required_error: "Password is required", invalid_type_error: "Password must be a string" })
          .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
          .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
          .regex(/(?=.*[0-9])/, "Password must contain at least one number")
          .regex(/^(?=.*[@$!%^*?&()\-_=+[{\]};:,<.>|~])/, "Password must contain at least one special character")
          .min(6, "Password must be at least 6 characters")
          .max(20, "Password must be at most 20 characters"),
        confirmPassword: z.string({ required_error: "Confirm Password is required", invalid_type_error: "Confirm Password must be a string" }),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    return changePassword;
  }

  static deleteAccount() {
    const deleteAccount = z.object({
      password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
    });

    return deleteAccount;
  }
}

module.exports = UserSchema;
