const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var mysql = require('mysql')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
const port = 3000



// const http = require('http')
// const fs = require('fs')
// const server = http.createServer(function(req,res){
//   res.writeHead(200,{'Content-Type':'text/html'})
//   fs.readFile('index.html',function(error,data){
//     if(error){
//       res.writeHead(404)
//       res.write('Error: File not Found')
//     }else{
//       res.write(data)
//     }
//     res.end()
//   })
// })
// server.listen(port, function(error){
//   if(error){
//     console.log('something went wrong...',error)
//   } else{
//     console.log('server is listening on port '+port)
//   }
// })

// app.get('*', function(req, res){
//   res.sendfile('index.html');
// });

var connection = mysql.createConnection({
  port: '3306',
  host: 'bluebrain.ck13expvgtvq.us-west-1.rds.amazonaws.com',
  user: 'bluebrain',
  password: 'bluebrain123456',
  database: 'bluebrain' 
});
connection.connect(function(err){
  if(err) throw err;
  console.log('Connected..');
})
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))