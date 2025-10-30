const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const TOKEN = process.env.INSTAGRAM_TOKEN; // añade en .env: INSTAGRAM_TOKEN=TU_TOKEN
if (!TOKEN) {
  console.warn('INSTAGRAM_TOKEN no configurado. Crea .env con INSTAGRAM_TOKEN=...');
}

app.get('/instagram/latest', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '6', 10);
    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${TOKEN}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'Instagram API error', detail: text });
    }
    const data = await resp.json();
    const items = (data.data || []).slice(0, limit).map(i => ({
      id: i.id,
      type: i.media_type,
      url: i.media_url || i.thumbnail_url,
      caption: i.caption || '',
      permalink: i.permalink,
      timestamp: i.timestamp
    }));
    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', detail: String(err) });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Instagram proxy running on http://localhost:${PORT}`));