const express = require('express')
const path = require('path')

const router = express.Router()

const healthRouter = require('./health')
const envRouter = require('./env')

let handler = express.static('./src/dist/')

router.use(handler)
router.get('/', handler)

router.get('/healthcheck', healthRouter)
router.get('/env', envRouter)

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/src/output', 'index.html'))
})

module.exports = router