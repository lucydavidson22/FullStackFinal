const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxFoodId: {type: String, required: true}
});

module.exports = mongoose.model('Sequence', sequenceSchema);
