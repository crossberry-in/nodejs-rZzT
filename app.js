const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const filePath = "data.json";

// POST route → save JSON
app.post("/save", (req, res) => {
    const name = req.body.name;
    const message = req.body.message;

    // Read existing JSON or create empty
    let data = [];
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath));
    }

    // New record
    const newData = {
        name: name,
        message: message,
        time: new Date().toISOString()
    };

    data.push(newData);

    // Save JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

    res.send("Node.js மூலம் JSON கோப்பில் டேட்டா சேமிக்கப்பட்டது!");
});

// Server start
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
