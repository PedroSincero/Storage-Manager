// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send('ola, estou funcionando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Ouvindo a porta ${PORT}`);
});
