const express = require('express'); // importing a CommonJS module
const morgan = require('morgan')
const helmet = require('helmet')
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//creating own middleware
const logQuote= (coin) => (req,res,next) => {

  console.log(`a ${coin} earned is a ${coin} not enjoyed :) `)
  console.log(req.method, req.url)
  next()

}


server.use(express.json());
//gives details about request use -D for deveelopment
server.use(morgan("dev"))
//protect headers
server.use(helmet())
//self built 
server.use(logQuote("nickel"))
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
  `);
});

module.exports = server;
