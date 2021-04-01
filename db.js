const mongoClient = require('mongodb').MongoClient;
const databaseUrl = "mongodb+srv://teamcplusc:we!are!team!c!plus!c!@cluster0.g0fvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongoClient(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoClient.connect(databaseUrl, function (err, client) {
  if (err) throw err;
  const dbo = client.db("test");

  // Create the collection of vaccination sites if it does not exist
  const sitesCollection = dbo.collection("sites");
  if (sitesCollection == null) {
    dbo.createCollection("sites", (err) => {
      if (err) throw err;
      console.log("Created the collections of vaccination sites");
    });
    sitesCollection = dbo.collection("sites");
  }

  const siteDocs = [
    {
      name: "Walgreens",
      getHtml: "www.walgreens.com",
      availVaccines: 80,
      location: "Providence",
      ageGroup: "Seniors",
      clinicHours: "9:00am-5:00pm",
      vaccineOffered: "Pfizer-BioNTech",
    },
    {
      name: "CVS",
      getHtml: "www.cvs.com",
      availVaccines: 100,
      location: "Providence",
      ageGroup: "All",
      clinicHours: "9:00am-5:00pm",
      vaccineOffered: "Moderna",
    },
  ];

  // Now, insert the penguinDoc into the collection
  // sitesCollection.insertOne(siteDoc, (err, res) => {
  //   if (err) throw err;
  //   console.log("Doc inserted into collection");
  // });

  const options = { ordered: true };
  const result = sitesCollection.insertMany(siteDocs, options);

  // TODO: Use a find query to print the second and the fourth elements inside it!
  const query1 = { name: "CVS" }
  const first = sitesCollection.find(query1);
  first.forEach((d) => {
    console.log(d);
  })

  sitesCollection.drop();
  // close connection when done
  client.close();
});