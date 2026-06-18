import * as meshy from './meshmaker'
import * as main from '../main'
import * as THREE from 'three'
import RAPIER from '@dimforge/rapier3d-compat';
import { world } from './physics.js';

export let clouds = null
export function createMapColliders(meshes) {
    meshes.forEach(mesh => {
        mesh.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const body = world.createRigidBody(
            RAPIER.RigidBodyDesc.fixed().setTranslation(
                center.x,
                center.y,
                center.z
            )
        );

        world.createCollider(
            RAPIER.ColliderDesc.cuboid(
                size.x * 0.5,
                size.y * 0.5,
                size.z * 0.5
            ),
            body
        );
    });
}
export function Loadmap1(){
let floor = meshy.createBoxTex([200,1,200],"./assets/images/aliem.png",[10,-3.5,0])
floor.material.emissiveMap = floor.material.map
floor.material.emissive = new THREE.Color(0x2e6e3d)
floor.material.emissiveIntensity = 0.5

//make map env
meshy.createBox([20,10,100],[0,0,0],0x8c8b81,[-40,0,50],true)
meshy.createBox([20,10,100],[0,0,0],0x8c8b81,[-20,-5,50],true)
meshy.createBox([20,10,100],[0,0,0],0x8c8b81,[20,-5,50],true)
meshy.createBox([20,10,20],[0,0,0],0x8c8b81,[0,-5,10],true)
meshy.loadModel([50,2.5,5],'./assets/models/ramp.glb',[-25  ,0,50],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})
//shrine
meshy.createBox([10,10,100],[0,0,0],0x8c8b81,[10,-5.5,90],true)
meshy.createBox([20,10,20],[0,0,0],0x8c8b81,[10,-5.5,150],true)
meshy.loadModel([2,2,2],'./assets/models/tori.glb',[10,-1,140],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})
//make videos
meshy.createBoxTexvideo([0.2, 2, 3], './assets/video/vidjo.mp4', [10, 1, 60])
meshy.createBoxTexvideo([0.2, 2, 3], './assets/video/tree.mp4', [10, 1, 70])

