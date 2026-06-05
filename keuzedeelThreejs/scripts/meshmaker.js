import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const textureLoader = new THREE.TextureLoader();
export const paintings = []
export let meshes = []
export const models = []
export const colliders = []

//create player
const cube = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshStandardMaterial({ color: 0x967f66 })
export const meshy = new THREE.Mesh(cube, material)
meshy.position.y = 3
meshy.castShadow = true
meshes.push(meshy)
export const playercolider = new THREE.Box3().setFromObject(meshy);

const bead = new THREE.SphereGeometry(0.2,16,8)
const beadmaterail = new THREE.MeshStandardMaterial({ color: 0xeb891e ,metalness: 0.9,roughness: 0 })
export const beady = new THREE.Mesh(bead, beadmaterail)
beady.position.y = 2
meshes.push(beady)
//#region mesh creation funcs
export function createLine(color,points = []){
    const material = new THREE.LineBasicMaterial(color);
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    meshes.push(line)
}

export function createBox(size = [1,1,1],rotation = [0,0,0], color = 0xffffff, position = [1,1,1],hascol = true) {
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2])
    const material = new THREE.MeshStandardMaterial({ color: color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position[0], position[1], position[2])
    mesh.rotation.set(rotation[0],rotation[1],rotation[2])
    mesh.castShadow = true
    mesh.receiveShadow = true;
    meshes.push(mesh)
    if (hascol){
        const collider = {
            mesh: mesh,
            box: new THREE.Box3().setFromObject(mesh)
        };
        colliders.push(collider);
    }
    return mesh
}
export function createBoxTex(size = [1,1,1],texture, position = [1,1,1],hascol = true) {
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2])
    const tex = textureLoader.load(texture) 
    const material = new THREE.MeshStandardMaterial({ map: tex, transparent: true,alphaTest: 0.5})
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position[0], position[1], position[2])
    mesh.castShadow = true
    mesh.receiveShadow = true;
    meshes.push(mesh)
    if (hascol){
        const collider = {
            mesh: mesh,
            box: new THREE.Box3().setFromObject(mesh)
        };
        colliders.push(collider);
    }
    return mesh
}
export function createBoxTexvideo(size = [1,1,1],texture,position = [1,1,1],hascol = true) {
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);

    const video = document.createElement("video");
    video.src = texture;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    video.play();

    const Vtexture = new THREE.VideoTexture(video);

    const material = new THREE.MeshStandardMaterial({
        map: Vtexture,
        transparent: true,
        alphaTest: 0.5
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(position[0], position[1], position[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    meshes.push(mesh);

    if (hascol) {
        const collider = {
            mesh: mesh,
            box: new THREE.Box3().setFromObject(mesh)
        };
        colliders.push(collider);
    }

    return mesh;
}
export function createPlane(size = [1,1], color = 0xffffff, position = [1,1,1],hascol = true) {
    const geometry = new THREE.PlaneGeometry(size[0], size[1])
    const material = new THREE.MeshStandardMaterial({ color: color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position[0], position[1], position[2])
    mesh.rotation.x = -Math.PI/2;
    mesh.castShadow = true
    mesh.receiveShadow = true;
    meshes.push(mesh)
    if (hascol){
        const collider = {
            mesh: mesh,
            box: new THREE.Box3().setFromObject(mesh)
        };
        colliders.push(collider);
    }
    return mesh
}   
export function createPainting(size = [1,1],texture, position = [1,1,1],rotation = [0,0,0],addtopaintings = false,hascol = true){
    const geometry = new THREE.PlaneGeometry(size[0], size[1])
    const tex = textureLoader.load(texture) 
    const material = new THREE.MeshStandardMaterial({ map: tex, transparent: true,alphaTest: 0.01 , side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position[0], position[1], position[2])
    mesh.rotation.set(rotation[0],rotation[1],rotation[2])
    mesh.castShadow = true
    
    mesh.receiveShadow = true;
    if (addtopaintings){
        paintings.push(mesh)
    }
    meshes.push(mesh)
    if (hascol){
        const collider = {
            mesh: mesh,
            box: new THREE.Box3().setFromObject(mesh)
        };
        colliders.push(collider);
    }
    return mesh
}
export function loadModel(size = [1,1,1],modelpath,position = [0,0,0],rotation = [0,0,0],hascol = true) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            modelpath,
            (gltf) => {
                const model = gltf.scene;
                model.scale.set(size[0], size[1], size[2]);
                model.position.set(position[0], position[1], position[2]);
                model.rotation.set(rotation[0],rotation[1],rotation[2]);
                model.traverse((c) => { if (c.isMesh) c.receiveShadow = true; c.castShadow = true; });
                resolve(model);
                models.push(model)
                if (hascol){
                    const collider = {
                    mesh: model,
                    box: new THREE.Box3().setFromObject(model)
                    };
                    colliders.push(collider);
                }
                
            },
            undefined,
            (error) => reject(error)
        );
    });
}
//#endregion

