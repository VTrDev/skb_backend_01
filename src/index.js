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


/** 
 * Задача 2C: @username
 */

app.get('/task2C',  (req, res) => {     

  function canonize(url) {    
    const re = new RegExp('@?(https?:)?(\/\/)?(([-.a-zA-Z0-9]+)[^\/]*\/)?([@_.a-zA-Z0-9]*)', 'i');
    const username = url.match(re)[5];
    if (!username) return 'Invalid username';
    return (username.charAt(0) === '@') ? username : '@' + username;    
  }  

  res.send(canonize(req.query.username));

});

/* =========================================== */


/** 
 * Задача 2D: #colors
 */

app.get('/task2D',  (req, res) => {     

  let result = "Invalid color";
  let color = req.query.color;
  console.log("Request: {" + color + "}");
  if (color) {    
    color = _.trim(color).toLowerCase();
    const re = new RegExp('^#?([0-9a-f]{3}|[0-9a-f]{6})$', 'i'); 
    let match_res = color.match(re);     
    if (match_res) {
      result = match_res[1];
      if (result.length == 3) {
        result = result[0] + result[0] + result[1] + result[1] + result[2] + result[2]; 
      }
      result = '#' + result;
    }
  }

  res.send(result);

});

/* =========================================== */


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

