const express = require("express");
const mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

const app = express();

conn.connect();

app.use(express.json());

app.get("/:name/:address", (req, res) => {
  let imie = req.params["name"];
  let adres = req.params["address"];

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

app.post("/", (req, res) => {
  let data = req.body;

  let sql = `SELECT * FROM customers WHERE id = 1`;

  conn.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/cha", (req, res) => {
  let imie = req.query.name;
  let adres = req.query.address;

  let sql =
    "SELECT * FROM customers WHERE name = '" +
    imie +
    "' AND address = '" +
    adres +
    "'";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result[0].name);
  });
});

app.get("/test", (req, res) => {
  let nazwa = req.query["nazwa"];
  res.send(nazwa);
});

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`);
});
