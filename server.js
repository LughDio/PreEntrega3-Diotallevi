const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '/')));

// Handle contact form submission
app.post('/contacto', (req, res) => {
  const { nombre, correo, telefono, mensaje } = req.body;
  const submission = {
    nombre,
    correo,
    telefono,
    mensaje,
    date: new Date().toISOString()
  };

  // Read existing submissions from JSON file
  const filePath = path.join(__dirname, 'contact_submissions.json');
  let submissions = [];
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      submissions = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading submissions file:', err);
  }

  submissions.push(submission);

  try {
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
  } catch (err) {
    console.error('Error writing submissions file:', err);
  }

  // Respond with success (could redirect or return JSON)
  res.json({ success: true, message: 'Gracias por tu mensaje. Te contactaremos pronto.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
