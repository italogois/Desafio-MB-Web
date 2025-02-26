import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/registration", (req, res) => {
  const { stepOneForm, stepTwoPFForm, stepTwoPJForm, stepThreeForm } = req.body;

  const stepTwoForm = stepTwoPFForm || stepTwoPJForm;

  if (!stepOneForm || !stepTwoForm || !stepThreeForm) {
    return res
      .status(400)
      .json({ error: "Todos os campos devem ser preenchidos" });
  }

  const fields = { ...stepOneForm, ...stepTwoForm, ...stepThreeForm };

  for (const key in fields) {
    if (!fields[key]) {
      return res.status(400).json({ error: `O campo ${key} é obrigatório` });
    }
  }

  res.json({ message: "Cadastro realizado com sucesso" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
