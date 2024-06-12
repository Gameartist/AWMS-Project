// /routes/students.js
const express = require('express');
const {Student} = require('../models/Student');
const Workplace = require('../models/Workplace');
const router = express.Router();


// Register student
router.post('/register', async (req, res) => {
  const { name, studentId, workOptions} = req.body;

  console.log(req.body)

  const student = new Student({
    name: name,
    assignedWorkplace: "",
    coordinates: [],
    workOptions: workOptions,
    studentId: studentId
  });

  await student.save();


  res.send(student);
});

// Allocate workplaces (implement allocation logic here)
// Check and assign workplaces
router.post('/assign', async (req, res) => {
  try {
    const { name, studentId, workOptions } = req.body;
  
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
          workOptions: workOptions,
          assignedWorkplace: assignedWorkplace,
          coordinates: workplace.coordinates
        })

        await new_student.save()

      }

      res.status(200).json({ message: 'Workplace assigned', place: assignedWorkplace });
    } else {
      res.status(400).json({ error: 'No available workplaces' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


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
