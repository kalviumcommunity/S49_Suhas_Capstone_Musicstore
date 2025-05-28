const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // Needed to parse JSON in POST requests

let instruments = [

// Sample data (replace with database later)
const instruments = [
    { id: 1, name: "Guitar", type: "String" },
    { id: 2, name: "Drums", type: "Percussion" },
    { id: 3, name: "Piano", type: "Keyboard" }
];


// GET all instruments

// GET request to fetch all instruments

app.get("/instruments", (req, res) => {
    res.json(instruments);
});


// ✅ POST new instrument
app.post("/instruments", (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
        return res.status(400).json({ message: "Name and type are required." });
    }

    const newInstrument = {
        id: instruments.length + 1,
        name,
        type
    };
    instruments.push(newInstrument);
    res.status(201).json(newInstrument);
});


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
