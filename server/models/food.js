const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   imageUrl: { type: String, required: true },
   mainCourse: { type: String, required: true },
   sides: { type: String, required: true },
   drinks: { type: String, required: true },
   desserts: { type: String, required: true },
   menuUrl: { type: String, required: true}
});

module.exports = mongoose.model('Food', foodSchema);
