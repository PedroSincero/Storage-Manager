const { MongoClient } = require('mongodb');
// A conexão do banco local deverá conter os seguintes parâmetros:
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// Para o avaliador GITHUB funcionar altere a conexão do banco para:
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => MongoClient
.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((conn) => conn.db(DB_NAME))
.catch((err) => {
    console.error(err);
    process.exit(1);
});

module.exports = connection;