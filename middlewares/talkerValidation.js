const BAD_REQUEST = 400;
const ERRO = 401;

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    return res.status(ERRO).send({ message: 'Token não encontrado' });
  } if (authorization.length !== 16) {
    return res.status(ERRO).send({ message: 'Token inválido' });
  }
  next();
 };

 const nameValidation = (req, res, next) => {
   const { name } = req.body;

   if (name === undefined || name.length === 0) {
    return res.status(BAD_REQUEST).send({ message: 'O campo "name" é obrigatório' });
   } if (name.length < 3) {
     return res.status(BAD_REQUEST).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
   }
   next();
 };

 const ageValidation = (req, res, next) => {
   const { age } = req.body;

   if (age === undefined || age.length === 0) {
     return res.status(BAD_REQUEST).send({ message: 'O campo "age" é obrigatório' });
   } if (parseInt(age, 10) < 18) {
    return res.status(BAD_REQUEST)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
   }
   next();
 };

 const talkValidation = (req, res, next) => {
  const { talk } = req.body;
   if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(BAD_REQUEST)
     .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
 };
 const talkValuesValidation = (req, res, next) => {
   const { talk } = req.body;
   const { watchedAt, rate } = talk;
   const regexDate = /(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/](19|20|30)\d\d/;
   
   if (!regexDate.test(watchedAt)) {
     return res.status(BAD_REQUEST)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
   }
   if (rate < 1 || rate > 5) {
     return res.status(BAD_REQUEST)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
   }
   next();
 };

 module.exports = { tokenValidation,
   nameValidation,
    ageValidation,
     talkValidation,
      talkValuesValidation };