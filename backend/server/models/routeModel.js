const mongoose = require("mongoose");
const Location = require("./locationModel");

//route schema/model
const routeSchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users" 
    },
    start: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
      }],
      required: true,
      label: "start",
    },
    destination: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
      }],
      required: true,
      label: "destination",
    },
    locations: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Locations"
        }],
        validate: [arrayLimit, "{PATH} must have at least 2 locations."],
        label: "locations",
        required: true
      },
  },
  { collection: "routes" }
);

function arrayLimit(val) {
    return val.length >= 2;
  };

module.exports = mongoose.model('routes', routeSchema)