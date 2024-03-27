const express = require("express");
const router= express.Router
const DonationLogin=require("./DonationLogin")
const DonorRegistrations=require("./DonorRegistrations")
router.post('/login',DonationLogin)
router.post('/register',)