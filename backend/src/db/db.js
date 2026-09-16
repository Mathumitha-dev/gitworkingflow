
const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "task_manager",
    password: "root",
    port: 5432
});

module.exports = pool;
