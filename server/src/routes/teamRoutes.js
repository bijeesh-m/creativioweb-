const express = require('express');
const router = express.Router();
const {
    getTeamMembers,
    getTeamMembersAdmin,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
} = require('../controllers/teamController');
const { protect } = require('../middleware/auth');
const { getUploader, setUploadFolder } = require('../middleware/upload');

const upload = getUploader();

// Public routes
router.get('/', getTeamMembers);

// Admin routes
router.get('/admin/all', protect, getTeamMembersAdmin);
router.post(
    '/admin',
    protect,
    setUploadFolder('team'),
    upload.single('image'),
    createTeamMember
);
router.put(
    '/admin/:id',
    protect,
    setUploadFolder('team'),
    upload.single('image'),
    updateTeamMember
);
router.delete('/admin/:id', protect, deleteTeamMember);

module.exports = router;
