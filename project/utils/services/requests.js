const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

// fetch all properties
async function fetchProperties() {
    try {
        // handle the case where the domain is not available yet
        if (!apiDomain) {
            return []
        }

        const res = await fetch(`${apiDomain}/properties`, {
            headers: {
                'Cache-Control': 'no-cache',
            }
        })

        if (!res.ok)
            throw new Error('Failed to fetch data')

        return await res.json()
    }
    catch (err) {
        console.log(err)
        return []
    }
}

// fetch single property
async function fetchProperty(id) {
    try {
        // handle the case where the domain is not available yet
        if (!apiDomain) {
            return null
        }

        const res = await fetch(`${apiDomain}/properties/${id}`)

        if (!res.ok)
            throw new Error('Failed to fetch data')

        return await res.json()
    }
    catch (err) {
        console.log(err)
        return null
    }
}

export { fetchProperties, fetchProperty }