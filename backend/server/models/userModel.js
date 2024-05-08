const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      label: "firstName",
    },
    lastName: {
      type: String,
      required: true,
      label: "lastName",
    },
    username: {
      type: String,
      required: true,
      label: "username",
    },
    email: {
      type: String,
      required: true,
      label: "email",
      unique: true,
      lowercase: true,
    },
    password: {
      required: true,
      type: String,
      min: 8,
    },
    biography: {
      type: String,
      default: "",
    },
    savedLocations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    savedRoutes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route",
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, collection: "users" }
);

module.exports = mongoose.model("Users", newUserSchema);
