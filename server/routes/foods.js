const sequenceGenerator = require('./sequenceGenerator');
const Food = require('../models/food');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  Food.find()
  .then(foods => {
    if(!foods){
      return res.status(500).json({
        message: "Foods were not fetched!"
      })
    }
    return res.status(200).json(foods);
  });
});

router.post('/', (req, res, next) => {
  const maxFoodId = sequenceGenerator.nextId("foods");

  const food = new Food({
    id: maxFoodId,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    mainCourse: req.body.mainCourse,
    sides: req.body.sides,
    drinks: req.body.drinks,
    desserts: req.body.desserts,
    menuUrl: req.body.menuUrl
  });

  food.save()
    .then(createdFood => {
      res.status(201).json({
        message: 'Food added successfully',
        food: createdFood
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
  Food.findOne({ id: req.params.id })
    .then(food => {
      food.name = req.body.name;
      food.imageUrl = req.body.imageUrl;
      food.mainCourse = req.body.mainCourse;
      food.sides = req.body.sides;
      food.drinks = req.body.drinks;
      food.desserts = req.body.desserts;
      food.menuUrl = req.body.menuUrl;

      Food.updateOne({ id: req.params.id }, food)
        .then(result => {
          res.status(204).json({
            message: 'Food updated successfully'
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
        message: 'Food not found.',
        error: { food: 'Food not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Food.findOne({ id: req.params.id })
    .then(food => {
      Food.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Food deleted successfully"
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
        message: 'Food not found.',
        error: { food: 'Food not found'}
      });
    });
});
