// dataModel.js
const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool(config.database);

async function createUser(username, hashedPassword) {
  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create user');
  }
}

async function getUserByUsername(username) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch user');
  }
}

module.exports = { createUser, getUserByUsername };
