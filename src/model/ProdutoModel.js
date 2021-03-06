const db = require('../database/database')

module.exports = class Produtos {
    static getall(callback) {
        return db.query('SELECT * FROM produtos', callback)
    }

    static getId(id, callback) {
        return db.query(`SELECT * FROM produtos WHERE pro_in_codigo = ${id}`, callback)
    }

    static getByFarmaciaId(id, callback) {
        return db.query(`SELECT * FROM produtos p
        INNER JOIN produto_farmacia pf ON p.pro_in_codigo = pf.pro_in_codigo
        INNER JOIN farmacia f ON f.far_in_codigo = pf.far_in_codigo
        where f.far_in_codigo = ${id}`, callback)
    }

    static post(produtos, callback) {
        return db.query('insert into produtos( pro_st_nome, pro_st_marca, pro_st_cod_barra, pro_ch_classificacao) values(?, ?, ?, ?)', [produtos.nome, produtos.marca, produtos.codBarra, produtos.classificacao], callback)
    }

    static put(produtos, callback) {
        return db.query('UPDATE produtos SET pro_st_nome = ?, pro_st_marca = ?, pro_st_cod_barra = ?, pro_ch_classificacao = ? WHERE pro_in_codigo = ?', [produtos.nome, produtos.marca, produtos.codBarra, produtos.classificacao, produtos.codigo], callback)
    }

    static delete(id, callback) {
        return db.query(`DELETE FROM produtos WHERE pro_in_codigo = ${id}`, callback)
    }

    static getByName(name, callback) {
        return db.query(`SELECT * FROM 
        produtos WHERE 
        pro_st_nome Like '%${name}%' 
        or 
        pro_st_cod_barra like '%${name}%'
        or 
        pro_st_marca like '%${name}%'
        or
        pro_ch_classificacao like '%${name}%'`, callback)
    }


    

}