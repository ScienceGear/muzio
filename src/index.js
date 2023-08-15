const fs = require("fs");
const config = require("../config.json");
const Avon = require("./structures/avonClient.js");
const client = new Avon();
module.exports = client;

if (config.repl_user) {
  const express = require("express");
  const http = require("http");

  const app = express();

  // Define a route to serve your HTML content
  app.get("/", (req, res) => {
    // Your HTML content
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Discord Bot Status</title>
    <!-- Add Bootstrap CSS link -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <!-- Add Bootstrap Icons link -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.16.0/font/bootstrap-icons.css" rel="stylesheet">
    
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #282c35;
        color: #ffffff;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
    
      #bot-container {
        text-align: center;
        padding: 20px;
        background-color: #373b44;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    
      #bot-animation {
        font-size: 2.5rem;
        animation: pulse 2s infinite;
      }
    
      p {
        margin-top: 10px;
        font-size: 1.2rem;
      }
    
      .social-icons {
        margin-top: 20px;
      }
    
      .social-icons a {
        color: #ffffff;
        text-decoration: none;
        margin: 0 10px;
        font-size: 1.5rem;
        transition: color 0.3s ease-in-out;
      }
    
      .social-icons a:hover {
        color: #17a2b8;
      }
    
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
    </style>
    </head>
    <body>
    <div id="bot-container">
      <div id="bot-animation">
        🤖 Bot Online 🟢
      </div>
      <p>Join our Discord server to interact with the bot!</p>
      
      <div class="social-icons">
        <a href="https://dsc.gg/sciencegear" target="_blank" class="btn btn-outline-light btn-lg me-3">
          <i class="bi bi-discord"></i> Join our Discord
        </a>
        <a href="https://www.youtube.com/@ScienceGearYT" target="_blank" class="btn btn-outline-light btn-lg">
          <i class="bi bi-youtube"></i> Visit our YouTube
        </a>
      </div>
    </div>
    </body>
    </html>    
    `;

    res.send(htmlContent);
  });

  const server = http.createServer(app);

  server.listen(3000, () => {
    console.log("Replit Mode On Webpage Online Port 3000");
  });
}
