// 1. Create an Express app with a single end-point.

// Create a new JS file named messages-api.js.

// Create an Express app in that file. The app should listen for requests
//on port 3000.

// Add a single endpoint to the app that responds
//to POST requests to the /messages URI(Uniform Resource Identifier).

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
app.use(jsonParser);

const port = 3000;

function onListen() {
  console.log(`Listening on port ${port}`);
}

app.listen(port, onListen);

app.post("/messages", (request, response) => {
  console.log("body text:", request.body.text);
  if (!request.body.text || request.body.text === "") {
    return response.status(400).send("Bad Request");
  } else {
    return response.send({ message: "Message received loud and clear" });
  }
});
