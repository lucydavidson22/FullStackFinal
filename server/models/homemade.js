const mongoose = require('mongoose');

const homemadeSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   imageUrl: { type: String, required: true },
   sides: { type: String, required: true }
});

module.exports = mongoose.model('Homemade', homemadeSchema);
