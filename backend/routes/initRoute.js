const express = require("express")
const Workplace = require("../models/Workplace")
const router = express.Router()

router.get('/initWorkplaces', async (req, res) => {
    const workList = [{name: 'dsfsadfad', coordinates: [3243, 544454]}, {name: 'fasfasfasf', coordinates: [3243, 544454]}]
    workList.map(async (place) => {
        const new_place = new Workplace({
            name: place.name,
            coordinates: place.coordinates,
            capacity: 0
        })
        await new_place.save()
    })
    res.send('ok')
})


module.exports = router