const mongoose = require('mongoose');

const Product = require('../models/product');

module.exports.get_all = (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };

            if (docs.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'No product'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

module.exports.get_product_by_id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No product for this id'
                });
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
};

module.exports.create_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST request to /product',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
};

module.exports.update_product = (req, res, next) => {
    const id = req.params.productId;
    Product.update({ _id: id }, {
        $set: {
            name: req.body.name,
            price: req.body.price
        }
    })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
};

module.exports.delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
};