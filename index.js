const bodyParser = require('body-parser');
const express = require('express');
const controllers = require('./controllers');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('/user', controllers.userController.createUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
