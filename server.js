const bodyParser = require("body-parser");
var express = require("express");
const morgan = require("morgan");
const cors = require("cors");

let users = [];

var server = express();
var PORT = process.env.PORT || 5000;

// Important Packages
server.use(cors());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(morgan("dev"));

server.post("/signup", function (req, res, next) {
  console.log("input ==>" + JSON.stringify(req.body));

  users.push(JSON.stringify(req.body));
  res.send("sign up success" + JSON.stringify(req.body) + "users =>" + users);
  console.log("users ==>", JSON.parse(users));
});

// Login Post
server.post("/login", function (req, res, next) {
  JSON.parse(users);
  let email = req.body.lEmail;
  let password = req.body.lPassword;
  console.log("email=>", JSON.stringify(email));
  console.log("password=>", password);
  console.log("users=>", JSON.parse(users));
  console.log("userEmails==>", users);

  for (let i = 0; i < users.length; i++) {
    // console.log(JSON.parse(users[i]).userEmail);

    if (
      JSON.parse(users[i]).userEmail === email &&
      JSON.parse(users[i]).userPassword === password
    ) {
      res.send(
        `<h2>Login Success!</h2><br/><h2>Welcome!</h2> <h3>Name:  ${
          JSON.parse(users[i]).userName
        }</h3> <h3>Email: ${JSON.parse(users[i]).userEmail}</h3>`
      );
      console.log(
        "user " + JSON.parse(users[i]).userName + " logged in successfully"
      );
    } else {
      res.send("email or password is incorrect");
      console.log("user entered wrong email or password");
    }
  }
});

server.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
// console.log("email==>", JSON.parse(users));
