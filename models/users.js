const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contact",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

schema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

schema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});

const User = mongoose.model("user", schema);

module.exports = {
  User,
};
