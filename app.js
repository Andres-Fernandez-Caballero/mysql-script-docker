const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "mydatabase",
  });
}

app.get("/", async (req, res) => {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(`
      SELECT 
        p.id as productId, 
        p.name as productName,
        p.price as productPrice,
        c.name as productCategorie
      FROM products as p
      INNER JOIN categories as c
      ON p.category_id = c.id
      `);
    console.log(results);

    const productsHtml = results
      .map(
        (product) => `
          <li>
            <strong>${product.productName}</strong> - $${product.productPrice}
            <span>(${product.productCategorie})</span>
          </li>
        `,
      )
      .join("");

    res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>My Express App</title>
    </head>
    <body>
        <h1>Welcome to ExpressCatalog App!</h1>
        <p>This is a simple Express application using mysql2 library running on port ${PORT}.</p>
        <ul>
          ${productsHtml}
        </ul>
    </body>
  </html>  
  `);
  } catch (error) {
    console.log(error);
    res.status(500).send("ERROR DE CONEXION");
  } finally {
    await connection.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
