const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    console.log("ssssssssssssss");
    const database = client.db("xxx");
    const movies = database.collection("one");
    // Query for a movie that has the title 'The Room'
    const query = { title: "The Room" };
    const options = {
      // sort matched documents in descending order by rating
      sort: { rating: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    const movie = await movies.findOne( { title: "The Room" });
    // since this method returns the matched document, not a cursor, print it directly
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);