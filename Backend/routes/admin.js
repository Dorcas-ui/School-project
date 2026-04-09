const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const adminInteractionController = require('../controllers/adminInteractionController');
const adminManagementController = require('../controllers/adminManagementController');
const adminUserController = require('../controllers/adminUserController');

// User CRUD (admin)
router.get('/users', adminAuth, adminUserController.getAllUsers);
router.post('/users', adminAuth, adminUserController.createUser);
router.put('/users/:id', adminAuth, adminUserController.updateUser);
router.delete('/users/:id', adminAuth, adminUserController.deleteUser);

// Admin CRUD
router.get('/admins', adminAuth, adminManagementController.getAllAdmins);
router.post('/admins', adminAuth, adminManagementController.createAdmin);
router.put('/admins/:id', adminAuth, adminManagementController.updateAdmin);
router.delete('/admins/:id', adminAuth, adminManagementController.deleteAdmin);

// Interaction logs
router.get('/interactions', adminAuth, adminInteractionController.getAllInteractions);
router.get('/interactions/user/:userId', adminAuth, adminInteractionController.getInteractionsByUser);
router.get('/interactions/unresolved', adminAuth, adminInteractionController.getUnresolvedInteractions);

module.exports = router;
