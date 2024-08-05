const Drug = require('../models/drug');

exports.getdrug = async (req, res) => {
    try {
        const drug = await Drug.findOne({ name: req.params.name });
        if (!drug) {
          return res.status(404).send('Drug not found');
        }
        res.json(drug);
      } catch (err) {
        res.status(500).send(err.message);
      }
  };
