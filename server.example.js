import fs from "fs/promises";
import http from "http";
import path from "path";

const chalk = require("chalk");
const {addNote} = require("./note.controller");
const server = http.createServer(async (req, res) => {
  console.log(chalk.blue(`Client request method: ${req.method}`))
  if (req.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.ejs'))
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(content)
  } else if (req.method === 'POST') {
    const body = []
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    })

    req.on('data', data => {
      body.push(Buffer.from(data))
    })

    req.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ')
      addNote(title)

      res.end(`Title = ${title}`)
    })
  }
})