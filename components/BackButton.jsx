"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'

const BackButton = () => {
    const router = useRouter()
  return (
    <Button onClick={() => router.push("/")} className="bg-transparent hover:bg-gray-100 text-blue-600">
        <ChevronLeft /> Back to Home
    </Button>
  )
}

export default BackButton