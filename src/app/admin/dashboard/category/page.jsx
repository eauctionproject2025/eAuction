import React from 'react'
import CategoryManager from '@/components/CategoryManager'

function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <CategoryManager />
    </div>
  )
}

export default page