const axios = require('axios');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function solveMathProblem(imageBase64) {
  try {
    console.log('API Anahtarı:', process.env.GEMINI_API_KEY.substring(0, 5) + '...');
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            { text: "Lütfen bu resimde gördüğünüz matematik sorusunu çözün:" },
            { inline_data: { mime_type: "image/jpeg", data: imageBase64 } }
          ]
        }
      ]
    }, {
      params: {
        key: process.env.GEMINI_API_KEY
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Gemini API yanıtı:', response.data);
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API hatası:', error.response ? error.response.data : error.message);
    throw new Error('Matematik sorusu çözülemedi: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
  }
}

module.exports = { solveMathProblem };
