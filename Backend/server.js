// server.js

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./database/db');
const Instrument = require('./model/Instrument');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());


app.get("/instruments", async (req, res) => {
  try {
    const instruments = await Instrument.find();
    res.json(instruments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /instruments/:id
 * @desc    Get a single instrument by ID
 */
app.get("/instruments/:id", async (req, res) => {
  try {
    const instrument = await Instrument.findById(req.params.id);
    if (!instrument) return res.status(404).json({ message: "Instrument not found" });
    res.json(instrument);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST /instruments
 * @desc    Create a new instrument
 */
app.post("/instruments", async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ message: "Name and type are required" });
  }

  try {
    const newInstrument = new Instrument({ name, type });
    const savedInstrument = await newInstrument.save();
    res.status(201).json(savedInstrument);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PUT /instruments/:id
 * @desc    Update an existing instrument
 */
app.put("/instruments/:id", async (req, res) => {
  const { name, type } = req.body;

  try {
    const instrument = await Instrument.findById(req.params.id);
    if (!instrument) return res.status(404).json({ message: "Instrument not found" });

    if (name) instrument.name = name;
    if (type) instrument.type = type;

    const updatedInstrument = await instrument.save();
    res.json({ message: "Instrument updated", updatedInstrument });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   DELETE /instruments/:id
 * @desc    Delete an instrument
 */
app.delete("/instruments/:id", async (req, res) => {
  try {
    const instrument = await Instrument.findById(req.params.id);
    if (!instrument) return res.status(404).json({ message: "Instrument not found" });

    await instrument.remove();
    res.json({ message: "Instrument deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
