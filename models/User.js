import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  checkingBalance: {
    type: Number,
    default: 0,
  },
  savingsBalance: {
    type: Number,
    default: 0,
  },
});

export default User = model("user", UserSchema);
