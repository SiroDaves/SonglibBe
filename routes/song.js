const express = require("express");
const router = express.Router();

const Acounter = require('../models/acounter');
const Song = require('../models/song');

/**
 * GET song list.
 *
 * @return song list | empty.
 */
router.get('/', (req, res, next) => {
  try {
    Song.find({}).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET single song.
 *
 * @return song details | empty.
 */
router.get('/:id', (req, res, next) => {
  try {
    Song.findOne({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * POST new song.
 *
 * @return song details | empty.
 */
router.post('/', (req, res, next) => {
  if (Array.isArray(req.body)) {
    const promises = [];

    req.body.forEach((item) => {
      if (item.title) {
        const promise = Acounter.findOne({ _id: 'songs' })
          .then((counter) => {
            item.id = counter.seq + 1;

            return Song.create(item)
              .then((data) => {
                return Acounter.findOneAndUpdate({ _id: 'songs' }, { $inc: { seq: 1 } }, { new: true });
              });
          });

        promises.push(promise);
      }
    });

    Promise.all(promises).then(results => {
      res.json('items created successfully');
    }).catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
      next(error);
    });

  } else {
    if (req.body.title) {
      Acounter.findOne({ _id: 'songs' })
        .then((counter) => {
          req.body.id = counter.seq + 1;

          Song.create(req.body)
            .then((data) => {
              Acounter.findOneAndUpdate({ _id: 'songs' }, { $inc: { seq: 1 } }, { new: true }).then();
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
  }
});

/**
 * POST edit song.
 *
 * @return song details | empty.
 */
router.post('/:id', (req, res, next) => {
  let myquery = { _id: ObjectId(req.params.id) };
  if (req.body.title) {
    Song.updateOne(myquery, req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    }).then((data) => res.json(data)).catch(next);
  } else {
    res.json({ error: 'An input field is either empty or invalid', });
  }
});

/**
 * DELETE a song.
 *
 * @return delete result | empty.
 */
router.delete('/:id', (req, res, next) => {
  Song.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
});

module.exports = router;
