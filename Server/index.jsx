const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { default: mongoose } = require('mongoose');
const Attandance= require('./Models/Attandance');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;
const SECRET_KEY = 'Rukshan';
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/details')
  .then(() => console.log('Server is connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

  

app.post('/added',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {

      const hashedPassword = await bcrypt.hash(password, 10);
      
     
      const user = await Attandance.create({
        username: username,
        password: hashedPassword,
      });
       // Generate JWT token containing the username
    const token = jwt.sign({ username: user.username, id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    
    // Send the response with the created user and token
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password must required' });
  }
  try {
    // Find the user by username
    const user = await Attandance.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User is not found here' });
    }

    // Compare the hashed password with the provided password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with the username and other optional info
    const token = jwt.sign({ username: user.username, id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    
    // Return the JWT token to the client
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
