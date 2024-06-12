import { Sequelize } from "sequelize";

const db = new Sequelize('upload_db', 'root', '12345678', {
    host: '34.101.209.199',
    dialect: "mysql"
});

export default db;