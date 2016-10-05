const Hapi = require('hapi');
const Joi = require('joi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': { info: { 'title': 'Minha API', 'version': "1.0" } },
    }
], (err) => {
    server.start(() => {
        console.log('server rodando!');
    });
});

server.route([
    {
        method: 'GET',
        path: '/products',
        config: {
            handler: (req, reply) => {
                return reply([]);
            },
            description: 'Listar todos os produtos',
            notes: 'Retorna os produtos',
            tags: ['api'],
            validate: {
                query: {
                    nome: Joi.string()
                             .required()
                            //  .description('nome do produto')
                }
            }
        }
    }
]);


