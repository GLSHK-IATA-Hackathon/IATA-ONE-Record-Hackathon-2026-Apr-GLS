module.exports = function (req, res) {
  const { NODE_ENV } = process.env

  switch (NODE_ENV) {
    case 'd0':
    case 'd1':
    case 'd2':
    case 't0':
    case 't1':
    case 't2':
    case 'p0-blue':
    case 'p0-green':
      require('dotenv').config({
        path: `./.env.${NODE_ENV}`,
        override: true,
      });
      break;
    default:
      require('dotenv').config({ override: true })
  }

  res.send({
    NODE_ENV
  })
}