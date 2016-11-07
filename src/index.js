import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import XRegExp from 'xregexp';

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


/** 
 * Задача 2B: Фамилия И. О.
 */

function trasformFullname(fullname) {
  
  const re = new XRegExp("^(\\p{L}|[ '])*$");
  let result = 'Invalid fullname';

  if (!re.test(fullname)) {    
    return result;
  }
  
  let fullname_parts = _.split(fullname , ' ');  
  _.remove(fullname_parts, elem => elem === "");  
  fullname_parts = fullname_parts.map(elem => _.capitalize(elem));    
  
  switch(fullname_parts.length) {
    case 1: {
      result = fullname_parts[0];
      break;
    }  
    case 2: {
      const [name, surname] = fullname_parts;
      result = surname + ' ' + name.charAt(0) + '.';
      break;
    }        
    case 3: {
      const [name, patronymic, surname] = fullname_parts;
      result =  surname + ' ' + name.charAt(0) + '. ' + patronymic.charAt(0) + '.';
    } 
  }

  return result;
}

app.get('/task2B',  (req, res) => {   

  res.send(trasformFullname(req.query.fullname));

});

/* =========================================== */

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

