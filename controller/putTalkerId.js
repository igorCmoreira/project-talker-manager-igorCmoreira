const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const talkerJson = './talker.json';

const { tokenValidation,
  nameValidation, 
  ageValidation, 
  talkValidation,
  talkValuesValidation } = require('../middlewares/talkerValidation');

router.put('/:id', tokenValidation,
nameValidation, 
ageValidation, 
talkValidation,
talkValuesValidation, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const data = await (fs.readFile(talkerJson));
  const talkers = JSON.parse(data);

  const found = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  
  talkers[found] = { ...talkers[found], name, age, talk }; 
// aqui estou dando um spread no talkes para manter o id original
  await fs.writeFile('./talker.json', JSON.stringify(talkers));

  return res.status(200).send(talkers[found]);
});
module.exports = router;