// models/Instrument.js

const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const Instrument = mongoose.model("Instrument", instrumentSchema);
module.exports = Instrument;
