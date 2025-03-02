import pool from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check if the user exists
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user[0].id }, // Payload (data to include in the token)
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}