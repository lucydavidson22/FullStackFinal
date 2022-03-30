const sequenceGenerator = require('./sequenceGenerator');
const Homemade = require('../models/homemade');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  Homemade.find()
  .then(homemades => {
    if(!homemades){
      return res.status(500).json({
        message: "Homemade Mealss were not fetched!"
      })
    }
    return res.status(200).json(homemades);
  });
});

router.post('/', (req, res, next) => {
  const maxHomemadeId = sequenceGenerator.nextId("homemades");

  const homemade = new Homemade({
    id: maxHomemadeId,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    sides: req.body.sides
  });

  homemade.save()
    .then(createdHomemade => {
      res.status(201).json({
        message: 'Homemade added successfully',
        homemade: createdHomemade
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
  Homemade.findOne({ id: req.params.id })
    .then(homemade => {
      homemade.name = req.body.name;
      homemade.imageUrl = req.body.imageUrl;
      homemade.sides = req.body.sides;

      Homemade.updateOne({ id: req.params.id }, homemade)
        .then(result => {
          res.status(204).json({
            message: 'Homemade updated successfully'
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
        message: 'Homemade not found.',
        error: { homemade: 'Homemade not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Homemade.findOne({ id: req.params.id })
    .then(homemade => {
      Homemade.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Homemade deleted successfully"
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
        message: 'Homemade not found.',
        error: { homemade: 'Homemade not found'}
      });
    });
});
