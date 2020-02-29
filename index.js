const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
var mysql = require('mysql')



  connection.connect(function(err){
    if(err) throw err;
    console.log('Connected..');
  })

  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
  ////////////////////////////////////

  app.post('/user_create',(req,res)=>{
    console.log("trying to create new user...")
    var sql = "insert into testing values(null,'"+ req.body.firstname +"','"+ req.body.lastname +"')";
    connection.query(sql,function(err,result){
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      console.log(result);
    })
    //connection.end();
    res.redirect('/');
  })
  app.get('/users',(req,res)=>{
    connection.query("select * from testing",function(err,rows,fields){
      if(err) throw err
      res.json(rows)
    })
  })