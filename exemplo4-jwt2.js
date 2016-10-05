'use strict';
const Hapi = require('hapi');
const jwt2 = require('hapi-auth-jwt2');
const JWT = require('jsonwebtoken');
const SECRET = 'NeverShareYourSecret';
const people = { 
    123: {
        id: 1,
        name: 'Jen Jones'
    }
};

const validate = function (decoded, request, callback) {
    if (!people[decoded.id]) return callback(null, false);
    return callback(null, true);
};

var server = new Hapi.Server();
server.connection({ port: 8000 });
server.register(jwt2, () => {

    server.auth.strategy('jwt', 'jwt',
        {
            key: SECRET,
            validateFunc: validate,
            verifyOptions: { algorithms: ['HS256'] }
        });

    server.auth.default('jwt');

    server.route([
        {
            method: 'GET',
            path: '/token',
            config: {
                auth: false
            },
            handler: (request, reply) => {
                const obj = { id: 123, "name": "Charlie" }; // object/info you want to sign
                const token = JWT.sign(obj, SECRET);
                //new Buffer('partToken', 'base64').toString();
                return reply(token);
            }
        },
        {
            method: "GET",
            path: "/",
            config: {
                auth: false
            },
            handler: (request, reply) => {
                reply({ text: 'Token not required' });
            }
        },
        {
            method: 'GET',
            path: '/restricted',
            config: {
                auth: 'jwt'
            },
            handler: (request, reply) => {
                reply({ text: 'You used a Token!' })
                    .header("Authorization", request.headers.authorization);
            }
        }
    ]);
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});