const express = require("express")
const Workplace = require("../models/Workplace")
const router = express.Router()
router.get('/initWorkplaces'), async (req, res) =>
     {
        const new_place = new Workplace({
            name: "",
           coordinates: [],
            capacity: "",

        });
        await new_place.save;
        res.send(new_place);
     }