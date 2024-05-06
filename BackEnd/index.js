const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const autoPecaController = require("./controllers/AutoPecaControlls");
app.use(cors());
dotenv.config();
app.use(express.json());

//config do bd
mongoose
  .connect(process.env.MONGO_ATLAS_URL)
  .then(() => console.log("Conexão com o banco de dados bem-sucedida"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => res.send("Servidor rodando"));

app.use("/pecas", autoPecaController);

app.listen(5000, () => {
  console.log("Backend Server está rodando");
});
