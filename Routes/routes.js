const express = require('express');
const { signin, login } = require('../Controller/userController');
const verifytokens = require('../middleware/verifytoken');
router = express.Router();
router.post("/login" , login );
router.post('/signin', signin );
router.get('/' , verifytokens);
module.exports = router;