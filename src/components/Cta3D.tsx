'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import LazyMount from './LazyMount'

function Ring({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const localT = Math.max(0, (scrollProgress - 0.75) / 0.25)
  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.25
    meshRef.current.rotation.y += delta * 0.18
    meshRef.current.position.y = (1 - localT) * -3
  })
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.4, 0.18, 16, 80]} />
      <meshStandardMaterial color="#EB5E28" emissive="#EB5E28" emissiveIntensity={0.3} roughness={0.6} metalness={0.2} wireframe />
    </mesh>
  )
}

export default function Cta3D() {
  const progress = useScrollProgress()
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
      <LazyMount>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} intensity={1} color="#EB5E28" />
          <Ring scrollProgress={progress} />
        </Canvas>
      </LazyMount>
    </div>
  )
}
