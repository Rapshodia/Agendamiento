const Usuario = require('../models/user.model');

const jwt = require("jsonwebtoken");
const secret_key = "Esta es mi llave secreta";
const bcrypt = require("bcrypt");

module.exports.register = (req, res) => {
    const user = new Usuario(req.body);
    user.save()
        .then(usuario => {
            /*res.json(usuario);*/

            const payload = {
                _id: user._id
            }

            //Guardar al usuario en una cookie
            const myJWT = jwt.sign(payload, secret_key);

            res
                .cookie("usertoken", myJWT, secret_key, {
                    httpOnly: true
                })
                .json(usuario)



        })
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Usuario.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: true, message: 'El correo electrónico no está registrado.' });
      }
  
      const passwordValid = await bcrypt.compare(password, user.password);
  
      if (!passwordValid) {
        return res.status(401).json({ error: true, message: 'La contraseña es incorrecta.' });
      }
  
      const payload = { _id: user._id };
      const token = jwt.sign(payload, secret_key);
  
      res.cookie('usertoken', token, { httpOnly: true });
      res.json({ error: false, message: 'Inicio de sesión exitoso.' });
    } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ error: true, message: 'Error en el servidor.' });
    }
  };

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.status(200).json({message: "Salimos de sesión!"});
}