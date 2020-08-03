require('dotenv').config();
const koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');

const server = new koa();
const route = new Router();

const PORT = parseInt(process.env.PORT, 10) || 3000;

server.use(json());

route.get('/', (ctx, next) => {
});

server.use(route.routes());

server.listen(PORT, 'localhost', ()=> console.log('Server started!'));