const express = require('express');
const app = express();
app.use(express.json());

// Endpoint para receber o webhook de atendimento do WhatsProfissional
app.post('/webhook/atendimento', (req, res) => {
  console.log('--- NOVO ATENDIMENTO RECEBIDO ---');
  console.log(JSON.stringify(req.body, null, 2));
  
  return res.status(200).json({ 
    status: 'sucesso', 
    message: 'Atendimento recebido com sucesso' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});
