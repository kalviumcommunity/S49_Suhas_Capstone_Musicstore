const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON request bodies

let instruments = [
    { id: 1, name: "Guitar", type: "String" },
    { id: 2, name: "Drums", type: "Percussion" },
    { id: 3, name: "Piano", type: "Keyboard" }
];

// GET all instruments
app.get("/instruments", (req, res) => {
    res.json(instruments);
});

// POST a new instrument
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

// ✅ PUT endpoint to update an instrument by ID
app.put("/instruments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, type } = req.body;

    const instrument = instruments.find(inst => inst.id === id);
    if (!instrument) {
        return res.status(404).json({ message: "Instrument not found." });
    }

    if (name) instrument.name = name;
    if (type) instrument.type = type;

    res.json({ message: "Instrument updated successfully", instrument });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
