import connectDB from '@/config/database'
import Property from '@/models/Property'

// GET /api/properties
export const GET = async (request) => {
    try {
        await connectDB()

        const properties = await Property.find({})

        return new Response(JSON.stringify(properties))
    }
    catch (err){
        return new Response('Deu erro em algo', { status: 500 })
    }
}