import express from 'express';
import auth from '../../middleware/auth.js';
const router = express.Router();
router.use(auth.authenticate)
router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

export default router;
