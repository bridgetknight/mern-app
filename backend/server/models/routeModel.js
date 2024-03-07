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
    stops: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Locations"
        }],
        validate: {
          validator: function(arr) {
              return arr.length >= 2;
          },
          message: '{PATH} must have at least 2 locations.'
      },
        label: "stops",
        required: true
      },
    label: {
      type: String,
      required: false,
      label: "label"
    }
  },
  { collection: "routes" }
);

module.exports = mongoose.model('routes', routeSchema)