import express from 'express';
import Users from '../models/user.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await Users.find();
  res.json({ users: users });
});

export default router;