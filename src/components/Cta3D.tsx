'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useMousePosition } from '@/hooks/useMousePosition'
import LazyMount from './LazyMount'

function Ring({ scrollProgress, mouse }: { scrollProgress: number; mouse: { nx: number; ny: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const eased = useRef({ x: 0, y: 0 })
  const localT = Math.max(0, (scrollProgress - 0.7) / 0.3)
  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.35
    meshRef.current.rotation.y += delta * 0.22 + scrollProgress * delta * 0.8
    eased.current.x += (mouse.ny * 0.5 - eased.current.x) * 0.06
    eased.current.y += (mouse.nx * 0.7 - eased.current.y) * 0.06
    meshRef.current.position.x = eased.current.y
    meshRef.current.position.y = (1 - localT) * -3 - eased.current.x * 0.3
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
  const mouse = useMousePosition()
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
      <LazyMount>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} intensity={1} color="#EB5E28" />
          <Ring scrollProgress={progress} mouse={mouse} />
        </Canvas>
      </LazyMount>
    </div>
  )
}
