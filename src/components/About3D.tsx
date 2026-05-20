'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import LazyMount from './LazyMount'

function Orb({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const localProgress = Math.max(0, Math.min(1, (scrollProgress - 0.35) / 0.3))
  const visibility = Math.sin(localProgress * Math.PI)
  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.08
    meshRef.current.rotation.z += delta * 0.12
    meshRef.current.scale.setScalar(0.6 + visibility * 0.4)
  })
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <MeshDistortMaterial color="#EB5E28" emissive="#EB5E28" emissiveIntensity={0.18} roughness={0.85} metalness={0.05} distort={0.55} speed={1.1} />
      </mesh>
    </Float>
  )
}

export default function About3D() {
  const progress = useScrollProgress()
  return (
    <div className="absolute top-1/2 right-0 lg:right-10 -translate-y-1/2 w-[360px] h-[360px] pointer-events-none z-0 opacity-70">
      <LazyMount>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1} color="#EB5E28" />
          <Orb scrollProgress={progress} />
        </Canvas>
      </LazyMount>
    </div>
  )
}
