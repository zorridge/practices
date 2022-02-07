// *** SET UP DEPENDENCIES ***
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const Product = require('./models/product');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Connected to mongodb");
    })
    .catch(error => {
        console.log("Connection to mongodb failed");
        console.log(error);
    });



// *** ROUTING ***
const categories = ['fruit', 'vegetable', 'dairy', 'meat'];

// Homepage
app.get('/', (req, res) => {
    res.redirect('/products');
});

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
});

// Create new product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
    const newProduct = await new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

// Read product details
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/details', { product });
});

// Update product details
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
});

// Delete product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
});



// *** OPEN CONNECTION ***
app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000/');
});