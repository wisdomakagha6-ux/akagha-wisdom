'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useMousePosition } from '@/hooks/useMousePosition'
import LazyMount from './LazyMount'

function IcosaShape({ scrollProgress, mouse }: { scrollProgress: number; mouse: { nx: number; ny: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const targetRot = useRef({ x: 0, y: 0 })
  useFrame((_, delta) => {
    if (!meshRef.current) return
    // continuous baseline rotation
    meshRef.current.rotation.x += delta * 0.12
    meshRef.current.rotation.y += delta * 0.18
    // scroll-driven extra spin
    meshRef.current.rotation.z = scrollProgress * Math.PI * 2
    // mouse parallax — eased
    targetRot.current.x += (mouse.ny * 0.6 - targetRot.current.x) * 0.06
    targetRot.current.y += (mouse.nx * 0.8 - targetRot.current.y) * 0.06
    meshRef.current.position.x = targetRot.current.y * 0.5
    meshRef.current.position.y = scrollProgress * 3.5 - targetRot.current.x * 0.4
    meshRef.current.scale.setScalar(Math.max(0.001, 1 - scrollProgress * 0.5))
  })
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial color="#EB5E28" emissive="#EB5E28" emissiveIntensity={0.25} roughness={0.7} metalness={0.1} distort={0.3} speed={1.4} wireframe />
      </mesh>
    </Float>
  )
}

export default function Hero3D() {
  const progress = useScrollProgress()
  const mouse = useMousePosition()
  return (
    <div className="hidden lg:block absolute top-16 right-4 w-[480px] h-[480px] pointer-events-none z-0">
      <LazyMount>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#EB5E28" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} />
          <IcosaShape scrollProgress={progress} mouse={mouse} />
        </Canvas>
      </LazyMount>
    </div>
  )
}
