import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',     
  user: 'root',          
  password: 'Nino_1989', 
  database: 'fitness_tracker', 
});

export default pool;