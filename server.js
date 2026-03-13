import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 3000;
const siteDir = path.join(__dirname, 'cloned-site');

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(
  express.static(siteDir, {
    extensions: ['html'],
    index: 'index.html',
  })
);

app.get('*', (req, res, next) => {
  if (path.extname(req.path)) {
    return next();
  }

  res.sendFile(path.join(siteDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Coworkit clone running at http://localhost:${port}`);
});
