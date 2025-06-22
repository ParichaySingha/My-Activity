import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Sphere, Line } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface FloatingElementProps {
  position: [number, number, number];
  children: React.ReactNode;
  speed?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ position, children, speed = 1 }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * speed + position[0]) * 0.3;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {children}
    </group>
  );
};

const GlowingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      // Pulsing glow effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const OrbitalRings = () => {
  const rings = useMemo(() => [
    { radius: 2, color: '#06b6d4', speed: 1 },
    { radius: 2.5, color: '#8b5cf6', speed: -0.8 },
    { radius: 3, color: '#ec4899', speed: 0.6 },
  ], []);

  return (
    <>
      {rings.map((ring, index) => (
        <FloatingRing key={index} {...ring} />
      ))}
    </>
  );
};

const FloatingRing: React.FC<{ radius: number; color: string; speed: number }> = ({ radius, color, speed }) => {
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = time * speed;
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
    }
  });

  return (
    <group ref={ringRef}>
      <mesh>
        <ringGeometry args={[radius, radius + 0.05, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

const ConnectivityLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  const points = useMemo(() => [
    [new THREE.Vector3(-4, 2, -2), new THREE.Vector3(4, -1, 1)] as [THREE.Vector3, THREE.Vector3],
    [new THREE.Vector3(-3, -2, 1), new THREE.Vector3(3, 2, -1)] as [THREE.Vector3, THREE.Vector3],
    [new THREE.Vector3(-2, 1, 2), new THREE.Vector3(2, -2, -2)] as [THREE.Vector3, THREE.Vector3],
    [new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)] as [THREE.Vector3, THREE.Vector3],
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {points.map((pointPair, index) => (
        <Line
          key={index}
          points={pointPair}
          color="#06b6d4"
          lineWidth={2}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
};

const CodeSymbols = () => {
  const symbols = useMemo(() => [
    { position: [-4, 3, -2] as [number, number, number], text: '</>', color: '#00ff88', size: 0.6 },
    { position: [4, 2, -1] as [number, number, number], text: '{}', color: '#ffaa00', size: 0.4 },
    { position: [-3, -2, 1] as [number, number, number], text: '<html>', color: '#ff0088', size: 0.3 },
    { position: [3, -1, 2] as [number, number, number], text: 'fn()', color: '#0088ff', size: 0.4 },
    { position: [-2, 1, -3] as [number, number, number], text: '[]', color: '#ff6600', size: 0.3 },
    { position: [2, -3, 0] as [number, number, number], text: '==>', color: '#00ffaa', size: 0.4 },
  ], []);

  return (
    <>
      {symbols.map((symbol, index) => (
        <FloatingElement key={index} position={symbol.position} speed={0.5 + index * 0.1}>
          <Text
            fontSize={symbol.size}
            color={symbol.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {symbol.text}
          </Text>
        </FloatingElement>
      ))}
    </>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ResponsiveCamera = () => {
  const { camera, size } = useThree();
  
  React.useEffect(() => {
    // Adjust camera position based on screen size
    if (size.width < 768) {
      camera.position.set(0, 0, 8);
    } else if (size.width < 1024) {
      camera.position.set(0, 0, 6);
    } else {
      camera.position.set(0, 0, 5);
    }
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

const Scene3D = () => {
  return (
    <>
      <ResponsiveCamera />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 0]} color="#8b5cf6" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#ec4899" intensity={0.5} />
      
      <GlowingSphere />
      <OrbitalRings />
      <ConnectivityLines />
      <CodeSymbols />
      <ParticleField />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxDistance={12}
        minDistance={3}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

const Hero3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
    });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <Scene3D />
        </Canvas>
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-slate-900/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center z-10 max-w-4xl mx-auto"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
          }}
        >
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Parichay Singha
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Full-Stack Developer & Creative Technologist
          </motion.p>
          
          <motion.div 
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Crafting immersive digital experiences with cutting-edge technology
          </motion.div>
          
          {/* Call to Action */}
          <motion.div
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Performance optimized loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
};

export default Hero3D;
