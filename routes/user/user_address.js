const express = require("express");
const router = express.Router();

const Acounter = require('../../models/acounter');
const UserAddress = require('../../models/user/user_address');

/**
 * GET user address list.
 *
 * @return user address list | empty.
 */
router.get('/', (req, res, next) => {
  try {
    UserAddress.find({}).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET single user address.
 *
 * @return user address details | empty.
 */
router.get('/:id', (req, res, next) => {
  try {
    UserAddress.findOne({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * POST new user address.
 *
 * @return user address details | empty.
 */
router.post('/', (req, res, next) => {
  if (req.body.title) {
    Acounter.findOne({ _id: 'useraddresses' })
      .then((counter) => {
        req.body.id = counter.seq + 1;

        UserAddress.create(req.body)
          .then((data) => {
            Acounter.findOneAndUpdate({ _id: 'useraddresses' }, { $inc: { seq: 1 } }, { new: true }).then();
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
 * POST edit user address.
 *
 * @return user address details | empty.
 */
router.post('/:id', (req, res, next) => {
  let myquery = { _id: ObjectId(req.params.id) };
  if (req.body.title) {
    UserAddress.updateOne(myquery, req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    }).then((data) => res.json(data)).catch(next);
  } else {
    res.json({ error: 'An input field is either empty or invalid', });
  }
});

/**
 * DELETE a user address.
 *
 * @return delete result | empty.
 */
router.delete('/:id', (req, res, next) => {
  UserAddress.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
});

module.exports = router;
