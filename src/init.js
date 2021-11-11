import { app } from './app.js';
import mysql from 'mysql2';

export const DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'blueb612',
  database: 'todolist-1',
});
console.log(`💚 MYSQL Server is connected`);

DB.query('SELECT * from todos', (error, results, fields) => {
  if (!results) {
    DB.query(
      'CREATE TABLE todos(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, todo VARCHAR(255), createdAt BIGINT)',
      (error2, results2, fields2) => {
        if (error2) {
          throw error2;
        }
        console.log(`Todos Table is created`);
      }
    );
  } else {
    return;
  }
});

app.listen(8080, () => {
  try {
    console.log(`💚 Server is listening on Port 8080`);
  } catch (error) {
    console.log(error);
  }
});
