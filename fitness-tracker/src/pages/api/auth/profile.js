import pool from '../../../lib/db';
import authMiddleware from '../../../lib/authMiddleware';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch the user's profile from the database
      const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [req.userId]);
      res.status(200).json(user[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Wrap the handler with the authMiddleware
export default authMiddleware(handler);