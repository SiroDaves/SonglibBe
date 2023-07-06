const express = require("express");
const router = express.Router();

const Acounter = require('../models/acounter');
const Product = require('../models/product');

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get('/', (req, res, next) => {
  try {
    Product.find({}).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET single product.
 *
 * @return product details | empty.
 */
router.get('/:id', (req, res, next) => {
  try {
    Product.findOne({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * POST new product.
 *
 * @return product details | empty.
 */
router.post('/', (req, res, next) => {
  if (req.body.title) {
    Acounter.findOne({ _id: 'products' })
      .then((counter) => {
        req.body.id = counter.seq + 1;

        Product.create(req.body)
          .then((data) => {
            Acounter.findOneAndUpdate({ _id: 'products' }, { $inc: { seq: 1 } }, { new: true }).then();
            res.json(data);
          })
          .catch((error) => {
            if (error.code === 11000) {
              res.status(409).json({ error: 'Duplicate record found' });
            } else {
              res.status(500).json({ error: 'Internal server error' });
            }
            next(error);
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
        next(error);
      });
  } else {
    res.json({ error: 'An input field is either empty or invalid', });
  }
});

/**
 * POST edit product.
 *
 * @return product details | empty.
 */
router.post('/:id', (req, res, next) => {
  let myquery = { _id: ObjectId(req.params.id) };
  if (req.body.title) {
    Product.updateOne(myquery, req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    }).then((data) => res.json(data)).catch(next);
  } else {
    res.json({ error: 'An input field is either empty or invalid', });
  }
});

/**
 * DELETE a product.
 *
 * @return delete result | empty.
 */
router.delete('/:id', (req, res, next) => {
  Product.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
});

module.exports = router;
