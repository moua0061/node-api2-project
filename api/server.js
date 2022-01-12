
const express = require('express');
const postsRouter = require('./posts/posts-router');

const server = express();
server.use(express.json());

server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send(`
    <p> welcome to the posts api</p>
    `)
});

module.exports = server;
