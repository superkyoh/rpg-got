module.exports.index = function(application, req, res){
    var msg = '';
    if(req.query.msg !== ''){
        msg = req.query.msg;
    }
    res.render('index', {validacao:{}, msg:msg});
}

module.exports.autenticar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('usuario', 'Usuário não pode estar vazio').notEmpty();
    req.assert('senha', 'Senha não pode estar vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros});
        return;
    }

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(dadosForm, req, res);

}