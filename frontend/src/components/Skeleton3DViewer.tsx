import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Joint positions in 3D space (x, y, z)
const jointPositions: [number, number, number][] = [
  [0, 1.7, 0],      // 0: Head
  [0, 1.5, 0],      // 1: Neck
  [0, 1.2, 0],      // 2: Mid-spine
  [-0.25, 1.45, 0],  // 3: Left shoulder
  [-0.5, 1.1, 0.05], // 4: Left elbow
  [-0.65, 0.8, -0.05],// 5: Left wrist
  [0.25, 1.45, 0],   // 6: Right shoulder
  [0.5, 1.1, -0.05], // 7: Right elbow
  [0.65, 0.8, 0.05], // 8: Right wrist
  [0, 0.95, 0],      // 9: Hip center
  [-0.15, 0.9, 0],   // 10: Left hip
  [-0.18, 0.5, 0.02],// 11: Left knee
  [-0.2, 0.08, 0],   // 12: Left ankle
  [0.15, 0.9, 0],    // 13: Right hip
  [0.18, 0.5, -0.02],// 14: Right knee
  [0.2, 0.08, 0],    // 15: Right ankle
];

// Bone connections [from, to]
const bones: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [3, 4], [4, 5],
  [1, 6], [6, 7], [7, 8], [2, 9],
  [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15],
];

const jointConfidence = [0.95, 0.94, 0.92, 0.91, 0.87, 0.79, 0.91, 0.87, 0.79, 0.93, 0.91, 0.85, 0.72, 0.91, 0.85, 0.72];

interface JointProps {
  position: [number, number, number];
  confidence: number;
  showHeatmap: boolean;
}

const Joint = ({ position, confidence, showHeatmap }: JointProps) => {
  const color = useMemo(() => {
    if (showHeatmap) {
      const hue = confidence * 120; // 0=red, 120=green
      return new THREE.Color(`hsl(${hue}, 80%, 55%)`);
    }
    return new THREE.Color("hsl(185, 75%, 55%)");
  }, [confidence, showHeatmap]);

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.035, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
};

interface BoneProps {
  start: [number, number, number];
  end: [number, number, number];
}

const Bone = ({ start, end }: BoneProps) => {
  const { position, quaternion, length } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = s.clone().add(e).multiplyScalar(0.5);
    const dir = e.clone().sub(s);
    const len = dir.length();
    dir.normalize();
    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    return { position: mid.toArray() as [number, number, number], quaternion: quat, length: len };
  }, [start, end]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.012, 0.012, length, 8]} />
      <meshStandardMaterial color="hsl(215, 80%, 55%)" emissive="hsl(215, 80%, 55%)" emissiveIntensity={0.2} transparent opacity={0.85} />
    </mesh>
  );
};

const GridFloor = () => (
  <gridHelper args={[3, 12, "hsl(220, 14%, 20%)", "hsl(220, 14%, 16%)"]} position={[0, 0, 0]} />
);

interface Skeleton3DViewerProps {
  showJoints: boolean;
  showBones: boolean;
  showHeatmap: boolean;
}

const Skeleton3DViewer = ({ showJoints, showBones, showHeatmap }: Skeleton3DViewerProps) => {
  return (
    <div className="w-full h-full">
      <Canvas gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <PerspectiveCamera makeDefault position={[1.5, 1.2, 2]} fov={45} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={5}
          target={[0, 0.9, 0]}
          autoRotate
          autoRotateSpeed={1.2}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={0.8} />
        <pointLight position={[-2, 3, -1]} intensity={0.3} color="hsl(185, 75%, 55%)" />

        {showBones && bones.map(([from, to], i) => (
          <Bone key={i} start={jointPositions[from]} end={jointPositions[to]} />
        ))}

        {showJoints && jointPositions.map((pos, i) => (
          <Joint key={i} position={pos} confidence={jointConfidence[i]} showHeatmap={showHeatmap} />
        ))}

        {/* Head sphere */}
        <mesh position={jointPositions[0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="hsl(185, 75%, 55%)" transparent opacity={0.25} wireframe />
        </mesh>

        <GridFloor />
      </Canvas>
    </div>
  );
};

export default Skeleton3DViewer;
