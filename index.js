const express = require('express')
const app = express()

app.get('/', function(req, res){
    const text = process.env.TEXT || 'HELLO TEST'
    res.send(text)
})

const port = process.env.PORT || 3000
app.listen(port, function() {
    console.log(`服务已启动，端口：${port}`);    
})