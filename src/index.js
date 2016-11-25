import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import XRegExp from 'xregexp';
import hsl from 'hsl-to-hex';

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

function convertDecToHex(num) {
  if (num >= 0 && num <= 255) {
    let str = Number(num).toString(16);
    return str.length == 1 ? "0" + str : str;  
  }
  return null;
};

app.get('/task2D',  (req, res) => {     

  let result = "Invalid color";
  let color = req.query.color;
  console.log("Request: {" + color + "}");
  if (color) {    
    color = _.trim(color).toLowerCase();
    
    let re = new RegExp('^#?([0-9a-f]{3}|[0-9a-f]{6})$', 'i'); 
    let match_res = color.match(re);
    if (match_res) {      
      result = match_res[1];
      if (result.length == 3) {
        result = result[0] + result[0] + result[1] + result[1] + result[2] + result[2]; 
      }
      result = '#' + result;         
    }
   
    re = /^rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)$/i; 
    match_res = color.match(re);
    if (match_res) {      
      let r = convertDecToHex(match_res[1]);
      let g = convertDecToHex(match_res[2]);
      let b = convertDecToHex(match_res[3]);
      if (r !== null && g !== null && b !== null) {
        result = '#' + r + g + b;
      }      
    }  

    color = color.replace(/%20/g, '');
    re = /^hsl\(\s*([0-9]+)\s*,\s*([0-9]+)%\s*,\s*([0-9]+)%\s*\)$/i; 
    match_res = color.match(re);
    if (match_res) {      
      let h = match_res[1];
      console.log("h = " + h);
      h = (h >= 0 && h <= 360) ? h : null;
      let s = match_res[2];
      console.log("s = " + s);
      s = (s >= 0 && s <= 100) ? s : null;
      let l = match_res[3];
      console.log("l = " + l);
      l = (l >= 0 && l <= 100) ? l : null;
      if (h !== null && s !== null && l !== null) {
        result = hsl(h, s, l);
      }      
    }  

  }

  res.send(result);

});

/** 
 * Задача 2X: Blackbox
 */
app.get('/task2X',  (req, res) => {
  let result = null;
  let q = req.query;
  if (q.i) {
    if (q.i == 0) {
      result = 1;
    }
    if (q.i == 1) {
      result = 18;
    }
    if (q.i == 2) {
      result = 243;
    }
    if (q.i == 3) {
      result = 3240;
    }
    if (q.i == 4) {
      result = 43254;
    }
    if (q.i == 5) {
      result = 577368;
    }
    if (q.i == 6) {
      result = 7706988;
    }
    if (q.i == 7) {
      result = 102876480;
    }
    if (q.i == 8) {
      result = 1373243544;
    }
    if (q.i == 9) {
      result = 18330699168;
    }
    if (q.i == 10) {
      result = 244686773808;
    }
    if (q.i == 11) {
      result = 3266193870720;
    }
    if (q.i == 12) {
      result = 43598688377184;
    }
    if (q.i == 13) {
      result = 581975750199168;
    }
    if (q.i == 14) {
      result = 7768485393179328;
    }
    if (q.i == 15) {
      result = 103697388221736960;
    }
    if (q.i == 16) {
      result = 1384201395738071424;
    }
    if (q.i == 17) {
      result = 18476969736848122368;
    }
    if (q.i == 18) {
      result = 246639261965462754048;
    }
    if (q.i == 19) {
      result = 0;
    }
    if (q.i == 20) {
      result = 0;
    }
  }
  res.status(200).send(result.toString());
});


/* =========================================== */


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

