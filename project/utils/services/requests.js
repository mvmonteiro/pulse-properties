const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

async function fetchProperties() {
    try {
        // handle the case where the domain is not available yet
        if (!apiDomain) {
            return []
        }

        const res = await fetch(`${apiDomain}/properties`)

        if (!res.ok)
            throw new Error('Failed to fetch data')

        return await res.json()
    }
    catch (err) {
        console.log(err)
        return []
    }
}

export { fetchProperties }