const { exec } = require('node:child_process')
const express = require('express')
const nmap = require('node-nmap')
var cors = require('cors')

const { port, serverPort } = require('../constants')

const app = express()

app.use(express.static("./dist"));
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:' + port
}))

app.post('/scan', (req, res) => {
  const { body } = req
  const { raw, value } = body

  if (raw) {
    exec('nmap ' + value, (error, stdout, _) => {
      if (error) {
        res.status(500)
          .json({
            result: error
          })
      } else {
        res.status(200)
          .json({
            result: stdout
          })
      }
    });
  } else {
    let quickScan = new nmap.NmapScan(value, '-Pn');

    quickScan.on('complete', function (data) {
      res.status(200)
        .json({
          result: data
        })
    });

    quickScan.on('error', function (error) {
      res.status(500)
        .json({
          result: error
        })
    });

    quickScan.startScan()
  }
})

app.listen(serverPort, () => {
  console.log(`NMap server listening on port ${serverPort}`)
})