'use strict';
const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    'path': '/',
    'method': 'POST',
    'config': {
        'handler': (req, reply) => {
            let dadosTela = req.payload;
            var a = new Date()
            
            reply(`Olá Hapi - 
                     nome: ${dadosTela.nome}, 
                       telefone: ${dadosTela.telefone}   
                        data de nascimento: ${dadosTela.dataNascimento.toLocaleString()}`);
        },
        'validate': {
            'payload': {
                nome: Joi.string().min(0).max(10).required(),
                telefone: Joi.number().integer().min(0),
                dataNascimento: Joi.date().required()
            }
        }
    }
})

server.start(() => {
    console.log('servidor rodando com hapi!!');
})