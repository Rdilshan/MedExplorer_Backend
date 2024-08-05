const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
  }, { collection: 'Medicine_details' }); 
  const Drug = mongoose.model('Drug', drugSchema);
  
  module.exports = Drug;