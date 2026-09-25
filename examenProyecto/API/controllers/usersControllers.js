const Users = require("../models/usersModels")
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require("../models/usersModels");
const { post } = require("../routes/usersRoutes");

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

const posteos = [
    {
        id: 1,
        nombre: "comida"
    },
    {
        id: 2,
        nombre: "aviones"
    },
    {
        id: 3,
        nombre: "juegos"
    }
]





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



    try {
        const passwordHasheada = await bcrypt.hash(password, 10)

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: passwordHasheada,
            isDeleted: false
        })

        res.status(201).json({
            message: 'Usuario Registrado',
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

        const estaBorrado = usuarioEncontrado.isDeleted;

        if (estaBorrado == false) {
            const compare = await bcrypt.compare(passwordLogin, usuarioEncontrado.password)

            if (!compare) {
                return res.status(400).json({
                    message: "Contraseña Incorrecta"
                });
            }

            const token = jwt.sign({ id: usuarioEncontrado.id, email: usuarioEncontrado.email }, secret, { expiresIn: '8h' })


            res.json({ token })

        } else {
            res.status(400).json({ message: ' El usuario esta borrado, no se puede' })
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const me = async (req, res) => {
    console.log(req.user);
    res.json({})
}

const borrarCuenta = async (req, res) => {

    try {
        const usuarioaBorrar = await Users.findOne({
            where: {
                id: req.user.id
            }

        })

        if (!usuarioaBorrar) {
            res.status(404).json({ message: ' No se ha encontrado el usuario' })
            return
        }

        await Users.update(
            { isDeleted: true },
            { where: { id: usuarioaBorrar.id } }
        );
        res.status(200).json({ message: 'eliminacion exitosa' })



    } catch (error) {
        res.status(400).json('no se ha podido borrar la cuenta')
    }



}


const darLike = async (req, res) => {
    try {
        const { id } = req.params;
        

        var idPosteo;

        if (!id) {
            return res.status(404).json({ message: ' no has enviado datos' })
        }

        var idPosteo = 0;
        for (var i = 0; i < posteos.length; i++) {
            if (id == posteos[i].id) {
                idPosteo = posteos[i].id;
                break;
            }
        }

        if (idPosteo === 0) {
            return res.status(404).json({ message: 'El posteo no existe' });
        }

        const usuarioDelLike = await Users.findByPk(req.user.id)

        if (!usuarioDelLike) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }


        
        var likesDeUsuario = usuarioDelLike.likedPosts;

        
        if (!likesDeUsuario) {
            likesDeUsuario = [];
        }

        // 3. CREAMOS UNA COPIA NUEVA para que Sequelize se de cuenta de que cambió
        var nuevosLikes = [...likesDeUsuario];

        // 4. Le agregamos el nuevo id a la copia
        nuevosLikes.push(idPosteo);

        // 5. Guardamos la COPIA NUEVA
        await usuarioDelLike.update({
            likedPosts: nuevosLikes
        });
        res.status(200).json({ message: 'se ha likado un post' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'ha ocurrido un error dandole like' })
    }
}






module.exports = {
    getUsers,
    registerUser,
    login,
    me,
    borrarCuenta,
    darLike
}