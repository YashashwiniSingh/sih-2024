// src/pages/api/store-interactions.js
import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

let interactionDataBuffer = [];
let bufferTimestamp = Date.now();

export default function handler(req, res) {
  if (req.method === 'POST') {
    const interactionData = req.body;

    // Add interaction data to buffer
    interactionDataBuffer.push(interactionData);

    // Check if 10 seconds have passed
    if (Date.now() - bufferTimestamp >= 10000) {
      // Prepare CSV data from buffer
      const csvData = interactionDataBuffer.map(data => ({
        mouseMovements: JSON.stringify(data.mouseMovements),
        keystrokes: JSON.stringify(data.keystrokes),
        scrollingPatterns: JSON.stringify(data.scrollingPatterns),
        ipAddress: data.ipAddress
      }));

      const fields = ['mouseMovements', 'keystrokes', 'scrollingPatterns', 'ipAddress'];
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
          bufferTimestamp = Date.now();
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
