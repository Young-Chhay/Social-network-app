// EXPRESS ROUTER
const router = require('express').Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//set /users for user to test userroutes in Insomnia
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
