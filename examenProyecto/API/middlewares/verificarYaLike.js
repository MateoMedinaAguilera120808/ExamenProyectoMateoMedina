
const users = require('../models/usersModels')


const verifLike = async (req, res, next) => {
    try {
        

        const usuario = await users.findByPk(req.user.id)
        const postLikeado = req.params.id


        var postsLikeados = usuario.likedPosts;
        if (!postsLikeados) {
            postsLikeados = [];
        }

        

        for (var i = 0; i < postsLikeados.length; i++) {

            if(postLikeado == postsLikeados[i] ){
                return res.status(400).json({ message: 'No se puede likear el post 2 veces' });
            }

           
        }

        next()

    } catch (error) {
        res.status(500).json({ message: ' Error al verificar el like' })
    }
}

module.exports = { verifLike };