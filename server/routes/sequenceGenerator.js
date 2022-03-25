var Sequence = require('../models/sequence');

var maxFoodId;
var maxSitInId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return console.log("An error occurred!");
      }

      sequenceId = sequence._id;
      maxFoodId = sequence.maxFoodId;
      maxSitInId = sequence.maxSitInId;
      maxHomemadeId = sequence.maxHomemadeId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'foods':
        maxFoodId++;
        updateObject = {maxFoodId: maxFoodId};
        console.log('get the maxId');
        nextId = maxFoodId;
        break;
      case 'sitIns':
        maxSitInId++;
        updateObject = {maxSitInId: maxSitInId};
        nextId = maxSitInId;
        break;
      case 'homemades':
        maxHomemadeId++;
        updateObject = {maxHomemadeId: maxHomemadeId};
        nextId = maxHomemadeId;
        break;
      default:
        return -1;
  }

  // Sequence.update({_id: sequenceId}, {$set: updateObject},
  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
