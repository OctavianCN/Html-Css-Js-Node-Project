const express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var app = express();
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const nodemailer = require("nodemailer");

const crypto = require('crypto');

// initializari socket.io
const http=require('http')
//setez o sesiune
app.use(cookieParser());
app.use(session({
    secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false
  }));
app.set('view engine', 'ejs');//inainte de get si post

//setez folderele statice (cele in care nu am fisiere generate prin node)
app.use('/resurse', express.static(__dirname+"/resurse"));
app.use('/css', express.static('css'));
/*app.get('/login', function(req, res)  {
    res.render('html/login', {user: req.session.username});
    
});*/
app.get('/logout', function(req, res) {
    req.session.destroy();//distrug sesiunea cand se intra pe pagina de logout
	res.render('html/logout');
});
app.get('/index', function(req, res)  {
    res.render('html/index', {user: req.session.username});
});
app.get('/about', function(req, res)  {
    res.render('html/about', {user: req.session.username});
});
app.get('/DeCeTrebuieSaProtejamNatura', function(req, res)  {
    res.render('html/DeCeTrebuieSaProtejamNatura', {user: req.session.username});
});
app.get('/CumPutemProtejaNatura', function(req, res)  {
    res.render('html/CumPutemProtejaNatura', {user: req.session.username});
});
app.get('/Game', function(req, res)  {
    res.render('html/Game', {user: req.session.username});
});
app.get('/Users', function(req,res){

    let rawdata=fs.readFileSync('useri.json');
    let jsfis= JSON.parse(rawdata); 

    res.render('html/Users',{user: req.session.username,useri: jsfis.users});

})
app.post('/login', function(req, res) {
    
    var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		jsfis=JSON.parse(fs.readFileSync("useri.json"));
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');//creez un obiect de tip cifru cu algoritmul aes
		var encrParola= cifru.update(fields.psw, 'utf8', 'hex');//cifrez parola
        encrParola+=cifru.final('hex');//inchid cifrarea (altfel as fi putut adauga text nou cu update ca sa fie cifrat
		let user=jsfis.users.find(function(x){//caut un user cu acelasi nume dat in formular si aceeasi cifrare a parolei
			
			return (x.username==fields.username&& x.password == encrParola );
		});
		if(user){
			console.log(user);
			
            req.session.username=user;//setez userul ca proprietate a sesiunii
            req.session.save();
            console.log(req.session);
		}
		
		//console.log(req.session.username);
        /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
        res.redirect("index");
        //res.render("html/login",  { user: req.session.username });
        //res.redirect("/index");

	});
});
  app.get('/', function(req, res) {
    /*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    console.log(req.session.username);
    res.render('html/index',{user: req.session.username});
    });
app.get("/*",function (req, res, next) {
    res.render("html"+req.path,  function(err, html) { //render are un parametru optional cu o functie callback
        //err e setat cand avem o eroare
        //html e setat cand a fost gasit view-ul cu succes
        if (err) { //daca avem eroare
        	console.log(err.message)
            if (err.message.indexOf('Failed to lookup view') !== -1) {//verificam daca eroarea contine mesajul de view negasit
                return res.status(404).render('html/404');//caz in care afisam pagina de 404
            }
            throw err;//altfel aruncam mai departe eroarea (generata de alte cauze)
        }
        res.send(html);  //daca nu a fost nicio eroare trimitem html-ul rezultat in urma compilarii cu render
    });
});
app.get('/Register', function(req, res) {
	console.log(req.session.username);
    res.render('html/Register', {user: req.session.username});
});

/*app.get('/logount', function(req, res) {
    req.session.destroy();//distrug sesiunea cand se intra pe pagina de logout
	res.render('html/logount');	
});*/
app.post('/Register', (req, res) => {
	
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files)
    {
        let rawdata=fs.readFileSync("useri.json");
        let jsfis=JSON.parse(rawdata);
        var cifru=crypto.createCipher('aes-128-cbc', 'mypassword');
        var encParola=cifru.update(fields.psw, 'utf8', 'hex');
        encParola+=cifru.final('hex');
        console.log(fields.psw+" "+encParola)
        jsfis.users.push({id: jsfis.nextId, username: fields.username, password: encParola, name: fields.name});
        jsfis.nextId++;
        let data=JSON.stringify(jsfis);
        fs.writeFileSync("useri.json", data);
        res.render("html/index", {user: req.session.username});
       
    });
	
	
});

app.use(function(req,res){
    res.status(404).render('html/404');
});
app.listen(8080);//ultimul din fisier NEAP!
console.log('Serverul a pornit pe portul 8080');
