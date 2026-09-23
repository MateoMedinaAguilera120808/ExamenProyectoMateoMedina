const Users = require("../models/usersModels")
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'misecreto';

/*
{
"firstName":"mateo",
"lastName":"medina",
"email":"mateomedina08@gmail.com",
"password": "1234"
}
*/

/*
{
"emailLogin":"mateomedina08@gmail.com",
"passwordLogin":"1234"
}
*/



const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({ attributes: { exclude: 'password' } })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const registerUser = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: "Faltan datos necesarios "
        });
    }

    const passwordHasheada = await bcrypt.hash(password, 10)

    try {
        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: passwordHasheada
        })

        res.status(201).json({ message: 'Usuario Registrado', 
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
         })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

const login = async (req, res) => {

    try {
        const { emailLogin, passwordLogin } = req.body;
        if (!emailLogin || !passwordLogin) {
            return res.status(400).json({
                message: "Faltan datos necesarios "
            });
        }

        const usuarioEncontrado = await Users.findOne({
            where: { email: emailLogin }
        })

        if (!usuarioEncontrado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const compare = await bcrypt.compare(passwordLogin, usuarioEncontrado.password)

        if (!compare) {
            return res.status(400).json({
                message: "Contraseña Incorrecta"
            });
        }

        const token = jwt.sign({ id: usuarioEncontrado.id, email: usuarioEncontrado.email }, secret, { expiresIn: '8h' })


        res.json({ token })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const me = async (req, res) => {
    console.log(req.user);
    res.json({})
}




module.exports = {
    getUsers,
    registerUser,
    login,
    me
}