const express = require('express');

const randomTolken = require('rand-token');

const INTERNAL_ERRO = 500;
const OK = 200;
const router = express.Router();

const { passwordValidation, emailValidation } = require('../middlewares/auth');

router.post('/', passwordValidation, emailValidation, async (req, res) => {
  try {
  const token = await randomTolken.generate(16);
  if (token.length !== 16) {
    return res.status(INTERNAL_ERRO).send('erro ao gerar token');
  }  
   return res.status(OK).send({ token }); 
} catch (e) {
  return res.status(INTERNAL_ERRO).send('erro');
}
  });

  module.exports = router;