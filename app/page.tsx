import React from "react"
import Image from 'next/image'
import Link from "next/link"

const getAllItems = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall")
  const jsonResponse = await response.json()
  // console.log(jsonResponse)
  const allItems = jsonResponse.allItems
  return allItems
}

const ReadAllItems = async () => {
  const allItems = await getAllItems()
  // console.log(allItems)
  return (
    <main>
      <div>
        {allItems.map(item =>
          <Link href={`/item/readsingle/${item._id}`} key={item._id}>
            <Image src={item.image} alt="{item.title}" width={750} height={500} />
            <h2>{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </Link>
        )}
      </div>
    </main>
  )
}

export default ReadAllItems
