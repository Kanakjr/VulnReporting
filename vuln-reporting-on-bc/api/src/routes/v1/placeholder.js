'use strict';

const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    placeholder(res);
});
router.get('/v1/', async function(req, res) {
    placeholder(res);
});
async function placeholder(res) {
    res.status(200).send('welcome to federalated learning api'); 
}
module.exports = router;