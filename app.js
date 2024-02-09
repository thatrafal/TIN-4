const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware do walidacji danych
const validateData = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
];

app.post('/submit', validateData, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Zapis błędów do pliku
    logErrors(errors.array(), req);
    return res.status(400).json({
      message: 'Invalid data. Please check the entered values.',
      invalidFields: errors.array().map((error) => error.param),
    });
  }

  // Przetwarzanie poprawnych danych
  const { name, email, age } = req.body;
  res.send(`
    <h2>Submitted Data</h2>
    <table border="1">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
      </tr>
      <tr>
        <td>${name}</td>
        <td>${email}</td>
        <td>${age}</td>
      </tr>
    </table>
  `);
});

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Funkcja do zapisu błędów do pliku
const logErrors = (errors, req) => {
  const logFilePath = path.join(__dirname, 'validationErrors.log');

  const errorLog = errors.map((error) => ({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    error: error.msg,
  }));

  fs.appendFileSync(logFilePath, JSON.stringify(errorLog, null, 2) + '\n');
};
