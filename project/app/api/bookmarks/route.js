import connectDB from '@/config/database'
import Property from '@/models/Property'
import User from '@/models/User'
import { getSessionUser } from '@/utils/session/getSessionUser'

export const dynamic = 'force-dynamic'

// POST - /api/bookmarks - send an property to bookmarks array or removing it if its already there
export const POST = async (request) => {
    try {
        await connectDB()

        const { propertyId } = await request.json()

        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 })
        }

        const { userId } = sessionUser

        // find user in database
        const user = await User.findOne({ _id: userId })

        // check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)

        let message

        if (isBookmarked) {
            // if already bookmarked, remove it
            user.bookmarks.pull(propertyId)
            message = 'Bookmark removed successfully'
            isBookmarked = false
        }
        else {
            // if not bookmarked, add it
            user.bookmarks.push(propertyId)
            message = 'Bookmark added successfully'
            isBookmarked = true
        }

        await user.save()

        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })
    }
}