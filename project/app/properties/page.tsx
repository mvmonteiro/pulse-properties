import React from 'react'
// import properties from '@/utils/mocks/properties.json'
import PropertyCard from '@/components/PropertyCard'
import PropertyType from '@/utils/types/PropertyType'

async function fetchProperties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`)

    if (!res.ok)
      throw new Error('Failed to fetch data')

    return await res.json()
  }
  catch (err) {
    console.log(err)
  }
}

const PropertiesPage = async () => {
  const properties = await fetchProperties()

  // sort properties by date
  properties.sort((a: PropertyType, b: PropertyType) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        )
          :
          (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: PropertyType) => (
                <div key={property._id}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

      </div>
    </section>
  )
}

export default PropertiesPage