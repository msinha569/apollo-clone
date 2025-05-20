'use client'

import dynamic from 'next/dynamic'

const DoctorsClientPage = dynamic(() => import('./DoctorsClientPage'), {
  ssr: false,
})

export default function DoctorsClientPageWrapper() {
  return <DoctorsClientPage />
}
