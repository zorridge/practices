const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Connected to mongodb");
    })
    .catch(error => {
        console.log("Connection to mongodb failed");
        console.log(error);
    });


const seedProducts = [
    {
        name: 'Eggplant',
        price: 2.99,
        category: 'vegetable'
    },
    {
        name: 'Pineapple',
        price: 5.99,
        category: 'fruit'
    },
    {
        name: 'Strawberry',
        price: 7.99,
        category: 'fruit'
    },
    {
        name: 'Cabbage',
        price: 1.99,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Milk',
        price: 3.50,
        category: 'dairy'
    },
    {
        name: 'Grapefruit',
        price: '1.99',
        category: 'fruit'
    }
];

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    });

// const p = new Product({
//     name: 'Grapefruit',
//     price: '1.99',
//     category: 'fruit'
// });

// p.save().then(p => {
//     console.log(p);
// }).catch(e => {
//     console.log(e);
// });