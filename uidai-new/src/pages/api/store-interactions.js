// src/pages/api/store-interactions.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const interactionData = req.body;

    const filePath = path.join(process.cwd(), 'interaction-data.json');
    const jsonData = JSON.stringify(interactionData, null, 2);

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('Error writing data:', err);
        res.status(500).json({ message: 'Failed to store data' });
        return;
      }
      res.status(200).json({ message: 'Data stored successfully' });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}