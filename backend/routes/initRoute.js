const express = require("express")
const Workplace = require("../models/Workplace")
const router = express.Router()

router.post('/initWorkplaces', async (req, res) => {
    const workList = [{name: 'dsfsadfad', radius: 60, coordinates: [3243, 544454], capacity: 5, fenceId:'45hj6u' } , {name: 'fasfasfasf', radius: 40, coordinates: [3243, 544454], capacity: 7, fenceId:'hjd42d'}]
    workList.map(async (place) => {
        const new_place = new Workplace({
            name: place.name,
            radius: 0,
            coordinates: place.coordinates,
            capacity: 0,
            fenceId: place.fenceId
        })
        await new_place.save()
    })
    res.send('ok')
})


module.exports = router