const jwt = require('jsonwebtoken')
const users = require('../models/usersModels')

const secret = "misecreto"

const isAuth = async (req, res, next) => {
    const token = req.headers["authorization"]

    console.log(token)


    jwt.verify(token, secret, async (err, decoded) => {

        if (err) return res.status(401).json({ message: 'error al acceder' })

        const user = await users.findByPk(decoded.id)

        if (!user) return res.status(404).json({ message: ' usuario no encontrado' })

        const estaBorrado = user.isDeleted;


        if (estaBorrado == false) {
            req.user = {
                id: user.id,
                email: user.email
            }
        } else {
            res.status(400).json({ message: ' El usuario no puede verificarse, esta borrado' })
            return
        }


        next();
    });


}


module.exports = { isAuth };