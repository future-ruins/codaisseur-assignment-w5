# REST APIs Homework Assignment
This assignment is made up of two sections.
The sections can be completed in _any_ order.
If you get stuck on one section, take a break and try another.
Complete as many steps from each section as you can.
_Note: Codaisseur uses the results of this homework assignment for a formal evaluation.
You must write all of the code yourself.
No collaboration or external help is allowed.
**Plagiarism is a violation of the Academy contract and is not in your best interest.
Do not discuss the contents of the assignment with your fellow students.**_
## How to submit your work
1. Push your code to a GitHub repository.
1. **Send a link to the repository to teachers@codaisseur.com before Saturday 22:00**
## Setup
1. Create a new local directory for this assignment.
1. `cd` into that directory and create a new git repository.
**All files for this homework must be tracked in this repository**.
1. Initialize a Node.JS project in the repository directory so you can install and use packages.
## Sections
### 1. Create an Express app with a single end-point. 
1. Create a new JS file named `messages-api.js`.
1. Create an Express app in that file.
The app should listen for requests on port `3000`.
Make sure you add the required dependency.
1. Add a single endpoint to the app responds to `POST` requests to the `/messages` URI.
1. When a request is sent to the endpoint, it should log the `text` property of the body to the console, and it should respond with a JSON object:
   ```javascript
   {
      "message": "Message received loud and clear"
   }
   ```
   
   In order to parse the JSON body of the request, you will need to add the middleware for it.
Make sure you add the required dependency.
1. Perform the following validation: if the body does NOT have a `text` property or the string is empty, then send a "Bad Request" HTTP status code to the client.
1. The API should only log the message five times.
   
   After receiving five messages, sixth request should be sent a response that indicates the HTTP status for "Too Many Requests".
   
   Make sure the correct HTTP status code is sent (Google it if you haven't seen this status message before).
   Although there are libraries to implement such limits, do **not** use them! Implement the logic yourself.
## 2. Use Sequelize to build a REST API.
1. Create a new JavaScript file named `sequelize-rest.js`.
1. Install the dependency `sequelize@5.8.6`
1. In the JavaScript file, initialize the database connection with Sequelize.
1. Using Sequelize, define a model called `Movie` with the following properties (in addition to an ID):
   - `title` (text)
   - `yearOfRelease` (number)
   - `synopsis` (text)
1. Make sure the model is synched with the database upon startup.
1. Use the model `create()` method to insert 3 rows of example data. This logic should happen _after_ the model synchronization completes. The data should persist. Restarting the API should not cause any data to be lost.
1. Create an express app with routes that support the following RESTful actions on the "movies" resources.
   - _create_ a new movie resource
   - _read all_ movies (the collections resource)
   - _read_ a single movie resource
   - _update_ a single movie resource
   - _delete_ a single movie resource
   You don't need any special logic.
   A standard REST implementation is ok.
1. Make sure that your handlers send back `404` status codes when appropriate.
1. Make sure that all endpoints handle database errors in the promise chain. Errors should be handled by Express' built-in error handler.
Collapse




