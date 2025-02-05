const express = require("express");
const app = express();
const PORT = 3000;

// Sample data (replace with database later)
const instruments = [
    { id: 1, name: "Guitar", type: "String" },
    { id: 2, name: "Drums", type: "Percussion" },
    { id: 3, name: "Piano", type: "Keyboard" }
];

// GET request to fetch all instruments
app.get("/instruments", (req, res) => {
    res.json(instruments);
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
