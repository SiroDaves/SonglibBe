const express = require("express");
const router = express.Router();

const Acounter = require('../models/acounter');
const Listed = require('../models/listed');

/**
 * GET listed list.
 *
 * @return listed list | empty.
 */
router.get('/', (req, res, next) => {
  try {
    Listed.find({}).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET single listed.
 *
 * @return listed details | empty.
 */
router.get('/:id', (req, res, next) => {
  try {
    Listed.findOne({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * POST new listed.
 *
 * @return listed details | empty.
 */
router.post('/', (req, res, next) => {
  if (req.body.title) {
    Acounter.findOne({ _id: 'listeds' })
      .then((counter) => {
        req.body.id = counter.seq + 1;

        Listed.create(req.body)
          .then((data) => {
            Acounter.findOneAndUpdate({ _id: 'listeds' }, { $inc: { seq: 1 } }, { new: true }).then();
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
 * POST edit listed.
 *
 * @return listed details | empty.
 */
router.put('/:id', (req, res, next) => {
  try {
    const update = req.body;
    Listed.findOneAndUpdate({ _id: req.params.id }, update, { new: true })
      .then((data) => res.json({
        status: 200,
        data: data,
        message: 'Listed updated successfully',
      }))
      .catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * DELETE a listed.
 *
 * @return delete result | empty.
 */
router.delete('/:id', (req, res, next) => {
  Listed.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json({
      status: 200,
      message: 'Listed deleted successfully',
    }))
    .catch(next);
});

module.exports = router;
