const express = require('express')
const router = express.Router()
const ProdutoModel = require('../model/ProdutoModel')
const RespostaClass = require('../configs/RespostaClass')
const jwt = require('jsonwebtoken')

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403);
    }
}


router.get('/', ensureToken, function (req, res, next) {
    jwt.verify(req.token, process.env.secret_key, function (err, data) {
        if (err) {
            res.status(403)
        } else {
            ProdutoModel.getall(function (err, data) {
                let resposta = new RespostaClass();

                if (err) {
                    resposta.err = true;
                    resposta.msg = 'Ocorreu um erro no IF(getall)'
                    resposta.errorMessage = err
                } else {
                    resposta.dados = data
                    resposta.msg = 'Sucesso ao receber dados'
                }
                res.json(resposta)
            })
        }
    })
})

router.get('/farmacia/:id', function(req, res) {
    ProdutoModel.getByFarmaciaId(req.params.id, function(err, data) {
        let resposta = new RespostaClass()

        if (err) {
            resposta.err = true
            resposta.msg = 'Ocorreu um erro no IF(getByFarmaciaId)'
            resposta.errorMessage = err
        } else {
            resposta.dados = data
            resposta.msg = 'Sucesso ao receber dados'
        }
        res.json(resposta)
    })
})

router.post('/', function (req, res, next) {
    ProdutoModel.post(req.body, function (err, data) {
        const resposta = new RespostaClass();

        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro no IF(post)'
            resposta.errorMessage = err
        } else {
            if (data.affectedRows > 0) {
                resposta.dados = data
                resposta.msg = 'Cadastrado com sucesso!!!'
            } else {
                resposta.err = true;
                resposta.dados = data;
                resposta.errorMessage = err;
                resposta.msg = 'Ocorreu um erro no segundo IF(post)'
            }
        }
        res.json(resposta)
    })
})

router.post('/', function (req, res, next) {
    ProdutoModel.post(req.body, function (err, data) {
        const resposta = new RespostaClass();

        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro no IF(post)'
            resposta.errorMessage = err
        } else {
            if (data.affectedRows > 0) {
                resposta.dados = data
                resposta.msg = 'Cadastrado com sucesso!!!'
            } else {
                resposta.err = true;
                resposta.dados = data;
                resposta.errorMessage = err;
                resposta.msg = 'Ocorreu um erro no segundo IF(post)'
            }
        }
        res.json(resposta)
    })
})


router.put('/', function (req, res, next) {
    ProdutoModel.put(req.body, function (err, data) {
        const resposta = new RespostaClass();

        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro no IF(put)'
            resposta.errorMessage = err
        } else {
            if (data.affectedRows > 0) {
                resposta.dados = data
                resposta.msg = 'Editadp com sucesso!!!'
            } else {
                resposta.err = true;
                resposta.dados = data;
                resposta.errorMessage = err;
                resposta.msg = 'Ocorreu um erro no segundo IF(put)'
            }
        }
        res.json(resposta)
    })
})

router.delete('/:id?', function (req, res, next) {
    ProdutoModel.delete(req.params.id, function (err, data) {
        const resposta = new RespostaClass();

        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro no IF(delete)'
            resposta.errorMessage = err
        } else {
            if (data.affectedRows > 0) {
                resposta.dados = data
                resposta.msg = 'excluido com sucesso!!!'
            } else {
                resposta.err = true;
                resposta.msg = 'Ocorreu um erro no segundo IF(delete)'
            }
        }
        res.json(resposta)
    })
})

router.post('/nome/?', function (req, res, next) {
    ProdutoModel.getByName(req.body.nome, function (err, data) {
        const resposta = new RespostaClass();

        if (err) {
            resposta.err = true;
            resposta.msg = 'Ocorreu um erro no IF(post)'
            resposta.errorMessage = err
        } else {
            resposta.dados = data
            resposta.msg = 'Sucesso ao receber dados'
        }
        res.json(resposta)
    })
})

module.exports = router;