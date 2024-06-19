"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const U = ({ params }) => {
    const router = useRouter()
    const { user } = params
    if(!user) router.replace("/")
  return null;
}

export default U