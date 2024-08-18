const { Router } = require('express')
const { getUsers, authenticateUser, logoutUser, checkSession } = require('../../controllers/usersControllers')
const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.post('/login', authenticateUser)
usersRouter.post('/logout', logoutUser)
usersRouter.get('/protected-route', checkSession, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = usersRouter