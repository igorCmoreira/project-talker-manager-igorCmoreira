  const BAD_REQUEST = 400;

  const passwordValidation = (req, res, next) => {
  const { password } = req.body;
    if (password === undefined || password.length === 0) {
     return res.status(BAD_REQUEST).send({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(BAD_REQUEST)
        .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
     next();
 };

 const emailValidation = (req, res, next) => {
   const { email } = req.body;
   const regexEmail = /\S+@\S+\.\S+/;
   if (email === undefined || email.length === 0) {
     return res.status(BAD_REQUEST).send({ message: 'O campo "email" é obrigatório' });
   }
   if (!regexEmail.test(email)) {
    return res.status(BAD_REQUEST)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
   }
   next();
 };

 module.exports = { passwordValidation, emailValidation };