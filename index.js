require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/test", function(req, res) {
    res.send("running server...");
});


// Routes
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const prescriptionRotes = require('./routes/prescriptionRotes');
const drugRoute = require('./routes/drugRoute');
const adminRoute = require('./routes/adminRoutes');


app.use('/doctor',doctorRoutes );
app.use('/patient',patientRoutes );
app.use('/prescription',prescriptionRotes );
app.use('/drug',drugRoute );
app.use('/admin',adminRoute);

