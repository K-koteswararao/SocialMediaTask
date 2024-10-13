const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const users = [];
const admins = [{ username: 'admin', password: '$2b$10$...' }]; // Pre-hashed password

// Middleware to parse JSON and form-data
app.use(express.json());
app.use(express.static('public')); // To serve images

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// User submission endpoint
app.post('/api/upload', upload.array('images'), (req, res) => {
  const { name, socialMedia } = req.body;
  const images = req.files.map((file) => `/uploads/${file.filename}`);
  users.push({ id: users.length + 1, name, socialMedia, images });
  res.status(200).json({ message: 'Data uploaded successfully' });
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = admins.find((admin) => admin.username === username);
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username: admin.username }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// Fetch all users
app.get('/api/admin/users', (req, res) => {
  res.json(users);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
