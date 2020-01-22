const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const postsRouter = require("../posts/postsRouter");
const commentsRouter=require("../comments/commentsRouter");
server.use(express.json());
server.use(morgan('common'));
server.use(helmet());
server.use(cors());
server.use(`/api/posts`, postsRouter);
// server.use('/api/posts', commentsRouter);

server.get('/',(req,res)=>{
    res.status(200).send("<h1>Servs up</h1>")
})
module.exports = server;


