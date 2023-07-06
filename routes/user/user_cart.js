const express = require("express");
const router = express.Router();

const Acounter = require('../models/acounter');
const UserCart = require('../models/user/user_cart');

/**
 * GET user cart list.
 *
 * @return user cart list | empty.
 */
router.get('/', (req, res, next) => {
  try {
    Acounter.findOne({ _id: 'usercarts' })
      .then((counter) => {
        req.body.id = counter.seq + 1;

        UserCart.create(req.body)
          .then((data) => {
            Acounter.findOneAndUpdate({ _id: 'usercarts' }, { $inc: { seq: 1 } }, { new: true }).then();
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
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET single user cart.
 *
 * @return user cart details | empty.
 */
router.get('/:id', (req, res, next) => {
  try {
    UserCart.findOne({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * POST new user cart.
 *
 * @return user cart details | empty.
 */
router.post('/', (req, res, next) => {
  if (req.body.title) {
    UserCart.create(req.body).then((data) => res.json(data)).catch(next);
  } else {
    res.json({ error: 'An input field is either empty or invalid', });
  }
});

/**
 * POST edit user cart.
 *
 * @return user cart details | empty.
 */
router.post('/:id', (req, res, next) => {
  let myquery = { _id: ObjectId(req.params.id) };
  if (req.body.title) {
    UserCart.updateOne(myquery, req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    }).then((data) => res.json(data)).catch(next);
  } else {
    res.json({ error: 'An input field is either empty or invalid', });
  }
});

/**
 * DELETE a user cart.
 *
 * @return delete result | empty.
 */
router.delete('/:id', (req, res, next) => {
  UserCart.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
});

module.exports = router;
