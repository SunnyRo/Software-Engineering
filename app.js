const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var mysql = require('mysql')
const http = require('http')
const fs = require('fs')
const port = 3000
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

// const server = http.createServer(function(req,res){
//   res.writeHead(200,{'Content-Type':'text/html'})
//   fs.readFile('index.html',function(err,data){
//     if(err){
//       res.writeHead(404)
//       res.write('Error: File not Found')
//     }else{
//       res.write(data)
//     }
//     res.end()
//   })
// })
// server.listen(port, function(err){
//   if(err){
//     console.log('something went wrong...',error)
//   } else{
//     console.log('server is listening on port '+port)
//   }
// })

app.get('*', function(req, res){
  res.sendfile('/public/index.html');
});

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
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))