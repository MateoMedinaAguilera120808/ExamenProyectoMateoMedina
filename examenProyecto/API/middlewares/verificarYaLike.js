
const users = require('../models/usersModels')


const verifLike = async (req, res, next) => {
    try {
        console.log("##########################################");

        const usuario = await users.findByPk(req.user.id)
        const postLikeado = req.user.idPosteo;

        for (var i = 0; i < usuario.likedPosts.count(); i++) {

            if (postLikeado == usuario.likedPosts[i]) {
                res.status(500).json({ message: ' No se puede likear el post 2 veces' })
                return
            }

            else {
                next()
            }
        }


    } catch (error) {
        res.status(500).json({ message: ' Error al verificar el like' })
    }
}

module.exports = { verifLike };