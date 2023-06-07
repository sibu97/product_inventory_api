const usersController=require('../controllers/home_controller')

const express=require('express')

const app=express();

const router = express.Router()



router.get('/',usersController.index)

router.use('/product',require('./poduct'));

router.use
module.exports = router;