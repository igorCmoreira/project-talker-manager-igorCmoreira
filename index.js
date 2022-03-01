const express = require('express');
const bodyParser = require('body-parser');

const talkerController = require('./controller/talker');
const loginMiddleware = require('./controller/login');
const postTalker = require('./controller/postTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(express.json());
app.use('/talker', talkerController, postTalker);
app.use('/login', loginMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
