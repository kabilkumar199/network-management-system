import * as Yup from "yup";

// Common reusable validation schemas for input fields
export const usernameSchema = Yup.string()
  .min(3, "Username must be at least 3 characters")
  .max(32, "Username must be at most 32 characters")
  .required("Username is required");

export const passwordSchema = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .max(64, "Password must be at most 64 characters")
  .required("Password is required");

// Example: combine for login form
export const loginValidationSchema = Yup.object({
  username: usernameSchema,
  password: passwordSchema,
});
