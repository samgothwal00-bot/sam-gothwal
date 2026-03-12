import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Database from 'better-sqlite3';

const db = new Database('portfolio.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    id TEXT PRIMARY KEY,
    data TEXT
  )
`);

const defaultData = {
  hero: {
    name: "Sergio Gadot",
    title: "Passionate Designer",
    description: "I design and build beautiful, functional websites and online stores that help businesses grow and succeed in the digital world."
  },
  about: {
    heading: "I'm a Freelancer Front-end Developer with over 3 years of experience.",
    description: "I specialize in creating interactive and responsive user interfaces using modern technologies. My goal is to deliver high-quality code that provides an exceptional user experience.",
    stats: [
      { label: "Projects Completed", value: "5k+" },
      { label: "Satisfied Clients", value: "3k+" }
    ]
  }
};

// Seed initial data if empty
const existing = db.prepare('SELECT * FROM content WHERE id = ?').get('main');
if (!existing) {
  db.prepare('INSERT INTO content (id, data) VALUES (?, ?)').run('main', JSON.stringify(defaultData));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/content', (req, res) => {
    const row = db.prepare('SELECT data FROM content WHERE id = ?').get('main') as { data: string };
    res.json(JSON.parse(row.data));
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
