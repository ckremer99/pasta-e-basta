const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/:userId/new', async (req, res) => {

    res.render('menu-items/new', { userId: req.params.userId })
})

router.get('/:userId/full-menu', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const fullMenu = currentUser.menuItems;
        res.render('menu-items/full-menu.ejs', {
           fullMenu
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:userId/pizzas', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const fullMenu = currentUser.menuItems;
        const pizzas = fullMenu.filter(item => {
            return item.category === 'Pizza'
        })
        res.render('menu-items/pizzas.ejs', {
            pizzas
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/:userId/new', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        currentUser.menuItems.push(req.body);
        currentUser.save()
        res.redirect('/')
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router; 