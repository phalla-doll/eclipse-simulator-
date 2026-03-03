'use client'

import { UIPanel } from '@/components/UIPanel'
import dynamic from 'next/dynamic'

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <Scene />
      <UIPanel />
    </main>
  )
}
