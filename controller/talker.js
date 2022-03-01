const express = require('express');

const talkerJson = './talker.json';
const fs = require('fs').promises;

const router = express.Router();
const OK = 200;
const INTERNAL_ERRO = 500;
const NOT_FOUND = 404;

router.get('/', async (req, res) => {
  const data = await (fs.readFile(talkerJson));
  const talkers = JSON.parse(data);
  
  if (talkers.length === 0) {
    return res.status(OK).send([]);
  }
  return res.status(OK).send(talkers);
});

router.get('/:id', async (req, res) => {
 try {
  const data = await (fs.readFile(talkerJson));
  const talkers = JSON.parse(data);
  const { id } = req.params;
  const ID = parseInt(id, 10);

  const found = talkers.find((talker) => talker.id === ID);

    if (!found) {
      return res.status(NOT_FOUND).send({ message: 'Pessoa palestrante não encontrada' });
    }
  return res.status(OK).send(found);
 } catch (e) {
  return res.status(INTERNAL_ERRO).end('erro no banco de dados');
 }
});

module.exports = router;