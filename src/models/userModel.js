import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email"],
      validate: [validator.isEmail, "Please Provide a Valid Email"],
    },
    picture: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [6, "Please make sure the password is more than 6 characters"],
      maxLength: [
        128,
        "Please make sure the password range should be between 6 to 128 Charaters",
      ],
    },
  },
  { collection: "users", timestamps: true }
);

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
