import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, type, duration, calories } = req.body;

    try {
      const [result] = await pool.query(
        'INSERT INTO workouts (user_id, type, duration, calories) VALUES (?, ?, ?, ?)',
        [userId, type, duration, calories]
      );
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Error adding workout', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}