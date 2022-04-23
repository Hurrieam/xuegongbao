import {Sequelize} from 'sequelize';
import dbConfig from '../config/database';

const {database, username, password, host, port} = dbConfig;
const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default sequelize;