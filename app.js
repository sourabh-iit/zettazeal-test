const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const temp_path = path.join(__dirname, 'public', 'index.html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(temp_path);
});

app.get('/api/loadLangData', function(req, res) {
  const langFile = path.join(__dirname, 'langs', `${req.query.lang}.json`);
  if (!fs.existsSync(langFile)) {
    res.send({success: false, error: "invalid language"});
  } else {
    const data = fs.readFileSync(langFile);
    res.send({success: true, data: JSON.parse(data)});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app