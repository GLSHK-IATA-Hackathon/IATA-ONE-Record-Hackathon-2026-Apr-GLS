const express = require('express')
const compression = require('compression')
const routes = require('./routes')

const app = express()

//app.use(compression())
//app.use(routes)

const mode = process.env.NODE_ENV || "d0";
const port = process.env.NODE_PORT || 3000
console.log(`[worker] Application [${mode}] is running on port ${port}...`);
app.use(compression());
app.use(routes);
app.listen(port, () => {
    console.log(`[worker] Application [${mode}] is running on port ${port}...`);
});

module.exports = app;