const express = require("express");
const router = express.Router();

const Acounter = require('../models/acounter');
const Book = require('../models/book');

/**
 * GET book list.
 *
 * @return book list | empty.
 */
router.get('/', (req, res, next) => {
  try {
    Book.find({}).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * GET single book.
 *
 * @return book details | empty.
 */
router.get('/:id', (req, res, next) => {
  try {
    Book.findOne({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * POST new book.
 *
 * @return book details | empty.
 */
router.post('/', (req, res, next) => {
  if (Array.isArray(req.body)) {
    const promises = [];

    req.body.forEach((item) => {
      if (item.title) {
        const promise = Acounter.findOne({ _id: 'books' })
          .then((counter) => {
            item.id = counter.seq + 1;

            return Book.create(item)
              .then((data) => {
                return Acounter.findOneAndUpdate({ _id: 'books' }, { $inc: { seq: 1 } }, { new: true });
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
      Acounter.findOne({ _id: 'books' })
        .then((counter) => {
          req.body.id = counter.seq + 1;

          Book.create(req.body)
            .then((data) => {
              Acounter.findOneAndUpdate({ _id: 'books' }, { $inc: { seq: 1 } }, { new: true }).then();
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
 * POST edit book.
 *
 * @return book details | empty.
 */
router.put('/:id', (req, res, next) => {
  try {
    const update = req.body;
    Book.findOneAndUpdate({ _id: req.params.id }, update, { new: true })
      .then((data) => res.json({
        status: 200,
        data: data,
        message: 'Book updated successfully',
      }))
      .catch(next);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * DELETE a book.
 *
 * @return delete result | empty.
 */
router.delete('/:id', (req, res, next) => {
  Book.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json({
      status: 200,
      message: 'Book deleted successfully',
    }))
    .catch(next);
});

module.exports = router;
