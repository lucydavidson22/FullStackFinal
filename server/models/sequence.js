const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxFoodId: {type: String, required: true},
  maxSitInId: { type: String, required: true},
  maxHomemadeId: { type: String, required: true}
});

module.exports = mongoose.model('Sequence', sequenceSchema);
