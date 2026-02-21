import { Router } from 'express';

const router = Router();

router.get('/catalog', (_req, res) => {
  res.json([
    { key: 'tgi', name: 'Text Generation Inference', local: true },
    { key: 'transformers-gradio', name: 'Transformers + Gradio', local: true },
    { key: 'whisper-asr', name: 'Whisper ASR', local: true },
    { key: 'diffusers', name: 'Diffusers', local: true }
  ]);
});

router.post('/run', (req, res) => {
  const { app = 'tgi', payload = {} } = req.body || {};
  res.json({ queued: true, app, payload });
});

router.get('/status/:app', (req, res) => {
  res.json({ app: req.params.app, status: 'ready' });
});

export default router;
