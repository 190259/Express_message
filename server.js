//expressモジュールの読み込み
const express = require('express');
//サーバ作成
const app = express();
//JSON対応
app.use(express.json());
//URLエンコードされたデータを解析する
app.use(express.urlencoded({extended: true}));

//クロスドメインの許可 XSS
app.use((req, res, next) => {
    console.log(`middleware: all. url: ${req.url}`);

    //CROS設定: 全てのドメインに対して許可 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //次の処理
    next();
});

app.post('/', (req, res)=> {
   
    let result = {
        message: req.body.message,
        datetime: new Date(),
    };
    res.send(result);
});
//ルーティング
//Webルートにリクエストされたらレスポンス
app.get('/', (req, res) =>{
    res.send('Hello Express!');
});

//app.get(URLパス, 処理);

//無名関数の書き方
// app.get('/', function(req, res){

// });
app.listen(3000);

console.log('Server listen: http://localhost:3000');