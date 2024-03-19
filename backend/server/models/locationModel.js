const mongoose = require("mongoose");

// location schema/model
const locationSchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
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
        type: String,
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

module.exports = mongoose.model('Location', locationSchema)