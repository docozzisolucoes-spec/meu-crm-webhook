const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota GET para testes no navegador e validação
app.get('/webhook/atendimento', (req, res) => {
  return res.status(200).send('Webhook operacional');
});

// Rota POST para receber o atendimento e reenviar para o Google Sheets
app.post('/webhook/atendimento', async (req, res) => {
  console.log('--- NOVO ATENDIMENTO RECEBIDO ---');
  console.log(JSON.stringify(req.body, null, 2));

  const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx6Ug-mSsFBvopZH19c_NlMy-JEviXvGQ9mb90goUP3lVDrloXGAbjR8J1rx4--5vMrvw/exec';

  try {
    const response = await axios({
      method: 'post',
      url: GOOGLE_SHEETS_WEBHOOK_URL,
      data: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      maxRedirects: 5
    });
    console.log('Resposta do Google Sheets:', response.data);
  } catch (error) {
    console.error('Erro ao enviar para o Google Sheets:', error.message);
  }

  return res.status(200).json({ status: 'sucesso', message: 'Atendimento recebido' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});
