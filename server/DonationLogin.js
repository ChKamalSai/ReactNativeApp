const express = require("express");
const router = express.Router
const connection = require("./Connection")
router.post('/charity/', (req, res) => {
    const [email, password] = req.body
    connection.query("select * from organisations where email=? and password=?", [email, password], (err, result) => {
        if (err) {
            console.log('charity login error')
            return res.status(500).json({ error: "an error occured" })
        }
        if (result.length === 1) {
            return res.status(200).json({ success: true })
        }
        return res.status(200).json({ success: false })
    })
})
router.post('/supervisor/', (req, res) => {
    const [email, password] = req.body
    connection.query("select * from MessSupervisor where email=? and password=?", [email, password], (err, result) => {
        if (err) {
            console.log('MessSupervisor login error')
            return res.status(500).json({ error: "an error occured" })
        }
        if (result.length === 1) {
            return res.status(200).json({ success: true});
        }
        return res.status(200).json({ success: false})
    })
})
router.post('/student/', (req, res) => {
    const [email, password] = req.body
    connection.query("select * from Student where email=? and password=?", [email, password], (err, result) => {
        if (err) {
            console.log('Student login error')
            return res.status(500).json({ error: "an error occured" })
        }
        if (result.length === 1) {
            return res.status(200).json({ success: true});
        }
        return res.status(200).json({ success: false})
    })
})