const express = require("express");
const router = express.Router();
const AutoPeca = require("../models/AutoPeca");

// Buscar todas os registros
router.get("/", async (req, res) => {
  try {
    const autoPecas = await AutoPeca.find();
    res.status(200).json(autoPecas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cadastrar um novo registros
router.post("/", async (req, res) => {
  try {
    const { brand, model, year, piece } = req.body;
    const newAutoPeca = new AutoPeca({ brand, model, year, piece });
    await newAutoPeca.save();
    res.status(201).json({ message: "Cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar um registro por ID
router.get("/:id", async (req, res) => {
  try {
    const autoPeca = await AutoPeca.findById(req.params.id);
    res.status(200).json(autoPeca);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar um registro
router.delete("/:id", async (req, res) => {
  try {
    await AutoPeca.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alterar um registro por ID
router.put("/:id", async (req, res) => {
  try {
    const { brand, model, year, piece } = req.body;
    await AutoPeca.findByIdAndUpdate(req.params.id, {
      brand,
      model,
      year,
      piece,
    });
    res.status(200).json({ message: "Atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
