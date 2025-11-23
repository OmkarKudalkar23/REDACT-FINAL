import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const TaurusModel = ({ isSignUp = false }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const taurusRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load ATM Machine GLB model
    const loader = new GLTFLoader();
    let atmModel = null;

    loader.load(
      "/src/components/3D/atm_machine_model.glb",
      (gltf) => {
        atmModel = gltf.scene;
        
        // Scale the model smaller
        atmModel.scale.set(0.6, 0.6, 0.6);
        
        // Center the model
        const box = new THREE.Box3().setFromObject(atmModel);
        const center = box.getCenter(new THREE.Vector3());
        atmModel.position.sub(center);
        
        scene.add(atmModel);
        taurusRef.current = atmModel;
      },
      (progress) => {
        console.log("Loading model:", (progress.loaded / progress.total) * 100 + "%");
      },
      (error) => {
        console.error("Error loading model:", error);
        // Fallback: create a simple box if model fails to load
        const fallbackGeometry = new THREE.BoxGeometry(1, 2, 0.5);
        const fallbackMaterial = new THREE.MeshPhongMaterial({ color: 0x5542ff });
        const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
        scene.add(fallbackMesh);
        taurusRef.current = fallbackMesh;
      }
    );

    // HDRI-Style Lighting Setup
    // Soft ambient light (simulating HDRI)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key light (main directional light from top-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(15, 15, 15);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.far = 50;
    scene.add(keyLight);

    // Fill light (soft light from left)
    const fillLight = new THREE.DirectionalLight(0xb8d4ff, 0.8);
    fillLight.position.set(-15, 5, 10);
    scene.add(fillLight);

    // Back light (rim light for separation)
    const backLight = new THREE.DirectionalLight(0x5542ff, 0.9);
    backLight.position.set(0, 10, -15);
    scene.add(backLight);

    // Top light (sky light simulation)
    const topLight = new THREE.PointLight(0xc9d9ff, 1.2);
    topLight.position.set(0, 20, 0);
    scene.add(topLight);

    // Bottom light (ground reflection simulation)
    const bottomLight = new THREE.PointLight(0x7c3aed, 0.7);
    bottomLight.position.set(0, -10, 0);
    scene.add(bottomLight);

    // Front accent light (blue)
    const frontLight = new THREE.PointLight(0x5542ff, 1);
    frontLight.position.set(12, 8, 12);
    scene.add(frontLight);

    // Left accent light (violet)
    const leftLight = new THREE.PointLight(0x7c3aed, 0.9);
    leftLight.position.set(-12, 5, 8);
    scene.add(leftLight);

    // Right accent light (cool white)
    const rightLight = new THREE.PointLight(0xd4e4ff, 0.8);
    rightLight.position.set(12, 5, -8);
    scene.add(rightLight);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 1.5;
    controls.maxDistance = 8;

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Constant rotation for ATM model
      if (taurusRef.current) {
        taurusRef.current.rotation.y += 0.005;
      }

      // Update controls
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Dispose of all geometries and materials in the scene
      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: "500px" }}
    />
  );
};

export default TaurusModel;
