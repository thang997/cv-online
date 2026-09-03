"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import type { Mesh } from "three";

function SpinningBox() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.4;
    ref.current.rotation.y += delta * 0.6;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color="#4f8cff" metalness={0.3} roughness={0.25} />
    </mesh>
  );
}

export default function Scene() {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-sm font-medium">Không khởi tạo được WebGL</p>
        <p className="max-w-sm text-xs opacity-60">{error}</p>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [3, 2, 4], fov: 50 }}
      dpr={[1, 2]}
      // Nền trong suốt để thấy màu body phía dưới thay vì canvas trắng.
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setError(
            "Trình duyệt đã mất WebGL context. Thường do tắt hardware " +
              "acceleration hoặc GPU quá tải — kiểm tra chrome://gpu.",
          );
        });
      }}
      fallback={
        <div className="flex h-full items-center justify-center text-sm opacity-60">
          Trình duyệt không hỗ trợ WebGL.
        </div>
      }
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <SpinningBox />
      {/* Environment tải HDR từ CDN ngoài — bọc Suspense riêng để nếu mạng
          lỗi thì chỉ mất phản chiếu, không sập cả scene. */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableDamping makeDefault />
    </Canvas>
  );
}
