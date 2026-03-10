const express = require('express');
const router = express.Router();
const {
    getClients,
    getClientsAdmin,
    createClient,
    updateClient,
    deleteClient,
} = require('../controllers/clientController');
const { protect } = require('../middleware/auth');
const { getUploader, setUploadFolder } = require('../middleware/upload');

const upload = getUploader();

// Public routes
router.get('/', getClients);

// Admin routes
router.get('/admin/all', protect, getClientsAdmin);
router.post(
    '/admin',
    protect,
    setUploadFolder('clients'),
    upload.single('logo'),
    createClient
);
router.put(
    '/admin/:id',
    protect,
    setUploadFolder('clients'),
    upload.single('logo'),
    updateClient
);
router.delete('/admin/:id', protect, deleteClient);

module.exports = router;
