const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the server!'); // Root route
});

// Endpoint to receive URL
app.get('/endpoint/*', (req, res) => {
    // Extracting the URL from the request parameters
    const receivedUrl = req.params[0];  // Get the part after /endpoint/
    
    console.log('Received URL:', receivedUrl); // Log the received URL

    if (!receivedUrl) {
        return res.status(400).send('URL is required');
    }

    let result = '';

    // Spawn a Python process to run the URL detection script
    const pythonProcess = spawn('python', ['urldetection2.py', receivedUrl]);
    
    // Handle data received from the Python script
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
        console.log(result);
    });

    // Handle errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send('Error occurred while running Python script');
    });

    // Handle when the Python process closes
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            if (result[1] == 0) {
              res.json({ message: "The URL is potentially malicious." });
          } else {
              res.json({ message: "The URL is safe." });
          }
        } else {
            res.status(500).send('Python script exited with an error');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
