const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// const initRoute = require('./routes/initRoute.js')
const studentRoutes = require('./routes/students');
const attendanceRoutes = require('./routes/attendance.js');
const payrollRoutes = require('./routes/payroll.js');
const coordinatesRoutes = require('./routes/coordinates.js');
const adminRoute = require('./routes/admin.js');
const authRoute = require('./routes/auth.js');
const geofenceRoute = require('./routes/geofence.js');
const supervisorsRoute = require('./routes/supervisors.js');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/AWMS',{useNewUrlParser:true, useUnifiedTopology:true})

const db = mongoose.connection
db.once('open', () => {
  console.log("database connection successfull")
})

const port = 3001;


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/admin', adminRoute)
app.use('/students', studentRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/payroll', payrollRoutes);
app.use('/coordinates', coordinatesRoutes);
app.use('/auth', authRoute);
app.use('/geofence', geofenceRoute);
app.use('/supervisors', supervisorsRoute);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });
  
app.listen(3001, () => {
  console.log(`Backend server running on http://localhost:${3001}`);
});


