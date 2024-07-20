const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.js')

router.get('/:userId/new', (req, res) => {
    res.render('menu-items/new.ejs', { userId: req.params.userId })
})

router.get('/:userId/:itemId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const itemId = new mongoose.Types.ObjectId(req.params.itemId); 
        const currentItem = currentUser.menuItems.find(item => {
            return item._id.equals(itemId); 
        });
        res.render('menu-items/edit.ejs', {
            currentItem,
            userId: req.params.userId
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:userId/full-menu', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const fullMenu = currentUser.menuItems;
        res.render('menu-items/full-menu.ejs', {
           fullMenu,
           user: currentUser
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
            pizzas,
            user: currentUser
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:userId/pastas', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const fullMenu = currentUser.menuItems;
        const pastas = fullMenu.filter(item => {
            return item.category === 'Pasta'
        })
        res.render('menu-items/pastas.ejs', {
            pastas,
            user: currentUser
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:userId/desserts', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const fullMenu = currentUser.menuItems;
        const desserts = fullMenu.filter(item => {
            return item.category === 'Dessert'
        })
        res.render('menu-items/desserts.ejs', {
            desserts,
            user: currentUser
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

router.put('/:userId/:itemId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const currentItem = currentUser.menuItems.id(req.params.itemId)
        currentItem.set(req.body)
        await currentUser.save();
        res.redirect(`/menuitems/${req.params.userId}/full-menu`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/:userId/:itemId/delete', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        currentUser.menuItems.id(req.params.itemId).deleteOne();
        await currentUser.save();
        res.redirect(`/menuitems/${req.params.userId}/full-menu`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router; 