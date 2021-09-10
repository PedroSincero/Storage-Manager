// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const { productRouters } = require('./router/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_request, response) => {
  response.send('ola, estou funcionando');
});

app.use('/products', productRouters);

app.listen(PORT, () => {
 console.log(`Ouvindo a porta ${PORT}`);
});
