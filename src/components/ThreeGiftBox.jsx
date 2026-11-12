import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Gift, Heart } from 'lucide-react';

export default function ThreeGiftBox({ onOpen }) {
  const mountRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 320;
    const height = currentMount.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Dynamic Luxury Lighting
    const ambientLight = new THREE.AmbientLight(0xffe4ec, 1.1);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    mainLight.position.set(5, 7, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const roseLight = new THREE.PointLight(0xe8729b, 2.2, 12);
    roseLight.position.set(-3, 2, 3);
    scene.add(roseLight);

    const goldLight = new THREE.PointLight(0xfcd34d, 1.8, 12);
    goldLight.position.set(3, -1, 3);
    scene.add(goldLight);

    // Gift Box Group
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);

    // Luxury Rose Gold Material
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xdf5b87,
      metalness: 0.35,
      roughness: 0.22,
    });

    // Metallic Champagne Gold Ribbon
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      metalness: 0.7,
      roughness: 0.18,
    });

    // Box Base
    const baseGeometry = new THREE.BoxGeometry(2, 1.6, 2);
    const boxBase = new THREE.Mesh(baseGeometry, boxMaterial);
    boxBase.castShadow = true;
    boxBase.receiveShadow = true;
    boxGroup.add(boxBase);

    // Vertical Ribbon on Base
    const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.62, 2.02), ribbonMaterial);
    boxGroup.add(ribbonV);

    const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(2.02, 1.62, 0.32), ribbonMaterial);
    boxGroup.add(ribbonH);

    // Box Lid Group
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.9, 0);
    boxGroup.add(lidGroup);

    const boxLid = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.34, 2.14), boxMaterial);
    boxLid.castShadow = true;
    lidGroup.add(boxLid);

    const lidRibbonV = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.36, 2.16), ribbonMaterial);
    lidGroup.add(lidRibbonV);

    const lidRibbonH = new THREE.Mesh(new THREE.BoxGeometry(2.16, 0.36, 0.33), ribbonMaterial);
    lidGroup.add(lidRibbonH);

    // Sculpted Bow
    const bowKnot = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), ribbonMaterial);
    bowKnot.position.set(0, 0.25, 0);
    lidGroup.add(bowKnot);

    const bowLoopGeo = new THREE.TorusGeometry(0.3, 0.09, 16, 32);
    const bowLeft = new THREE.Mesh(bowLoopGeo, ribbonMaterial);
    bowLeft.rotation.set(Math.PI / 4, 0, Math.PI / 4);
    bowLeft.position.set(-0.24, 0.34, 0);
    lidGroup.add(bowLeft);

    const bowRight = new THREE.Mesh(bowLoopGeo, ribbonMaterial);
    bowRight.rotation.set(-Math.PI / 4, 0, -Math.PI / 4);
    bowRight.position.set(0.24, 0.34, 0);
    lidGroup.add(bowRight);

    // Stardust Sparkles
    const particleCount = 55;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5.5;
      positions[i + 1] = (Math.random() - 0.2) * 4.5;
      positions[i + 2] = (Math.random() - 0.5) * 5.5;

      colors[i] = 1;
      colors[i + 1] = 0.8 + Math.random() * 0.2;
      colors[i + 2] = 0.85 + Math.random() * 0.15;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

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

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      boxGroup.rotation.y += (targetRotationY - boxGroup.rotation.y) * 0.08;
      boxGroup.rotation.x += (targetRotationX - boxGroup.rotation.x) * 0.08;
      boxGroup.position.y = Math.sin(elapsedTime * 2) * 0.09;

      lidGroup.position.y += (targetLidY - lidGroup.position.y) * 0.1;
      lidGroup.rotation.x += (targetLidRotation - lidGroup.rotation.x) * 0.1;

      particles.rotation.y = elapsedTime * 0.22;
      particles.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    if (isOpened) {
      targetLidY = 2.4;
      targetLidRotation = -0.6;
    }

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

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E', '#FEF3C7']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E8729B', '#FCD34D', '#FFFFFF']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E8729B', '#FCD34D', '#FFFFFF']
      });
    }, 250);

    if (onOpen) onOpen();
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div 
        ref={mountRef} 
        onClick={handleOpenGift}
        className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] cursor-pointer touch-none filter drop-shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95"
        title="Click to unwrap your birthday surprise"
      />

      <div className="mt-2 flex flex-col items-center">
        {!isOpened ? (
          <button
            onClick={handleOpenGift}
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full luxury-button text-white font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-glow-rose transition-all cursor-pointer"
          >
            <Gift className="w-4 h-4 text-cosmic-champagne group-hover:rotate-12 transition-transform" />
            <span>Unwrap Your Birthday Gift</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-5 py-2 rounded-full glass-pill text-cosmic-champagne font-sans text-xs sm:text-sm font-medium border border-white/20">
            <Heart className="w-4 h-4 text-cosmic-blush fill-cosmic-blush" />
            <span>Surprise Unwrapped • Scroll Down</span>
          </div>
        )}
        <p className="text-[11px] text-white/60 mt-2 font-sans tracking-wide">
          {isOpened ? "Your 3D gift is open" : "Interactive 3D • Move cursor to rotate • Tap to open"}
        </p>
      </div>
    </div>
  );
}
