// setup EXPRESS ROUTER
const router = require('express').Router();

// requires API ROUTES (THOUGHT AND USER)
const apiRoutes = require('./api');

// set /api end point for user to insert data for thoughts and users. 
router.use('/api', apiRoutes);

router.use((req, res) => 
{ res.status(404).send('Error 404.. Wrong Route !!') });

//export router
module.exports = router;
