const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://teamcplusc:we!are!team!c!plus!c!@cluster0.g0fvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// const rp = require('request-promise');


const app = express();
const port = process.env.PORT || 5000;

app.listen(3000);
app.set('port',3000);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});


// app.get('/api/available-sites', (req, res) => {
// // https://www.vaccinateri.org/clinic/search?page=4
// // https://www.cvs.com/immunizations/covid-19-vaccine?icid=cvs-home-hero1-link2-coronavirus-vaccine
//   let url = "https://www.vaccinateri.org/clinic/search?page=4";
//   rp(url)
//   .then(function(html){
//     //success!
//     console.log(html);
//   })
//   .catch(function(err){
//     //handle error
//   });

  


//   // client.connect(err => {
//   //   const collection = client.db("test").collection("devices");
//   //   // perform actions on the collection object
//   //   client.close();
//   // });
//   res.send({ express: 'Hello From Express' });  // send back data about available sites
// });

// app.post('/api/subscribe', (req, res) => {
//   // received user's info
//   // add to database of users
//   // respond with OK
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));