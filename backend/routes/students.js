// /routes/students.js
const express = require('express');
const {Student} = require('../models/Student');
const Workplace = require('../models/Workplace');
const Attendance = require('../models/Attendance');
const axios = require('axios').default;
const router = express.Router();


// Register student
router.post('/register', async (req, res) => {
  const { name, studentId, workOptions, password} = req.body;

  console.log(req.body)

  const student = new Student({
    name: name,
    assignedWorkplace: "",
    coordinates: [],
    workOptions: workOptions,
    studentId: studentId,
    password: password
  
  });

  await student.save();


  res.send(student);
});

// Allocate workplaces (implement allocation logic here)
// Check and assign workplaces
router.post('/assign', async (req, res) => {
  try {
    const { name, password, studentId, workOptions } = req.body;
  
    // Validate input
    // if (!studentId || !Array.isArray(workOptions) || workOptions.length !== 3) {
    //   return res.status(400).json({ error: 'Invalid input. Ensure studentId and workOptions are provided and workOptions is an array of 3 elements.' });
    // }

    // Find the student by ID
    // const student = await Student.findOne({ studentId });
    // if (!student) {
    //   return res.status(404).json({ error: 'Student not found' });
    // }

    // console.log("HERE: ", student)

    // Get all workplaces
    const workplaces = await Workplace.find().exec();

    // Create a dictionary for workplace capacities
    const workplaceCapacity = {};
    workplaces.forEach(workplace => {
      workplaceCapacity[workplace.name] = workplace.capacity;
    });

    // Assign workplace based on provided workOptions
    let assignedWorkplace = null;
    for (const option of workOptions) {
      if (workplaceCapacity[option] > 0) {
        assignedWorkplace = option;
        workplaceCapacity[option] -= 1;
        break;
      }
    }

    // If no preferred option is available, assign a random workplace
    if (!assignedWorkplace) {
      const availableWorkplaces = Object.keys(workplaceCapacity).filter(name => workplaceCapacity[name] > 0);
      if (availableWorkplaces.length > 0) {
        const randomWorkplace = availableWorkplaces[Math.floor(Math.random() * availableWorkplaces.length)];
        assignedWorkplace = randomWorkplace;
        workplaceCapacity[randomWorkplace] -= 1;
      }
    }

    // Update the student record
    if (assignedWorkplace) {
      // student.assignedWorkplace = assignedWorkplace;
      // await student.save();

      const workplace = await Workplace.findOne({ name: assignedWorkplace });
      if (workplace) {
        workplace.capacity -= 1;
        await workplace.save();

        const new_student = await Student.create({
          name: name,
          studentId: studentId,
          password: password,
          workOptions: workOptions,
          assignedWorkplace: assignedWorkplace,
          coordinates: workplace.coordinates,
          fenceId: workplace.fenceId
        })

        await new_student.save()

      }

      res.status(200).json({ message: 'Workplace assigned', place: assignedWorkplace });
    } else {
      res.status(400).json({ error: 'No available workplaces' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});



router.post('/allocate', async (req, res) => {
  // Allocation logic
  res.send('Allocation complete');
});

router.get('/getallworkplaces', async (req, res) => {
  const workplaces = await Workplace.find()
  const valid_places = workplaces.map((place) => {
    if(place.capacity !== 0){
      return place
    }
  })
  res.json({status: 'ok', data: valid_places})
})

module.exports = router;


router.post('/check-attendance', async (req, res) => {
  const { studentId } = req.body;

  try {
    // Check if student exists
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const attendance = await Attendance.findOne({ studentId });

    if (attendance) {
      const lastLoggedDate = new Date(attendance.lastLoggedDate).setHours(0, 0, 0, 0);
      if (lastLoggedDate === today) {
        return res.json({ attendanceLogged: true });
      }
    }
    
    res.json({ attendanceLogged: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check if the student is within their registered workplace's geofenced area
router.post('/check-geofence', async (req, res) => {
  const { studentId, latitude, longitude } = req.body;
  console.log(req.body)
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

    axios.get(`https://api.tomtom.com/geofencing/1/report?point=${latitude},${longitude}&object=006b3560-7fbf-476e-96a0-8aaaa0d76d7c&range=${workplace.radius}&key=5cHkoIFrAycFcOVEXIwhKfLHCQUrsQdA&adminKey=Dwj1PytrHlULx2IraqeyPMyAjulkOwshthL7Ka2RGBUsefgA`)
    .then((response) => {
      console.log("HERE ssdssd:", response.data)
      console.log("HERE", response.data)

      const insideGeofence = !response.data.inside.features.length === 0;

      return res.json({ insideGeofence });
    })
    .catch((err) => {
      console.error(err)
    })
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


// Login route
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body; // Destructure studentId and password from request body

  try {
    // Find student by studentId
    const student = await Student.findOne({ studentId });
    if (!student) {
      // Student not found
      return res.status(404).json({ error: 'Student not found' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      // Password does not match
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send success response with student details
    res.json({
      message: 'Login successful',
      student: {
        name: student.name,
        studentId: student.studentId,
        password: student.password,
        assignedWorkplace: student.assignedWorkplace
      }
    });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
