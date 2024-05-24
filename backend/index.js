const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;



mongoose.connect('mongodb://localhost:27017',{
  useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
  if(err)
    {
      console.log(err)
    }else{
      console.log("successfully connected")
    }
})

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });
  
  app.listen(3001, () => {
    console.log(`Backend server running on http://localhost:${3001}`);
  });

  const studentRoutes = require('c:/Users/Daniel/Documents/Project Stuff/AWMS Project/backend/routes/students.js');
const attendanceRoutes = require('c:/Users/Daniel/Documents/Project Stuff/AWMS Project/backend/routes/attendance.js');
const payrollRoutes = require('c:/Users/Daniel/Documents/Project Stuff/AWMS Project/backend/routes/payroll.js');
const coordinatesRoutes = require('c:/Users/Daniel/Documents/Project Stuff/AWMS Project/backend/routes/coordinates');

app.use('/students', studentRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/payroll', payrollRoutes);
app.use('/coordinates', coordinatesRoutes);

