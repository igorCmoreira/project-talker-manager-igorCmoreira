const express = require('express');

const talkerJson = './talker.json';
const fs = require('fs').promises;

const router = express.Router();
const OK = 200;

router.get('/talker', async (req, res) => {
  const data = await (fs.readFile(talkerJson));
  const talkers = JSON.parse(data);
  
  if (talkers.length === 0) {
    return res.status(OK).send([]);
  }
  return res.status(OK).send(talkers);
});

module.exports = router;