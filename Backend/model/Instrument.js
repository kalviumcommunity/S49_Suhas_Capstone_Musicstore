import mongoose from "mongoose";

const instrumentSchema = new mongoose.Schema({
  name: String,
  image: String,
  brand: String,
  price: Number,
  rating: Number,
  description: String,
});

const Instrument = mongoose.model("Instrument", instrumentSchema);
export default Instrument;
