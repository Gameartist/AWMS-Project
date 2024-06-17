// /routes/attendance.js
const express = require('express');
const router = express.Router();
const Attendance = require("../models/Attendance.js");
const {Student} = require("../models/Student.js");

// Log attendance
router.post('/log', async (req, res) => {
  const { studentId, coordinates, totalAttendanceTime} = req.body;
  try {
    // Check if student exists
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if attendance has already been logged for today
    const today = new Date().setHours(0, 0, 0, 0);
    let attendance = await Attendance.findOne({ studentId });

    if (attendance) {
      const lastLoggedDate = new Date(attendance.lastLoggedDate).setHours(0, 0, 0, 0);
      if (lastLoggedDate === today) {
        return res.status(400).json({ error: 'Attendance has already been logged for today' });
      }
    } else {
      attendance = new Attendance({ studentId });
    }

    router.post('/log-weekly', async (req, res) => {
      const { studentId, totalAttendanceTime } = req.body;
    
      try {
        const attendance = await Attendance.findOne({ studentId });
        if (!attendance) return res.status(404).json({ error: 'Attendance not found' });
    
        const currentWeekStartDate = new Date();
        currentWeekStartDate.setHours(0, 0, 0, 0);
        currentWeekStartDate.setDate(currentWeekStartDate.getDate() - currentWeekStartDate.getDay());
    
        let weekRecord = attendance.weeklyAttendance.find(
          (week) => new Date(week.weekStartDate).getTime() === currentWeekStartDate.getTime()
        );
    
        if (!weekRecord) {
          weekRecord = { weekStartDate: currentWeekStartDate, totalAttendanceTime: 0 };
          attendance.weeklyAttendance.push(weekRecord);
        }
    
        weekRecord.totalAttendanceTime += totalAttendanceTime;
        await attendance.save();
    
        res.json({ message: 'Weekly attendance logged successfully', attendance });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
  

// Check if the student is within their registered workplace's geofenced area
router.post('/check-geofence', async (req, res) => {
  const { studentId, latitude, longitude } = req.body;
  const apiKey = 'Your_API_Key';
  const adminKey = 'Your_Admin_Key';
  const projectId = 'Your_Project_Id';

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const workplace = await Workplace.findOne({ name: student.assignedWorkplace });
    if (!workplace) {
      return res.status(404).json({ error: 'Workplace not found' });
    }

    const response = await axios.post(`https://api.tomtom.com/geofencing/1/report/24e9443e-3eaa-4a0a-a0a9-45fa5c6b598f?key=5cHkoIFrAycFcOVEXIwhKfLHCQUrsQdA&adminKey=Dwj1PytrHlULx2IraqeyPMyAjulkOwshthL7Ka2RGBUsefgA`, {
      position: {
        latitude,
        longitude
      }
    });

    const insideGeofence = response.data.inside.some(fence => fence.id === workplace.fenceId);

    res.json({ insideGeofence });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update total attendance time
router.post('/update-attendance', async (req, res) => {
  const { studentId, totalTime } = req.body;

  try {
    const student = await Student.findOneAndUpdate(
      { studentId },
      { totalAttendanceTime: totalTime },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Attendance updated', totalTime: student.totalAttendanceTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

    // Update attendance
    attendance.coordinates = coordinates;
    attendance.totalAttendanceTime = totalAttendanceTime;
    attendance.attendanceLogged = true;
    attendance.lastLoggedDate = new Date();

    await attendance.save();
    res.json({ message: 'Attendance logged successfully', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
