const express = require('express');
const { sequelize } = require('./config/db.js');
const { isAuth } = require('./middlewares/auth.js');
const usersRoutes = require('./routes/usersRoutes.js');
const { me } = require('./controllers/usersControllers.js');


const PORT = 3000;
const server = express();

server.use(express.json())

server.use((req, res, next) => { 
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
// Qué headers puede mandar el frontend res.setHeader("Access-Control-Allow-Headers',
res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type, Authorization')
res.setHeader( 'Access-Control-Allow-Credentials', 'true')

if(req.method === 'OPTIONS'){
return res.sendStatus (200)
}

next()
})

server.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: "El servidor está operativo y respondiendo"
    });
});


server.use('/users', usersRoutes);
server.get('/me', isAuth, me)

server.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        // Sincronización automática de modelos
        // { force: true } BORRA y recrea las tablas cada vez que inicia el servidor. Ideal para testing/desarrollo.
        await sequelize.sync({ force: false });
        console.log("Conexión exitosa a la Base de Datos");
        console.log(`El servidor está ON en el puerto ${PORT}`);
    } catch (error) {
        console.error("Error crítico al iniciar el servidor o base de datos:", error);
}

})