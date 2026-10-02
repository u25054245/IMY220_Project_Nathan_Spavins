const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
    const uri = process.env.MONGO_URI;
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("Exposure");
    console.log("Connected succsesfully to MongoDB");
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };