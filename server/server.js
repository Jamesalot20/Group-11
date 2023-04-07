const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://James:xxixQtTzY70iUVtP@ttdatabase.khylsrk.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("your_database_name");
    return db;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

module.exports = connect;