meshy.createBoxTexvideo([0.2, 2, 3], './assets/video/vidjotje.mp4', [10, 1, 50])
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[20, -0.1, 50],[0,0,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[20,-0.1, 55],[0,0,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[30, -0.1, 50],[0,0.4,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[30, -0.1, 55],[0,0,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/kaiju.glb',[20, -0.1, 55],[0,0,0],true).then((model) => {
    main.scene.add(model);
})

meshy.loadModel([2,2,2],'./assets/models/mountmeruclouds.gltf',[10,-1,140],[0,0,0],false).then((model) => {
        main.scene.add(model); 
        clouds = model;
    })
meshy.loadModel([1,1,1],'./assets/models/car.glb',[15,0.5,90],[0,0.2,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/rock.glb',[10,0,155],[0,-Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})
//frontrowhouses

meshy.loadModel([0.8,0.8,0.8],'./assets/models/recordstore.glb',[-40,5,30],[0,0,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/airco.glb',[-40,20,39],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([0.8,0.8,0.8],'./assets/models/photostore.glb',[-40,5,46],[0,0,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/airco.glb',[-45,10,54],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})

meshy.createBox([10,10,15],[0,0,0],0x888888,[-43,10,70],true)
meshy.createBoxTexvideo([0.2, 2, 3], './assets/video/starto.mp4', [-33,10,70])
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[-32,4.8,70],[0,0.4,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[-32,4.8,65],[0,0,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/airco.glb',[-40,10,78],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})


for (let index = 0; index < 5; index++) {
    meshy.loadModel([1,1,2],'./assets/models/blockade.glb',[(- 15 + (index * 10)),1,1],[0,Math.PI/2,0],true).then((model) => {
        main.scene.add(model);
    })
}
for (let index = 0; index < 5; index++) {
    meshy.loadModel([1,1,1],'./assets/models/pole.glb',[(- 10 + (index * 5)),0,19],[0,0,0],true).then((model) => {
        main.scene.add(model);
    })
    meshy.loadModel([1,1,1],'./assets/models/pole.glb',[11,0,(20 + (index * 5))],[0,0,0],true).then((model) => {
        main.scene.add(model);
    })
}
for (let index = 0; index < 16; index++) {
    meshy.loadModel([1,1,1],'./assets/models/pole.glb',[-11,0,(20 + (index * 5))],[0,0,0],true).then((model) => {
        main.scene.add(model);
    })
}

meshy.loadModel([3,3,3],'./assets/models/ufo.gltf',[-40,35,32],[10,10,10],false).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([3,3,3],'./assets/models/whale.glb',[30,10,135],[10,10,10],true).then((model) => {
    main.scene.add(model);
})

meshy.loadModel([1,1,1],'./assets/models/scooter.gltf',[-1,0,18],[0,0.2,0],true).then((model) => {
    
    main.scene.add(model);})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[-3,0,15],[0,0.2,0]).then((model) => {main.scene.add(model);})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[3,0,15],[0,0.2,0]).then((model) => {main.scene.add(model);})
invisiblewallsmap1()
}
export function Loadmap2(){
    meshy.createPainting([500,500],"./assets/images/blubblub.png",[0,-1,0],[Math.PI / 2,0,0],false)
    meshy.createBoxTex([10,1,10],"./assets/images/wood.png",[10,-1,0])
    meshy.createBoxTex([10,1,10],"./assets/images/wood.png",[0,-1,0])
    meshy.createBoxTex([10,1,10],"./assets/images/wood.png",[10,-1,10])
    meshy.createBoxTex([10,1,10],"./assets/images/wood.png",[0,-1,10])
    meshy.loadModel([5,5,5],'./assets/models/mountmeru.gltf',[0,-0.999,200],[0,0,0],false).then((model) => {main.scene.add(model);})
    meshy.loadModel([5,5,5],'./assets/models/mountmeruclouds.gltf',[0,-0.999,200],[0,0,0],false).then((model) => {
        main.scene.add(model); 
        clouds = model;
    })
}
export function Loadmap3(){

}
export function Loadmap4(){

}
export function Loadmap5(){

}
export function Loadmap6(){

}
export function Loadmap7(){

}
export function Loadmap8(){

}
//#endregion

export function loadthismap(number){
    switch (number){
        case 1:
            Loadmap1()
            break;
        case 2:
            Loadmap2()
            break;
        case 3:
            Loadmap3()
            break;
        case 4:
            Loadmap4()
            break;
        case 5:
            Loadmap5()
            break;
        case 6:
            Loadmap6()
            break;
        case 7:
            Loadmap7()
            break;
        case 8:
            Loadmap8()
            break;
        default:
            console.log("sorry geen map")
    }
}

export function animatemap(){
    if (clouds){
        clouds.rotation.y += 0.001;
    }
}
function invisiblewallsmap1(){

const points = []
points.push( new THREE.Vector3( -50, 0, 0 ) );
points.push( new THREE.Vector3( -50, 10, 0 ) );
points.push( new THREE.Vector3( 30, 10, 0 ) );
points.push( new THREE.Vector3( 30, 0, 0 ) );
meshy.createLine(0xffffff,points)
const points2 = []
points2.push( new THREE.Vector3( 30, 10, 0 ) );
points2.push( new THREE.Vector3( 30, 0, 100 ) );
points2.push( new THREE.Vector3( 30, 0, 0 ) );
points2.push( new THREE.Vector3( 30, 10, 100 ) );
meshy.createLine(0xffffff,points2)
const points3 = []
points3.push( new THREE.Vector3( 30, 0, 100 ) );
points3.push( new THREE.Vector3( 30, 10, 100 ) );
points3.push( new THREE.Vector3( 15, 0, 100 ) );
points3.push( new THREE.Vector3( 15, 10, 100 ) );
meshy.createLine(0xffffff,points3)
const points4 = []
points4.push( new THREE.Vector3( 15, 0, 100 ) );
points4.push( new THREE.Vector3( 15, 10, 100 ) );
points4.push( new THREE.Vector3( 15, 0, 140 ) );
points4.push( new THREE.Vector3( 15, 10, 140 ) );
meshy.createLine(0xffffff,points4)
const points5 = [new THREE.Vector3( 15, 0, 140 ),new THREE.Vector3( 15, 10, 140 ),new THREE.Vector3( 20, 0, 140 ),new THREE.Vector3( 20, 10, 140 )]
meshy.createLine(0xffffff,points5)
const points6 = [new THREE.Vector3( 20, 0, 160 ),new THREE.Vector3( 20, 10, 160 ),new THREE.Vector3( 20, 0, 140 ),new THREE.Vector3( 20, 10, 140 )]
meshy.createLine(0xffffff,points6)
const points7 = [new THREE.Vector3( 20, 0, 160 ),new THREE.Vector3( 20, 10, 160 ),new THREE.Vector3( 0, 0, 160 ),new THREE.Vector3( 0, 10, 160 )]
meshy.createLine(0xffffff,points7)
const points8 = [new THREE.Vector3( 0, 0, 140 ),new THREE.Vector3( 0, 10, 140 ),new THREE.Vector3( 0, 0, 160 ),new THREE.Vector3( 0, 10, 160 )]
meshy.createLine(0xffffff,points8)
const points9 = [new THREE.Vector3( 0, 0, 140 ),new THREE.Vector3( 0, 10, 140 ),new THREE.Vector3( 5, 0, 140 ),new THREE.Vector3( 5, 10, 140 )]
meshy.createLine(0xffffff,points9)
const points10 = [new THREE.Vector3( 5, 0, 40 ),new THREE.Vector3( 5, 10, 40 ),new THREE.Vector3( 5, 0, 140 ),new THREE.Vector3( 5, 10, 140 )]
meshy.createLine(0xffffff,points10)
const points11 = [new THREE.Vector3( 5, 0, 40 ),new THREE.Vector3( 5, 10, 40 ),new THREE.Vector3( 10, 0, 40 ),new THREE.Vector3( 10, 10, 40 )]
meshy.createLine(0xffffff,points11)
const points12 = [new THREE.Vector3( 10, 0, 20 ),new THREE.Vector3( 10, 10, 20 ),new THREE.Vector3( 10, 0, 40 ),new THREE.Vector3( 10, 10, 40 )]
meshy.createLine(0xffffff,points12)
const points13 = [new THREE.Vector3( 10, 0, 20 ),new THREE.Vector3( 10, 10, 20 ),new THREE.Vector3( -10, 0, 20 ),new THREE.Vector3( -10, 10, 20 )]
meshy.createLine(0xffffff,points13)
const points14 = [new THREE.Vector3( -10, 0, 100 ),new THREE.Vector3( -10, 10, 100 ),new THREE.Vector3( -10, 0, 20 ),new THREE.Vector3( -10, 10, 20 )]
meshy.createLine(0xffffff,points14)
const points15 = [new THREE.Vector3( -10, 0, 100 ),new THREE.Vector3( -10, 10, 100 ),new THREE.Vector3( -50, 0, 100 ),new THREE.Vector3( -50, 10, 100 )]
meshy.createLine(0xffffff,points15)
const points16 = [new THREE.Vector3( -50, 0, 0 ),new THREE.Vector3( -50, 10, 0 ),new THREE.Vector3( -50, 0, 100 ),new THREE.Vector3( -50, 10, 100 )]
meshy.createLine(0xffffff,points16)



}