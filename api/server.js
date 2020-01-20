const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const postsRouter = require("../posts/postsRouter");
server.use(express.json());
server.use(morgan('common'));
server.use(helmet());
server.use(cors());
server.use(`/api/posts`, postsRouter);

module.exports = server;


