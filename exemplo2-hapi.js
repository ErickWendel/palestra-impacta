const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({port : 3000});
server.route({
    'method': 'GET',
    'path': '/',
    'handler': (req, reply) => {
        return reply('Hello, world');
    }
})
server.start(() => {
    console.log('servidor rodando!!');
});