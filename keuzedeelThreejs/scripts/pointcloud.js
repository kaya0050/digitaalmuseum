import * as THREE from 'three'
import * as main from '../main.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
let geometry;
let count = 500;

export function createpointcloud(size,area) {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * area;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1;
        positions[i * 3 + 2] = (Math.random() - 0.5) * area;
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: size
    });
    

    const cloud = new THREE.Points(geometry, material);
    main.scene.add(cloud);
}


export function createPointStatue(size) {
    const loader = new GLTFLoader();
    loader.load('assets/models/ufo.gltf', (gltf) => {
        const mesh = gltf.scene.children.find(c => c.isMesh);

        geometry = mesh.geometry
        //get vertices in model
        count = geometry.attributes.position.count;

        const material = new THREE.PointsMaterial({
            size: size,
            color: 0xffffff
        });

        const points = new THREE.Points(geometry, material);
        main.scene.add(points);
    });
}


export function animatepoints(power) {
    if (!geometry) return; // safety check

    const pos = geometry.attributes.position.array;
    const t = performance.now() * 0.001;

    for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] += Math.sin(t + i) * power;
        pos[i * 2 + 1] += Math.sin(t + i) * power;
        pos[i * 1 + 2] += Math.sin(t + i) * power;
    }

    geometry.attributes.position.needsUpdate = true;
}