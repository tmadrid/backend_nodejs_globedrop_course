const OrganizationService = require('../services/organization.service')

const AddOrganization = async (req, res) => {
    try {
        const {
            org_name,
            org_description,
            country,
            city,
            picture,
            admins
        } = req.body

        const existing_organization = await OrganizationService.FindOne({
            org_name
        })

        if(existing_organization){
            return  res.status(409).json({
                message: 'Data exists'
            })
        }

        const new_organization = await  OrganizationService.Create({
            org_name,
            org_description,
            country,
            city,
            picture,
            admins
        })

        return res.status(200).json({
            message: 'New organization inserted',
            data: new_organization,
        })

    }catch (e) {
        console.log('error: ', e)
    }
}

const GetAllOrganizations = async (req, res) => {
    try {
        const organizations = await OrganizationService.Find()
        return res.status(200).json({
            message: 'All organizations',
            data: organizations,
        })
    }catch (e) {
        console.log('error: ', e)
    }
}

const GetOrganizationById = async (req, res) => {
    try {
        const {_id} = req.params
        const organization = await OrganizationService.FindOne({
            _id
        })

        if (!organization){
            return res.status(404).json({
                message: 'Organization does not exist'
            })
        }

        return res.status(200).json(
            {
                message: 'Organization fetched',
                data: organization,
            }
        )
    }catch (e) {
        console.log('error: ', e)
    }
}

const UpdateOrganization = async (req, res) => {
    try {
        const { org_id } = req.params
        const {
            org_name,
            org_description,
            country,
            city,
            picture,
            admins
        } = req.body

        const organization = await OrganizationService.FindOne({
            _id: org_id
        })

        if (!organization){
            return res.status(404).json({
                message: 'Organization does not exist'
            })
        }

        const updated_organization = await OrganizationService.FindOneAndUpdate(
            {_id: org_id},
            {
                org_name,
                org_description,
                country,
                city,
                picture,
                admins
            }
        )

        return res.status(200).json(
            {
                message: 'Organization updated',
                data: updated_organization,
            }
        )

    }catch (e) {
        console.log('error: ', e)
    }
}

const DeleteOrganization = async (req, res) => {
    try {
        const {_id} = req.params

        const organization = await OrganizationService.FindOne({
            _id
        })

        if (!organization){
            return res.status(404).json({
                message: 'Organization does not exist'
            })
        }

        await OrganizationService.DeleteOne({
            _id
        })
        return res.status(200).json(
            {
                message: 'Organization deleted',
            }
        )
    }catch (e) {
        console.log('error: ', e)
    }
}

const GetAdminsByOrganization = async (req, res) => {
    const { organization_id } = req.params
    try {
        const admins = await OrganizationService.FIndOneAndPopulate(
            {_id: organization_id},
            "admins"
        )
        return res.status(200).json(
            {
                message: 'Admins fetched',
                data: admins
            }
        )
    }catch (e) {
        console.log('error: ', e)
    }
}

module.exports = {
    AddOrganization,
    GetAllOrganizations,
    GetOrganizationById,
    UpdateOrganization,
    DeleteOrganization,
    GetAdminsByOrganization
}
