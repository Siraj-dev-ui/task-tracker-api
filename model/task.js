const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "in-complete",
    },
    priority: {
      type: String,
      require: true,
    },
    /* user_Id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    }, */
    user_Id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
