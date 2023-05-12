const express = require("express");
const Jwt = require("jsonwebtoken");
const jwtKey = "ecomm";

require("./db/config");
const user = require("./db/user");
const Product = require("./db/Product");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const users = new user(req.body);
  let data = await users.save();
  data = data.toObject();
  delete data.password;
  Jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({
        result: "something went wrong, please try after sometime",
      });
    }
    res.send({ data, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let users = await user.findOne(req.body).select("-password");
    if (users) {
      Jwt.sign({ users }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "something went wrong, please try after sometime",
          });
        }
        res.send({ users, auth: token });
      });
    } else res.send({ result: "no user found" });
  } else res.send({ result: "no user found" });
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products Found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product Found" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "please add token with header" });
  }
}

app.listen(5000);
