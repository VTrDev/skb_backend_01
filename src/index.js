import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

/** 
 * Задача 2A: A + B
 */

function normalizeNumParam(param) {
  return +param || 0;
}

app.get('/task2A', (req, res) => {
  const sum = normalizeNumParam(req.query.a) + 
              normalizeNumParam(req.query.b);
  res.send(sum.toString());
});

/* =========================================== */



app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
