
const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const adminInteractionController = require('../controllers/adminInteractionController');
const adminManagementController = require('../controllers/adminManagementController');
const adminUserController = require('../controllers/adminUserController');

// Search AI interactions by account number
router.get('/interactions/search-ai', adminAuth, adminInteractionController.searchAIInteractionsByAccount);

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
// Most frequent AI questions (FAQs)
router.get('/interactions/faqs', adminAuth, adminInteractionController.getFrequentAIQuestions);

module.exports = router;
