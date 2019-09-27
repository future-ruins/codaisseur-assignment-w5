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

  // implement
  console.count();

  if (!request.body.text || request.body.text === "") {
    return response.status(400).send("Bad Request");
  } else {
    return response.send({ message: "Message received loud and clear" });
  }
});
