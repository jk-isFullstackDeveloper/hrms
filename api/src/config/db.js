import mysql from 'mysql2/promise';
const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
})

export default mysqlPool