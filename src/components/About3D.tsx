'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useMousePosition } from '@/hooks/useMousePosition'
import LazyMount from './LazyMount'

function Orb({ scrollProgress, mouse }: { scrollProgress: number; mouse: { nx: number; ny: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const eased = useRef({ x: 0, y: 0 })
  const localProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.5))
  const visibility = Math.sin(localProgress * Math.PI)
  useFrame((_, delta) => {
    if (!meshRef.current) return
    // base spin from scroll
    meshRef.current.rotation.y += delta * 0.25 + scrollProgress * delta * 1.2
    meshRef.current.rotation.x += delta * 0.1
    // mouse rotates the sphere in 4 directions
    eased.current.x += (mouse.ny * 1.2 - eased.current.x) * 0.05
    eased.current.y += (mouse.nx * 1.2 - eased.current.y) * 0.05
    meshRef.current.rotation.x = eased.current.x + scrollProgress * 2
    meshRef.current.rotation.z = -eased.current.y * 0.5
    meshRef.current.scale.setScalar(Math.max(0.001, 0.6 + visibility * 0.5))
  })
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <MeshDistortMaterial color="#EB5E28" emissive="#EB5E28" emissiveIntensity={0.22} roughness={0.7} metalness={0.15} distort={0.6} speed={1.2} />
      </mesh>
    </Float>
  )
}

export default function About3D() {
  const progress = useScrollProgress()
  const mouse = useMousePosition()
  return (
    <div className="absolute top-1/2 right-0 lg:right-10 -translate-y-1/2 w-[360px] h-[360px] pointer-events-none z-0 opacity-80">
      <LazyMount>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1} color="#EB5E28" />
          <pointLight position={[-3, -2, 4]} intensity={0.4} color="#ffffff" />
          <Orb scrollProgress={progress} mouse={mouse} />
        </Canvas>
      </LazyMount>
    </div>
  )
}
