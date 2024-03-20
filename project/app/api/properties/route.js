import connectDB from "@/config/database"

export const GET = async (request) => {
    try {
        await connectDB

        return new Response(JSON.stringify({ message: 'HW' }), { status: 200 })
    }
    catch (err){
        return new Response('Deu erro em algo', { status: 500 })
    }
}