const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Rota GET para testes no navegador e validação
app.get('/webhook/atendimento', (req, res) => {
  return res.status(200).send('Webhook operacional');
});

// Rota POST para receber o atendimento e reenviar para o Google Sheets
app.post('/webhook/atendimento', async (req, res) => {
  console.log('--- NOVO ATENDIMENTO RECEBIDO ---');
  console.log(JSON.stringify(req.body, null, 2));

  // URL do Google Apps Script implantado
  const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby4DF7DU-nqOA4R8IPfkWFfo_vAnnXly6FTHL8bWfkda0Obje_jtl2qb0tIYVYVswI5uA/exec';

  try {
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      await axios.post(GOOGLE_SHEETS_WEBHOOK_URL, req.body);
      console.log('Dados enviados para o Google Sheets com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao enviar para o Google Sheets:', error.message);
  }

  return res.status(200).json({ status: 'sucesso', message: 'Atendimento recebido' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});
