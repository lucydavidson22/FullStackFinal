const sequenceGenerator = require('./sequenceGenerator');
const SitIn = require('../models/sitIn');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  SitIn.find()
  .then(sitIns => {
    if(!sitIns){
      return res.status(500).json({
        message: "SitIns were not fetched!"
      })
    }
    return res.status(200).json(sitIns);
  });
});

router.post('/', (req, res, next) => {
  const maxSitInId = sequenceGenerator.nextId("sitIns");

  const sitIn = new SitIn({
    id: maxSitInId,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    favoriteItems: req.body.favoriteItems,
    menuUrl: req.body.menuUrl
  });

  sitIn.save()
    .then(createdSitIn => {
      res.status(201).json({
        message: 'SitIn added successfully',
        sitIn: createdSitIn
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
  SitIn.findOne({ id: req.params.id })
    .then(sitIn => {
      sitIn.name = req.body.name;
      sitIn.imageUrl = req.body.imageUrl;
      sitIn.favoriteItems = req.body.favoriteItems;
      sitIn.menuUrl = req.body.menuUrl;

      SitIn.updateOne({ id: req.params.id }, sitIn)
        .then(result => {
          res.status(204).json({
            message: 'SitIn updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'SitIn not found.',
        error: { sitIn: 'SitIn not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  SitIn.findOne({ id: req.params.id })
    .then(sitIn => {
      SitIn.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "SitIn deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'SitIn not found.',
        error: { sitIn: 'SitIn not found'}
      });
    });
});
