const express = require("express");
const mysql = require("mysql");
const xss = require("xss");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

const app = express();

conn.connect();

app.use(express.json());

app.get("/add", (req, res) => {
  let imie = req.query["name"];
  let adres = req.query["address"];

  let sql =
    "INSERT INTO customers (name,address) VALUES ('" +
    imie +
    "','" +
    adres +
    "')";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    res.send("Customer added");
  });
});

app.post("/delete", (req, res) => {
  let imie = req.query("name");
  let adres = req.query("adress");
  var sql =
    "DELETE FROM customers WHERE name = '" +
    imie +
    "' AND adress = '" +
    adres +
    "';";
  conn.query(sql, function (err, results) {
    if (err) throw err;
    response.send("usunieto " + imie);
  });
});

app.get("/submit", (req, res) => {
  let userInput = req.query["name"];
  const sanitizedInput = xss(userInput);
  res.send(`Hello ${sanitizedInput}!`);
});

app.post("/", (req, res) => {
  let data = req.body;
  let name = data.name;
  let address = data.address;

  let sql = "SELECT * FROM customers WHERE name =? AND address=?";

  conn.query(sql, [name, address], function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/cha", (req, res) => {
  let imie = req.query["name"];
  let adres = req.query["address"];

  let sql = "SELECT * FROM customers WHERE address =?";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result[0].name + " " + result[0].address);
  });
});

app.get("/test", (req, res) => {
  let nazwa = req.query["nazwa"];
  res.send(nazwa);
});

app.get("/download", (req, res) => {
  res.download(__dirname + "/smietnik.txt");
});

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`);
});
