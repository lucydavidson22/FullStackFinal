const mongoose = require('mongoose');

const sitInSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   imageUrl: { type: String, required: true },
   favoriteItems: { type: String, required: true },
   menuUrl: { type: String, required: true}
});

module.exports = mongoose.model('SitIn', sitInSchema);
