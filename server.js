const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { solveMathProblem } = require('./services/geminiService');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000', // Frontend'inizin çalıştığı adres
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('Matematik Çözücü API');
});

app.post('/solve', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Resim gerekli' });
    }

    console.log('Resim alındı, uzunluk:', image.length);
    console.log('Resim örneği:', image.substring(0, 100)); // İlk 100 karakteri göster

    const solution = await solveMathProblem(image);
    console.log('Çözüm:', solution);
    res.json({ solution });
  } catch (error) {
    console.error('Hata detayı:', error.message);
    console.error('Tam hata:', error);
    res.status(500).json({ error: 'Sunucu hatası', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
