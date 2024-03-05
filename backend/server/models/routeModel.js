const mongoose = require("mongoose");

//route schema/model
const routeSchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userSchema" 
    },
    start: {
      type: Location,
      required: true,
      label: "start",
    },
    destination: {
      type: Location,
      required: true,
      label: "destination",
    },
    locations: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "locationModel"
        }],
        validate: [arrayLimit, "{PATH} must have at least 2 locations."]
      },
      label: "stations"
  },
  { collection: "routes" }
);

function arrayLimit(val) {
    return val.length >= 2;
  };

module.exports = mongoose.model('routes', routeSchema)