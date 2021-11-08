const User = require('../models/User');

// users => Valida si email ya esta registrado en la DB
const emailExists = async (email = '') => {
    const existsEmail = await User.findOne({email});
    if (existsEmail) throw new Error(`El correo ${email} ya esta registrado`);
}

module.exports = {
    emailExists
}