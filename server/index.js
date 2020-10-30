var express = require('express');
var app = express();
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000; // Porta do servidor sera a 4000

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Permitir leitura de JSON via POST

// Pegar dados do arquivo data.json e retorna-los
app.get('/data', function(req, res)
{
    let rawdata = fs.readFileSync('data.json');
    let form = JSON.parse(rawdata);

    res.end(JSON.stringify(form));
})

// Enviar dados do formulario para serem salvos no arquivo data.json
app.post('/form_post', function (req, res) {
       
    let body = req.body;
    var form = [];
    try{  // Tentar ler os dados em data.json, caso o arquivo exista
        let rawdata = fs.readFileSync('data.json');
        form = JSON.parse(rawdata);  
    } catch(err) {}
    
    // Adicionar novo dado e escreve-lo no arquivo data.json
    form.push(body);
    let data = JSON.stringify(form);
    fs.writeFile('data.json', data, (err) => {
        if (err) throw err;
        console.log('Dados escritos no arquivo data.json');
    });
    res.end(data);

});  

app.listen(port, () => {
    console.log('Server started on: ' + port);
  });