import connectDB from '@/config/database'
import Property from '@/models/Property'

// GET /api/properties/search
export const GET = async (request) => {
    try {
        await connectDB()

        // get the params from the request url
        const { searchParams } = new URL(request.url)
        const location = searchParams.get('location')
        const propertyType = searchParams.get('propertyType')

        const locationPattern = new RegExp(location, 'i')

        // match location pattern against database field
        let query = {
            $or: [
                {name: locationPattern},
                {description: locationPattern},
                {'location.street': locationPattern},
                {'location.city': locationPattern},
                {'location.state': locationPattern},
                {'location.zipcode': locationPattern},
            ]
        }

        // only check for property if its not 'All'
        if(propertyType && propertyType !== 'All') {
            const typePattern = new RegExp(propertyType, 'i')
            query.type = typePattern
        }

        const porperties = await Property.find(query)

        return new Response(JSON.stringify(porperties), {status: 200})

    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })

    }
}