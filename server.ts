import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  isEnquiryBackendConfigured,
  validateEnquiryInput,
} from './src/utils/enquiryValidation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '32kb' }));

  app.get('/api/enquiry-status', (_req, res) => {
    const configured = isEnquiryBackendConfigured(process.env);
    res.json({
      configured,
      requirement: configured
        ? null
        : 'Server-side enquiry delivery (ENQUIRY_WEBHOOK_URL) is not yet configured.',
    });
  });

  app.post('/api/enquiries', async (req, res) => {
    const validation = validateEnquiryInput(req.body ?? {});

    if (!validation.valid) {
      res.status(400).json({
        accepted: false,
        code: 'VALIDATION_ERROR',
        message: 'Please review the highlighted fields and try again.',
        errors: validation.errors,
      });
      return;
    }

    if (!isEnquiryBackendConfigured(process.env)) {
      res.status(200).json({
        accepted: false,
        configured: false,
        code: 'BACKEND_NOT_CONFIGURED',
        message:
          'Enquiry submission is currently unavailable in this preview because a server-side delivery endpoint (ENQUIRY_WEBHOOK_URL) has not been configured yet. Your details have been kept in the form below.',
      });
      return;
    }

    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL!.trim();

    try {
      const upstream = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'AMA Visual Concepts Website',
          submittedAt: new Date().toISOString(),
          enquiry: validation.sanitized,
        }),
      });

      if (!upstream.ok) {
        res.status(502).json({
          accepted: false,
          configured: true,
          code: 'DELIVERY_FAILED',
          message:
            'We could not deliver your enquiry at this moment. Your details have been preserved in the form—please try again shortly.',
        });
        return;
      }

      res.status(200).json({
        accepted: true,
        configured: true,
        code: 'ENQUIRY_ACCEPTED',
        message:
          'Thank you. Your enquiry has been received by AMA Visual Concepts and we will respond shortly.',
      });
    } catch {
      res.status(502).json({
        accepted: false,
        configured: true,
        code: 'DELIVERY_ERROR',
        message:
          'A network error occurred while forwarding your enquiry. Your details remain in the form so you do not lose your message.',
      });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`AMA Visual Concepts server listening on http://localhost:${port}`);
  });
}

startServer();
