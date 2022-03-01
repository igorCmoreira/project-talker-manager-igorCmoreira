const express = require('express');

const talkerJson = './talker.json';
const fs = require('fs').promises;

const router = express.Router();
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const INTERNAL_ERRO = 500;

const { tokenValidation,
  nameValidation, 
  ageValidation, 
  talkValidation,
  talkValuesValidation } = require('../middlewares/talkerValidation');

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
 } catch (err) {
  return res.status(INTERNAL_ERRO).end('erro no banco de dados');
 }
});

router.post('/', tokenValidation,
nameValidation, 
ageValidation, 
talkValidation,
talkValuesValidation, async (req, res) => {
try {
  const { name, age, talk } = req.body; 
  const data = await (fs.readFile(talkerJson));
  const talkers = JSON.parse(data);

  const talker = { id: talkers.length + 1,
              name,
              age,
              talk };

  talkers.push(talker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  
  return res.status(CREATED).send(talker);
} catch (err) {
  return res.status(INTERNAL_ERRO).end('erro no banco de dados');
}
});

router.put('/:id', tokenValidation,
nameValidation, 
ageValidation, 
talkValidation,
talkValuesValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await (fs.readFile(talkerJson));
    const talkers = JSON.parse(data);
  
    const found = talkers.findIndex((talker) => talker.id === parseInt(id, 10));

    if (found === -1) return req.status(NOT_FOUND).send({ message: 'NOT FOUND' });
    
    talkers[found] = { ...talkers[found], name, age, talk }; 
  // aqui estou dando um spread no talkes para manter o id original
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
  
    return res.status(OK).send(talkers[found]);
  } catch (err) {
    return res.status(INTERNAL_ERRO).end('erro no banco de dados');
  }
});

router.delete('/:id', tokenValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await (fs.readFile(talkerJson));
    const talkers = JSON.parse(data);
  
    const found = talkers.findIndex((talker) => talker.id === parseInt(id, 10));

    if (found === -1) return req.status(NOT_FOUND).send({ message: 'NOT FOUND' });
    
    talkers.splice(found, 1);
  
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
  
    return res.status(NO_CONTENT).end();
  } catch (err) {
    return res.status(INTERNAL_ERRO).end('erro no banco de dados');
  }
});

module.exports = router;