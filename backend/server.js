require("dotenv").config();
const express = require("express");
const app = express();

app.use(
  cors({
    origin: "https://ana-3-production.up.railway.app/",
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());

const SENHA_CORRETA = process.env.SENHA_CORRETA;
console.log(SENHA_CORRETA);

app.post("/login", (req, res) => {
  const senha = req.body.senha;

  if (!senha) {
    return res.status(400).json({ erro: "Senha não fornecida" });
  }

  if (senha === SENHA_CORRETA) {
    return res.json({
      sucesso: true,
      mensagem: "Senha correta, acesso permitido.",
    });
  } else {
    return res
      .status(401)
      .json({ sucesso: false, mensagem: "Senha incorreta!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
