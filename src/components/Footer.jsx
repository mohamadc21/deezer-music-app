import { Link } from "@mui/material"
import React from 'react'

const Footer = () => {
  return (
    <footer className="py-12 flex items-center justify-center mt-auto">
      <p>Coded by <Link href="https://github.com/mohamadc21" target="_blank" className="text-sky-500">Mohamad</Link></p>
    </footer>
  )
}

export default Footer