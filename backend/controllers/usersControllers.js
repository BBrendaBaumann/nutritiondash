const asyncHandler = require("express-async-handler");
const path = require('path')
const fs = require('fs').promises

const getUsers = asyncHandler(async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/users.json');
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const authenticateUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;
        const filePath = path.join(__dirname, '../data/users.json');
        const data = await fs.readFile(filePath, 'utf8')
        const users = JSON.parse(data);

        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username and/or password' });
        }

        req.session.user = {
            username: user.username,
            recommendationId: user.recommendationId
        };

        res.json({
            message: 'Logged in!',
            recommendationId: user.recommendationId
        });        
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('connect.sid'); 
        res.json({ message: 'Logged out successfully' });
    });
});


const checkSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
};

module.exports = {
    getUsers,
    authenticateUser,
    logoutUser,
    checkSession
}