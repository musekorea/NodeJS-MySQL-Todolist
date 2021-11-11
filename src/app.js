import express from 'express';
import { DB } from './init.js';

export const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).render('index.ejs');
});

app.get('/todo', (req, res) => {
  res.status(200).render('todo.ejs');
});

app.post('/todo', async (req, res) => {
  const SQL = `INSERT INTO todos (todo, createdAt) VALUES ("${
    req.body.todo
  }","${new Date().getTime()}");`;
  DB.query(SQL, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    res.redirect('/list');
  });
});

app.get('/list', async (req, res) => {
  const SQL = `Select * FROM todos;`;
  DB.query(SQL, (error, results, fields) => {
    res.render('list.ejs', { todolists: results });
  });
});

app.get('/description/:id', async (req, res) => {
  console.log(req.params);
  const SQL = `Select * FROM todos WHERE ID=${Number(req.params.id)};`;
  DB.query(SQL, (error, results, fields) => {
    console.log(results);
    res.status(200).render('description.ejs', { todolist: results[0] });
  });
});

app.put('/description/:id', (req, res) => {
  console.log(req.body.value);
  const SQL = `UPDATE todos SET todo="${
    req.body.value
  }", createdAt=${new Date().getTime()} WHERE ID=${Number(req.params.id)};`;
  DB.query(SQL, (error, results, fields) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

app.delete('/description/:id', async (req, res) => {
  console.log(req.params);
  const SQL = `DELETE FROM todos WHERE ID=${Number(req.params.id)};`;
  DB.query(SQL, (error, results, fields) => {
    if (error) throw error;
    res.status(200).end();
  });
});
