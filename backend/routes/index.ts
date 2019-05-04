import express from 'express';
import apiRouter from './api';
import testRouter from './test';

const router = express.Router();

router.use('/api', apiRouter);
router.use('/test', testRouter);

export default router;
