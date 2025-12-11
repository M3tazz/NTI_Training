const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.DATABASE_URI;
// console.log(uri);
const client = new MongoClient(uri);

(async () => {
  try {
    await client.connect();
    const school = client.db("school");
    const students = school.collection("students");
    // insert one
    await students.insertOne({
      name: "Mohamed",
      age: 25,
    });
    // insert many
    await students.insertMany([
      { name: "Mona", age: 45 },
      { name: "Ola", age: 62 },
    ]);
    // find all documents
    console.log(await students.find().toArray());
    // find documents with a condition
    console.log(await students.find({ age: { $gt: 55 } }).toArray());
    // update one
    await students.updateOne({ name: "Ola" }, { $set: { age: 20 } });
    // delete one
    await students.deleteOne({ name: "Mona" });
    console.log(await students.find().toArray());

    console.log("connected");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
})();
