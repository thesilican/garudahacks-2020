const express = require("express");
const mongoose = require("mongoose");
const sha1 = require('sha1');
const HospitalSchema = require('../models/Hospital');
const PersonSchema = require('../models/Person');
const Person = require("../models/Person");
const http = require('http');

const mapKey = "vB1pr57eLEPE16cvLAWLIjx4ULt5sNIG"
const router = express.Router();

//routes
////////////////////////////////////////////////////infection functions
router.get("/heatmap", async (req, res)=>{
    let arr = [];
    let docs = await PersonSchema.find();
    docs.forEach((val)=>{
        arr = arr.concat(val.locations);
    })

    res.json({
        locations: arr
    })
})

router.get("/infections", async (req, res)=>{
    let docs = await PersonSchema.find();

    res.json({
        people: docs
    })
})

router.post("/infections", async(req, res)=>{
    //validate token
    let doc = await HospitalSchema.findOne({token: req.body.token});
    //if invalid token
    if(doc == null){
        res.status(400).json({
            status: "invalid-token"
        })
        return;
    }

    //if token is valid
    const newPerson = new PersonSchema({
        name:{
            first: req.body.name.first,
            last: req.body.name.last
        },

        locations: req.body.locations
    })

    newPerson.save(async (err)=>{
        if(err){
            console.log("Error saving person");
            return;
        }

        const peopleList = await PersonSchema.find();
        res.json({
            status: "ok",
            people:  peopleList
        });
    })
    
})

router.patch('/infections', async(req, res)=>{
    //check for person with matching id
    let doc = await PersonSchema.findById(req.body.id);

    //if invalid id
    if(doc == null){
        res.status(400).json({
            status: "invalid-id"
        })
        return;
    }



    //if valid id, update person
    const update = {
        locations: req.body.locations
    }

    await PersonSchema.findByIdAndUpdate(req.body.id, update);

    //send all people
    let docs = await PersonSchema.find();

    res.json({
        status: "ok",
        people: docs
    })

})

router.delete('/infections', async(req, res)=>{
    //check for person with matching id
    //note: if ID string is wrong length, program will error, so try-catch needed
    let doc = null
    try{
        doc = await PersonSchema.findById(req.body.id, (err, d)=>{
            
        });
    } catch(e){
        res.status(400).json({
            status: "invalid-id"
        })
        return;
    }

    //if invalid id
    if(doc == null){
        res.status(400).json({
            status: "invalid-id"
        })
        return;
    }

    //if valid id
    await PersonSchema.findByIdAndDelete(req.body.id);

    //send all people
    let docs = await PersonSchema.find();

    res.json({
        status: "ok",
        people: docs
    })
})


/////////////////////////////////////////////hospital sign in functions
router.post("/account/signup", async (req, res)=>{

    //check if email already registered
    let doc = await HospitalSchema.findOne({email: req.body.email});
    if(doc != null){
        //email taken
        res.status(400).json({
            status: "email-taken"
        });
        return;
    }
        
    const newHospital = new HospitalSchema({
        email: req.body.email,
        password: req.body.password,

        hospital: {
            name: req.body.hospital.name,
            address: req.body.hospital.address
        },

        token: sha1(req.body.email + " " + req.body.password)
    })

    newHospital.save((err)=>{
        if(err) console.log("Error saving hospital");
        else(res.json({
            token: sha1(req.body.email + " " + req.body.password),
            status: "ok"
        }));

    })
    
})

router.post("/account/login", async (req, res)=>{
    const query = {
        email: req.body.email,
        password: req.body.password
    }

    let doc = await HospitalSchema.findOne(query);
    if(doc == null){
        //no account found
        res.status(400).json({
            status: "incorrect-login"
        })

        return;
    }

    res.json({
        status: "ok",
        token: doc.token,
        hospital: {
            name: doc.hospital.name,
            address: doc.hospital.address
        }
    })
})

/////////////////////////////////////////////////////location data
router.get('/location', (req, res)=>{
    let address = req.query.address;
    let url = "/geocoding/v1/address?key=" + mapKey + "&location=";

    while(address.includes(' '))
    {
        address = address.replace(' ', '+');
    }

    url = url + address;

    console.log(url);

    var str = "";
    http.request({host: "open.mapquestapi.com", path: url}, (resp)=>{
        resp.on('data', (chunk)=>{
            str += chunk;
        })

        resp.on('end', ()=>{
            let data = JSON.parse(str);
            //console.log(data);

            res.json({
                location: {
                    lat: data.results[0].locations[0].latLng.lat,
                    lng: data.results[0].locations[0].latLng.lng,
                }
            })
        })
    }).end();



})

module.exports = router;