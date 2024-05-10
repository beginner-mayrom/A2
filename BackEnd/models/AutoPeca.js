const mongoose = require("mongoose");

const AutoPecaSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },

    pieces: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AutoPeca", AutoPecaSchema);
