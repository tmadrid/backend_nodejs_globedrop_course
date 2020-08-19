const express = require('express')
const OrganizationController = require('../controllers/organization.controller')
const { isAuthenticated } = require('../utils/middleware')
const router = express.Router()

router.use(isAuthenticated)
router.post('/organization', OrganizationController.AddOrganization)
router.get('/organizations', OrganizationController.GetAllOrganizations)
router.get('/organization/:_id', OrganizationController.GetOrganizationById)
router.put('/organization/:org_id', OrganizationController.UpdateOrganization)
router.delete('/organization/:_id', OrganizationController.DeleteOrganization)
router.get('/organization/:organization_id/admins', OrganizationController.GetAdminsByOrganization)

module.exports = router

