const express = require("express");
const router = express.Router();

const Acounter = require('../models/acounter');
const UserProfile = require('../models/user_profile');

/**
 * GET user profile list.
 *
 * @return user profile list | empty.
 */
router.get('/', (req, res, next) => {
  try {
    Acounter.findOne({ _id: 'userprofiles' })
      .then((counter) => {
        req.body.id = counter.seq + 1;

        UserProfile.create(req.body)
          .then((data) => {
            Acounter.findOneAndUpdate({ _id: 'userprofiles' }, { $inc: { seq: 1 } }, { new: true }).then();
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
 * GET single user profile.
 *
 * @return user profile details | empty.
 */
router.get('/:id', (req, res, next) => {
  try {
    UserProfile.findOne({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * POST new user profile.
 *
 * @return user profile details | empty.
 */
router.post('/', (req, res, next) => {
  if (req.body.title) {
    UserProfile.create(req.body).then((data) => res.json(data)).catch(next);
  } else {
    res.json({ error: 'An input field is either empty or invalid', });
  }
});

/**
 * POST edit user profile.
 *
 * @return user profile details | empty.
 */
router.post('/:id', (req, res, next) => {
  let myquery = { _id: ObjectId(req.params.id) };
  if (req.body.title) {
    UserProfile.updateOne(myquery, req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    }).then((data) => res.json(data)).catch(next);
  } else {
    res.json({ error: 'An input field is either empty or invalid', });
  }
});

/**
 * DELETE a user profile.
 *
 * @return delete result | empty.
 */
router.delete('/:id', (req, res, next) => {
  UserProfile.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
});

module.exports = router;
