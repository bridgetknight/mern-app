const mongoose = require("mongoose");

//location schema/model
const locationSchema = new mongoose.Schema(
  {
    streetAddress: {
      type: String,
      required: true,
      label: "streetAddress",
    },
    city: {
      type: String,
      required: true,
      label: "city",
    },
    state: {
      type: String,
      required: true,
      label: "state",
    },
    postalCode: {
      type: Number,
      required: true,
      label: "postalCode"
    },
  },
  { collection: "location" }
);

module.exports = mongoose.model('location', locationSchema)