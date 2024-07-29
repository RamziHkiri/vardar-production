import { redirect } from 'next/navigation'
import React from 'react'

export default function App() {
  return (
    <div>
      {redirect("/signin")}
    </div>
  )
}
