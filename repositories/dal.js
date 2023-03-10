const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

dotenv.config();

mongoose.set("strictQuery", true);
//connect with mongoose
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to MongoDB")
);

//create new user
async function create(username, email, password) {
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error("Something went wrong with bcrypt");

  const hash = await bcrypt.hash(password, salt);
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

  const isMatch = await bcrypt.compare(password, user.password);
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

module.exports = {
  create,
  findOne,
  updateUserBalance,
  all,
  userLogin,
};
