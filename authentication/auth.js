const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const JWT_SECRETE = "347186591486#^%%ABCF*##GHE";

// Connect to MongoDB
const dbconnect = require('./dbconnect.js');

// Import user model
const PersonModel = require('./user_schema.js');


/*
In the postman use the following URL
localhost:5001/reg


*/

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

//REG API
app.post('/reg', (req, res) => {
  console.log("REG API EXECUTED")
  const pobj = new PersonModel({
    id: uniqueid(1000, 9999),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    role: req.body.role
  });//CLOSE PersonModel
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  pobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD

/*
POSTMAN:
URL: http://localhost:5000/login
Method: POST
Body:
{
  "email": "lain@gmail.com",
  "password": "aupp",
  "role": "user"
}
*/

// LOGIN API
app.post("/login", (req, res) => {
  //console.log(req.body.email)
  //console.log(req.body.password)
  //console.log(req.body.role)

  PersonModel.find({ "email": req.body.email, "password": req.body.password, "role" : req.body.role})
    .then(getsearchdocument => {
      console.log(getsearchdocument)
      if (getsearchdocument.length > 0) {
        const token = jwt.sign({ email: req.body.email, role: req.body.role }, JWT_SECRETE, { expiresIn: '24h' })
        return res.json({ token })
      }
      else {
        res.status(400).send("Invalid user")
      }
    }) //CLOSE THEN
}//CLOSE CALLBACK FUNCTION BODY
)//CLOSE Post METHOD
app.listen(5000, () => {
  console.log('Authentication Service Server is running on PORT NO: 5000');
});

