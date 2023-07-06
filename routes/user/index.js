const express = require("express");
const router = express.Router();

const Acounter = require('../../models/acounter');
const UserAccount = require('../../models/user');

/**
 * GET user account list.
 *
 * @return user account list | empty.
 */
router.get('/', (req, res, next) => {
  try {
    UserAccount.find({}).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET single user account.
 *
 * @return user account details | empty.
 */
router.get('/:id', (req, res, next) => {
  try {
    UserAccount.findOne({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET single user account using email
 *
 * @return user account details | empty.
 */
router.get('/email/:email', (req, res, next) => {
  try {
    UserAccount.findOne({ email: req.params.email }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST new user account.
 *
 * @return user account details | empty.
 */
router.post('/', (req, res, next) => {
  if (req.body.username) {
    Acounter.findOne({ _id: 'useraccounts' })
      .then((counter) => {
        req.body.id = counter.seq + 1;
        UserAccount.create(req.body)
          .then((data) => {
            Acounter.findOneAndUpdate({ _id: 'useraccounts' }, { $inc: { seq: 1 } }, { new: true }).then();
            res.json(data);
          })
          .catch((error) => {
            if (error.code === 11000) {
              res.status(409).json({ error: `Duplicate record found: ${error.message}` });
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
 * POST edit user account.
 *
 * @return user account details | empty.
 */
router.put('/:id', (req, res, next) => {
  try {
    const update = req.body;
    UserAccount.findOneAndUpdate({ _id: req.params.id }, update, { new: true })
      .then((data) => res.json({
        status: 200,
        data: data,
        message: 'UserAccount updated successfully',
      }))
      .catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * DELETE a user account.
 *
 * @return delete result | empty.
 */
router.delete('/:id', (req, res, next) => {
  UserAccount.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json({
      status: 200,
      message: 'UserAccount deleted successfully',
    }))
    .catch(next);
});

module.exports = router;
