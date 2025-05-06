'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/doctors')
  }, [router])

  return <div>Redirecting To Landing Page...</div>
}

export default Page
