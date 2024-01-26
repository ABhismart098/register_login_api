// // controller.js
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dataModel = require('../datamodel/datamodel');
// const config = require('../config/config');

// async function register(req, res) {
//   const { username, password } = req.body;

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Store user information in the database
//   try {
//     const user = await dataModel.createUser(username, hashedPassword);
//     res.json({ id: user.id, username: user.username });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// async function login(req, res) {
//     const { username, password } = req.body;
  
//     // Retrieve user information from the database
//     try {
//       const user = await dataModel.getUserByUsername(username);
  
//       if (user) {
//         // User found, check password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
  
//         if (isPasswordValid) {
//           // Generate a JWT token
//           const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
//           res.json({ token });
//         } else {
//           // Password incorrect
//           res.status(401).json({ error: 'Incorrect password' });
//           console.log("invalid password");
//         }
//       } else {
//         // User not found
//         res.status(401).json({ error: 'User not found' });
//         console.log("user not found");
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
  

// module.exports = { register, login };
// controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dataModel = require('../datamodel/datamodel');
const config = require('../config/config');

async function register(req, res) {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user information in the database
    const user = await dataModel.createUser(username, hashedPassword);

    res.json({ id: user.id, username: user.username });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Retrieve user information from the database
    const user = await dataModel.getUserByUsername(username);

    if (user) {
      // User found, check password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Generate a JWT token
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          config.jwtSecret,
          { expiresIn: '1h' }
        );
        res.json({ token });
      } else {
        // Password incorrect
        console.log('Incorrect password for user:', username);
        res.status(401).json({ error: 'Incorrect password' });
      }
    } else {
      // User not found
      console.log('User not found:', username);
      res.status(401).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { register, login };
