export const registrationHandler = (req, res) => {
  const {
    tipoCadastro,
    nome,
    cpf,
    razaoSocial,
    cnpj,
    dataNascimento,
    dataAbertura,
    telefone,
  } = req.body;

  const errors = [];

  if (tipoCadastro === "Pessoa Física") {
    if (!nome) {
      errors.push({
        message: "Nome é obrigatório.",
        field: "nome",
      });
    }
    if (!cpf) {
      errors.push({
        message: "CPF é obrigatório.",
        field: "cpf",
      });
    }
    if (!dataNascimento) {
      errors.push({
        message: "Data de nascimento é obrigatória.",
        field: "dataNascimento",
      });
    }
    if (!telefone) {
      errors.push({
        message: "Telefone é obrigatório.",
        field: "telefone",
      });
    }
  }

  if (tipoCadastro === "Pessoa Jurídica") {
    if (!razaoSocial) {
      errors.push({
        message: "Razão social é obrigatória.",
        field: "razaoSocial",
      });
    }
    if (!cnpj) {
      errors.push({
        message: "CNPJ é obrigatório.",
        field: "cnpj",
      });
    }
    if (!dataAbertura) {
      errors.push({
        message: "Data de abertura é obrigatória.",
        field: "dataAbertura",
      });
    }
    if (!telefone) {
      errors.push({
        message: "Telefone é obrigatório.",
        field: "telefone",
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Por favor, corrija os seguintes erros:",
      errors,
    });
  }

  res.status(200).json({ message: "Cadastro realizado com sucesso!" });
};
