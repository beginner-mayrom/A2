const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(express.json());

//carregando o cabeçalho do html em outras páginas
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//arquivos estáticos
app.use('/css', express.static('public/css'));

app.use('/imgs', express.static('public/imgs'));

//rota home
app.get('/', function (req, res) {

    res.render('home');
});

//rota exibir
app.get('/all', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/pecas');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//rota para cadastro
app.get('/new', function (req, res) {

    res.render('form_add');
});

//fazendo a inserção no banco de dados
app.post('/add', async function (req, res) {
    try {
        const { brand, model, year, piece } = req.body;
        await axios.post('http://localhost:5000/pecas', { brand, model, year, piece });
        res.status(201).json({ message: "Cadastro realizado com sucesso" });
        // redirecionado para home
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//rota excluir
app.get('/delete/:id', async function (req, res) {
    try {
        await axios.delete(`http://localhost:5000/pecas/${req.params.id}`);
        res.status(200).json({ message: "Exclusão realizada com sucesso" });
        // redirecionado para home
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//rota para alterar
app.get('/alter/:id', async function (req, res) {
    try {
        const products = await axios.get(`http://localhost:5000/pecas/${req.params.id}`);
        res.render('form_update', {products: products.data})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//alterando os dados no bd
app.post('/update', async function (req, res) {
    try {
        const { brand, model, year, piece } = req.body;
        await axios.put(`http://localhost:5000/pecas/${req.params.id}`, { brand, model, year, piece });
        res.status(200).json({ message: "Atualização realizada com sucesso" });
        // redirecionado para home
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(8081, function () {
    console.log('Servidor rodando na url http://localhost:8081');
});