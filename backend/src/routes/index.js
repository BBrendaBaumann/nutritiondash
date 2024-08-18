const { Router } = require('express')
const router = Router()
const recommendationRouter = require('../routes/recommendationRouter')
const usersRouter = require('./usersRouter')

router.use('/recommendations', recommendationRouter)
router.use('/users', usersRouter)

module.exports = router