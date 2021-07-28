let http = require('http');
let str = '';
for(let i = 0; i<1024*10 ;i++){
    str+='a';
}

str = Buffer.from(str);

http.createServer(function(req,res){
    res.writeHead(200);
    res.end(str);
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
