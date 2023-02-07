import { connect, set } from "mongoose";
import { config } from "dotenv";
import { genSalt, hash as _hash, compare } from "bcryptjs";
import User from "../models/User";

config();

set("strictQuery", true);
//connect with mongoose
connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to MongoDB")
);

//create new user
async function create(username, email, password) {
  const salt = await genSalt(10);
  if (!salt) throw Error("Something went wrong with bcrypt");

  const hash = await _hash(password, salt);
  if (!hash) throw Error("Something went wrong hashing the password");

  const newUser = new User({
    username,
    email,
    password: hash,
  });

  const savedUser = await newUser.save();

  if (!savedUser) throw Error("Something went wrong saving the user");
}

async function userLogin(username, password) {
  const user = await User.findOne({ username });
  if (!user) throw Error("Invalid credentials");

  const isMatch = await compare(password, user.password);
  if (!isMatch) throw Error("Invalid credentials");

  return user;
}

//get all users
async function all() {
  try {
    return await User.find({});
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

//get one user by username.
function findOne(username) {
  return User.findOne({ username });
}

//update user checking/savings
async function updateUserBalance(username, checkingAmount, savingsAmount) {
  return User.findOneAndUpdate(
    { username },
    {
      $inc: {
        checkingBalance: checkingAmount,
        savingsBalance: savingsAmount,
      },
    },
    { returnOriginal: false }
  );
}

export default {
  create,
  findOne,
  updateUserBalance,
  all,
  userLogin,
};
