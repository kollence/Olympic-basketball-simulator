import React from 'react'

export default function Card({children}) {
  return (
    <div
    className="group-card bg-gray-300 text-cyan-900 rounded-lg p-4 shadow-md"
  >
    {children}
  </div>
  )
}
