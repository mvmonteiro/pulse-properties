import connectDB from '@/config/database'
import Property from '@/models/Property'
import {getSessionUser} from '@/utils/session/getSessionUser'
import cloudinary from '@/config/cloudinary'


// GET /api/properties
export const GET = async (request) => {
    try {
        await connectDB()

        const properties = await Property.find({})

        return new Response(JSON.stringify(properties))
    }
    catch (err) {
        return new Response('Deu erro em algo', { status: 500 })
    }
}

// POST /api/properties
export const POST = async (request) => {
    try {
        await connectDB()

        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', {status: 401})
        }

        const {userId} = sessionUser

        const formData = await request.formData()

        // acess all values from amenities and images
        const amenities = formData.getAll('amenities')
        const images = formData.getAll('images').filter((image) => image.name !== '')

        // create propertyData object for database
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        }

        // upload image(s) to Cloudinary
        const imageUploadPromises = []
        for (const image of images) {
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray)

            // convert the image data to base64
            const imageBase64 = imageData.toString('base64')

            // make request to upload to Cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,{
                    folder: 'property-pulse'
                }
            )

            imageUploadPromises.push(result.secure_url)

            // wait for all images top upload
            const uploadImages = await Promise.all(imageUploadPromises)
            // add uploaded images to propertyData object
            propertyData.images = uploadImages
        }

        const newProperty = new Property(propertyData)  // constructor of a model property using the object that we have
        await newProperty.save()                        // save in db

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)

        // return new Response(JSON.stringify({ message: 'Sucess' }), { status: 200 })
    }
    catch (err) {
        return new Response('Failed to add property', { status: 500 })
    }
}