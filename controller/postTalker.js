const express = require('express');

const fs = require('fs').promises;

const talkerJson = './talker.json';

 const { tokenValidation,
         nameValidation, 
         ageValidation, 
         talkValidation,
         talkValuesValidation } = require('../middlewares/talkerValidation');

const router = express.Router();

router.post('/', tokenValidation,
  nameValidation, 
  ageValidation, 
  talkValidation,
  talkValuesValidation, async (req, res) => {
    const { name, age, talk } = req.body; 
    const data = await (fs.readFile(talkerJson));
    const talkers = JSON.parse(data);

    const talker = { id: talkers.length + 1,
                    name,
                    age,
                    talk };
    
  talkers.push(talker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(201).send(talker);
});

module.exports = router;