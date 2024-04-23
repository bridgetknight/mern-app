const mongoose = require("mongoose");

// location schema/model
const locationSchema = new mongoose.Schema(
  {
    username: { 
        type: String, 
        ref: "Users" 
    },
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
    zipCode: {
      type: Number,
      required: true,
      label: "zipCode"
    },
    state: {
        type: String,
        required: true,
        label: "state"
    },
    label: {
        type: String,
        required: false,
        label: "label"
    }
  },
  { collection: "locations" }
);

module.exports = mongoose.model('locations', locationSchema)