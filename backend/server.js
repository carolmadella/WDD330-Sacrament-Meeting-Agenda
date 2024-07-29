const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const port = process.env.PORT || 3000;
const http = require("http");
const logger = require("morgan");
const path = require("path");
const { auth } = require("express-openid-connect");
const app = express();

app.use(logger("dev"));
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

if (
  !config.baseURL &&
  !process.env.BASE_URL &&
  process.env.PORT &&
  process.env.NODE_ENV !== "production"
) {
  config.baseURL = `${process.env.HOST}:${port}`;
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index/index.html"));
});

// Route to serve view.html
app.get("/view", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index/view.html"));
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes")); // Your other routes

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    // Start the server
    http.createServer(app).listen(port, () => {
      console.log(`Listening on ${config.baseURL}`);
    });
  }
});
