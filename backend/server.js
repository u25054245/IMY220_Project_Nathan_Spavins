const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.post("/sign-in", (req, res) => {
    const { email, password } = req.body;

    const dummydata = {
        id: 12234,
        email: email,
    }

    res.status(200).json(dummydata);
})

app.post("/sign-up", (req, res) => {
    const { email, password } = req.body;

    const dummydata = {
        id: 12234,
        email: email,
    }

    res.status(201).json({
        message: "User created, welcome!",
        data: dummydata,
    });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});