import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, Heart } from 'lucide-react';

export default function ThreeGiftBox({ onOpen }) {
  const mountRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Dimensions
    const width = currentMount.clientWidth || 320;
    const height = currentMount.clientHeight || 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f5, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(4, 6, 4);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const pinkFillLight = new THREE.PointLight(0xff9eaa, 1.4, 10);
    pinkFillLight.position.set(-3, 2, 2);
    scene.add(pinkFillLight);

    const goldFillLight = new THREE.PointLight(0xffd166, 1.0, 10);
    goldFillLight.position.set(2, -1, 3);
    scene.add(goldFillLight);

    // Gift Box Group
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);

    // Box Materials
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xff9eaa,
      roughness: 0.25,
      metalness: 0.1,
    });

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      roughness: 0.15,
      metalness: 0.35,
    });

    // Box Base
    const baseGeometry = new THREE.BoxGeometry(2, 1.6, 2);
    const boxBase = new THREE.Mesh(baseGeometry, boxMaterial);
    boxBase.castShadow = true;
    boxBase.receiveShadow = true;
    boxGroup.add(boxBase);

    // Vertical Ribbon on Base
    const ribbonVGeo = new THREE.BoxGeometry(0.35, 1.62, 2.02);
    const ribbonV = new THREE.Mesh(ribbonVGeo, ribbonMaterial);
    boxGroup.add(ribbonV);

    const ribbonHGeo = new THREE.BoxGeometry(2.02, 1.62, 0.35);
    const ribbonH = new THREE.Mesh(ribbonHGeo, ribbonMaterial);
    boxGroup.add(ribbonH);

    // Box Lid Group (for opening animation)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.9, 0);
    boxGroup.add(lidGroup);

    const lidGeometry = new THREE.BoxGeometry(2.15, 0.35, 2.15);
    const boxLid = new THREE.Mesh(lidGeometry, boxMaterial);
    boxLid.castShadow = true;
    lidGroup.add(boxLid);

    const lidRibbonV = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.37, 2.16), ribbonMaterial);
    lidGroup.add(lidRibbonV);

    const lidRibbonH = new THREE.Mesh(new THREE.BoxGeometry(2.16, 0.37, 0.36), ribbonMaterial);
    lidGroup.add(lidRibbonH);

    // Cute Bow on Lid
    const bowKnotGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const bowKnot = new THREE.Mesh(bowKnotGeo, ribbonMaterial);
    bowKnot.position.set(0, 0.25, 0);
    lidGroup.add(bowKnot);

    const bowLoopGeo = new THREE.TorusGeometry(0.3, 0.1, 16, 32);
    const bowLeft = new THREE.Mesh(bowLoopGeo, ribbonMaterial);
    bowLeft.rotation.set(Math.PI / 4, 0, Math.PI / 4);
    bowLeft.position.set(-0.25, 0.35, 0);
    lidGroup.add(bowLeft);

    const bowRight = new THREE.Mesh(bowLoopGeo, ribbonMaterial);
    bowRight.rotation.set(-Math.PI / 4, 0, -Math.PI / 4);
    bowRight.position.set(0.25, 0.35, 0);
    lidGroup.add(bowRight);

    // Floating Sparkles around Box
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.2) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 5;

      colors[i] = 1;
      colors[i + 1] = 0.6 + Math.random() * 0.4;
      colors[i + 2] = 0.7 + Math.random() * 0.3;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Tracking Parallax
    let targetRotationX = 0.25;
    let targetRotationY = -0.45;
    let targetLidY = 0.9;
    let targetLidRotation = 0;

    const onMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = -0.45 + x * 0.55;
      targetRotationX = 0.25 - y * 0.35;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Box rotation towards target
      boxGroup.rotation.y += (targetRotationY - boxGroup.rotation.y) * 0.08;
      boxGroup.rotation.x += (targetRotationX - boxGroup.rotation.x) * 0.08;

      // Gentle floating bob
      boxGroup.position.y = Math.sin(elapsedTime * 2) * 0.08;

      // Lid animation when opened
      lidGroup.position.y += (targetLidY - lidGroup.position.y) * 0.1;
      lidGroup.rotation.x += (targetLidRotation - lidGroup.rotation.x) * 0.1;

      // Orbit sparkles
      particles.rotation.y = elapsedTime * 0.2;
      particles.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Trigger lid lift when isOpened changes
    if (isOpened) {
      targetLidY = 2.4;
      targetLidRotation = -0.6;
    }

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpened]);

  const handleOpenGift = () => {
    setIsOpened(true);

    // Celebration Confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9EAA', '#FFD166', '#E8D5FF', '#FFCCD5', '#FFA3B5']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF9EAA', '#FFD166', '#E8D5FF']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF9EAA', '#FFD166', '#E8D5FF']
      });
    }, 250);

    if (onOpen) onOpen();
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        onClick={handleOpenGift}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] cursor-pointer touch-none filter drop-shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95"
        title="Click to unwrap your birthday surprise!"
      />

      {/* Floating Status & Instruction */}
      <div className="mt-2 flex flex-col items-center">
        {!isOpened ? (
          <button
            onClick={handleOpenGift}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-blush-200 text-blush-600 font-heading text-sm font-semibold shadow-clay-btn hover:bg-blush-50 transition-all active:scale-95 cursor-pointer"
          >
            <Gift className="w-4 h-4 text-blush-500 group-hover:rotate-12 transition-transform" />
            <span>Tap to Unwrap Your Gift ✨</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-blush-100 text-blush-600 font-heading text-sm font-medium animate-pulse-soft border border-blush-200">
            <Heart className="w-4 h-4 text-blush-500 fill-blush-500" />
            <span>Surprise Unlocked! Keep Scrolling 💖</span>
          </div>
        )}
        <p className="text-xs text-charcoal/50 mt-1.5 font-body">
          {isOpened ? "Your 3D gift box is open!" : "Interactive 3D • Move cursor to rotate • Click to open"}
        </p>
      </div>
    </div>
  );
}
