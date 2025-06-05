// server.js
const cluster = require('cluster');
const os = require('os');
const http = require('http');
const app = require('./app'); // Import your Express app

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`👑 Master process : ${process.pid} is running`);
  console.log(` The number of CPU is created (sub server):  ${numCPUs} `);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Optional: Restart a worker if it crashes
  cluster.on('exit', (worker, code, signal) => {
    console.log(` Worker ${worker.process.pid} died. Spawning a new one...`);
    cluster.fork();
  });

} else {
  // Each worker runs the Express server
  http.createServer(app).listen(PORT, () => {
    console.log(`Worker/sub serevr : ${process.pid} started server on port : ${PORT}`);
  });
}
