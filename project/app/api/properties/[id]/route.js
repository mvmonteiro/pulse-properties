import connectDB from '@/config/database'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/session/getSessionUser.js'

// GET /api/properties/:id
export const GET = async (request, { params }) => {
    try {
        await connectDB()

        const property = await Property.findById(params.id)

        if (!property)
            return new Response('Property Not Found', { status: 404 })

        return new Response(JSON.stringify(property), { status: 200 })
    }
    catch (err) {
        return new Response('Something went wrong in the request', { status: 500 })
    }
}

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
    try {
        const propertyId = params.id

        const sessionUser = await getSessionUser()
        // check for session
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required.', { status: 401 })
        }
        // userId from the session
        const { userId } = sessionUser

        await connectDB()

        const property = await Property.findById(propertyId)

        if (!property)
            return new Response('Property Not Found', { status: 404 })

        // verify ownership (if the session user matches the property owner in DB)
        if (property.owner.toString() !== userId)
            return new Response('Unauthorized', { status: 401 })

        // delete the property
        await property.deleteOne()

        return new Response('Property Deleted', { status: 200 })
    }
    catch (err) {
        return new Response('Something went wrong in the request', { status: 500 })
    }
}