import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const [rows] = await pool.query('SELECT * FROM workouts WHERE user_id = ?', [userId]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching workouts', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}