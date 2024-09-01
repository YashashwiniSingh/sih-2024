// src/pages/api/store-interactions.js
import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

let interactionDataBuffer = [];
let lastWriteTimestamp = Date.now();

export default function handler(req, res) {
  if (req.method === 'POST') {
    const interactionData = req.body;

    // Add interaction data to buffer
    interactionDataBuffer.push(interactionData);

    // Check if 15 seconds have passed since the last write
    if (Date.now() - lastWriteTimestamp >= 15000) {
      // Prepare CSV data from buffer
      const csvData = interactionDataBuffer.map(data => ({
        mouseMovements: JSON.stringify(data.mouseMovements),
        keystrokes: JSON.stringify(data.keystrokes),
        scrollingPatterns: JSON.stringify(data.scrollingPatterns),
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        screenResolution: data.screenResolution,
        timezone: data.timezone,
        language: data.language
      }));

      const fields = ['mouseMovements', 'keystrokes', 'scrollingPatterns', 'ipAddress', 'userAgent', 'screenResolution', 'timezone', 'language'];
      const opts = { fields };

      try {
        const csv = parse(csvData, opts);

        // Write CSV data to file
        const filePath = path.join(process.cwd(), 'interaction-data.csv');
        fs.appendFile(filePath, csv + '\n', (err) => {
          if (err) {
            console.error('Error writing data:', err);
            res.status(500).json({ message: 'Failed to store data' });
            return;
          }
          // Clear buffer and reset timestamp
          interactionDataBuffer = [];
          lastWriteTimestamp = Date.now();
          res.status(200).json({ message: 'Data stored successfully' });
        });
      } catch (err) {
        console.error('Error converting data to CSV:', err);
        res.status(500).json({ message: 'Failed to convert data to CSV' });
      }
    } else {
      res.status(200).json({ message: 'Data buffered successfully' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}