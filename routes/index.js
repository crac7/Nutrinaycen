var express = require('express');
var router = express.Router();
var Admin={
  usuario:"cesar",
  password:"1234"
};




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login_admin.jade', { title: 'Login' });

});


router.post('/entrar', function(req, res, next) {
 //res.render('admin');
	if(req.body.usuario == Admin.usuario && req.body.clave == Admin.password)
	{
		
		res.render('admin', { title: 'Adminitrador' });
	}
	else
	{
		res.send("Fuera de aqui :P ");
	}
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});




/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userEmail = req.body.useremail;
    var userNombre = req.body.usernom;
    var userApellido = req.body.userapellido;
    var userCelular = req.body.usercelular;

    // Set our collection
    var collection = db.get('user');

    // Submit to the DB
    collection.insert({
        "email" : userEmail,
        "nombre" : userNombre,
        "apellido" : userApellido,
        "celular" : userCelular
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});





router.get('/salir', function(req, res, next) {
   res.render('login_admin', { title: 'Login' });

});

module.exports = router;
