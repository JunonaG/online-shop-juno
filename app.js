const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: "juno",
  host: "localhost",
  database: "online-shop-juno",
  password: "",
  port: 5432,
});

app.use(express.json());

app.get("/users", async (request, response) => {
  const dbConnection = await pool.connect();

  const users = await dbConnection.query("SELECT * FROM users;");

  response.send(users.rows.map((username) => username));
});

app.get("/listoforders", async (request, response) => {
  const dbConnection = await pool.connect();
  const listoforders = await dbConnection.query("SELECT * FROM listoforders;");
  response.send(listoforders.rows.map((username) => username));
});

app.get("/products", async (request, response) => {
  const dbConnection = await pool.connect();

  const products = await dbConnection.query("SELECT * FROM products;");

  response.send(products.rows.map((name) => name));
});

app.get("/users/:userId", async (request, response) => {
  const dbConnection = await pool.connect();

  const userId = request.params.userId;

  const username = await dbConnection.query(
    "SELECT * FROM users WHERE id = $1;",
    [userId]
  );

  response.send(username.rows);
});

app.get("/orders/:orderId", async (request, response) => {
  const dbConnection = await pool.connect();

  const orderId = request.params.orderId;

  const order = await dbConnection.query(
    "SELECT * FROM orders WHERE id = $1;",
    [orderId]
  );

  response.send(order.rows);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("I'M HERE AT PORT:", PORT);
});
