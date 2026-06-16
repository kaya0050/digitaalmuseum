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
meshy.createBox([20,10,100],[0,0,1],0x8c8b81,[-31.1,-6.11,50],true)
//shrine
meshy.createBox([10,10,100],[0,0,0],0x8c8b81,[10,-5.5,90],true)
meshy.createBox([20,10,20],[0,0,0],0x8c8b81,[10,-5.5,150],true)
//make videos
meshy.createBoxTexvideo([0.2, 2, 3], './assets/video/vidjo.mp4', [15, 1, 150])
meshy.createBoxTexvideo([0.2, 2, 3], './assets/video/tree.mp4', [15, 1, 154])
meshy.createBoxTexvideo([0.2, 2, 3], './assets/video/starto.mp4', [15, 1, 158])
meshy.createBoxTexvideo([0.2, 2, 3], './assets/video/vidjotje.mp4', [15, 1, 146])
meshy.loadModel([2,2,2],'./assets/models/tori.glb',[10,-1,140],[0,Math.PI/2,0],false).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([2,2,2],'./assets/models/mountmeruclouds.gltf',[10,-1,140],[0,0,0],false).then((model) => {
        main.scene.add(model); 
        clouds = model;
    })
meshy.loadModel([1,1,1],'./assets/models/car.glb',[15,0.5,90],[0,0.2,0],true).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([1,1,1],'./assets/models/busstop.glb',[10,-0.5,150],[0,-Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})
//frontrowhouses
meshy.createBox([10,10,15],[0,0,0],0x888888,[-40,10,30],true)
meshy.loadModel([1,1,1],'./assets/models/airco.glb',[-40,10,38],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})

meshy.createBox([10,10,15],[0,0,0],0x888888,[-40,10,50],true)
meshy.loadModel([1,1,1],'./assets/models/airco.glb',[-40,10,58],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})

meshy.createBox([10,10,15],[0,0,0],0x888888,[-40,10,70],true)
meshy.loadModel([1,1,1],'./assets/models/airco.glb',[-40,10,78],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})

meshy.createBox([10,10,15],[0,0,0],0x888888,[-40,10,10],true)
meshy.loadModel([1,1,1],'./assets/models/airco.glb',[-40,10,18],[0,Math.PI/2,0],true).then((model) => {
    main.scene.add(model);
})

//backrow houses
meshy.createBox([10,10,15],[0,0,0],0x444444,[-60,10,30],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-60,10,50],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-60,10,70],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-60,10,10],true)

/*for (let index = 0; index < 5; index++) {
    meshy.loadModel([1,1,2],'./assets/models/blockade.glb',[(- 20 + (index * 10)),0,1],[0,Math.PI/2,0],true).then((model) => {
        main.scene.add(model);
    })
}*/
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
rocks()

//boats
meshy.createBox([10,10,15],[0,0,0],0x444444,[40,-3,30],true)
//meshy.createBox([10,10,15],[0,0.5,0],0x444444,[0,-3,30],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[40,-3,50],true)
meshy.createBox([10,10,15],[0,0.1,0],0x444444,[40,-3,75],true)
meshy.createBox([10,10,15],[0,-0.3,0],0x444444,[40,-3,95],true)
meshy.loadModel([3,3,3],'./assets/models/ufo.gltf',[-40,35,32],[10,10,10],false).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([3,3,3],'./assets/models/whale.glb',[30,10,135],[10,10,10],true).then((model) => {
    main.scene.add(model);
})

// make images
meshy.createPainting([3.5,5],"./assets/images/new2.png",[5, 3, 145],[0,Math.PI/2,-0.03],true,false,"hello painting")
meshy.createPainting([3.5,5],"./assets/images/new1.png",[5, 3, 150],[0,Math.PI/2,-0.03],true,true,"hello painting2")
meshy.createPainting([1,1],"./assets/images/tats.png",[5, 3, 153],[0,Math.PI/2,0.05],true)
meshy.createPainting([2,2],"./assets/images/ultra.png",[5, 3, 159],[0,Math.PI/2,0.05],true)
meshy.createPainting([2,2],"./assets/images/skull.png",[5, 3, 156],[0,0,0.03],true)
meshy.createPainting([2,2],"./assets/images/aliem.png",[13, 3, 156],[0,0,-0.01],true)
meshy.createPainting([5,3.5],"./assets/images/cityboy.png",[9, 3, 156],[0,0,0.02])

meshy.loadModel([1,1,1],'./assets/models/scooter.gltf',[-1,0,18],[0,0.2,0],true).then((model) => {
    
    main.scene.add(model);})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[-3,0,15],[0,0.2,0]).then((model) => {main.scene.add(model);})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[3,0,15],[0,0.2,0]).then((model) => {main.scene.add(model);})

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

function rocks(){
    meshy.loadModel([3,3,3],'./assets/models/rock.glb',[35,0,10],[10,10,10],true).then((model) => {
        main.scene.add(model);
    })
    meshy.loadModel([3,2.5,3],'./assets/models/rock.glb',[34,2,5],[10,3,1],true).then((model) => {
        main.scene.add(model);
    })
    meshy.loadModel([3,3,2.5],'./assets/models/rock.glb',[35,0,0],[5,3,1],true).then((model) => {
        main.scene.add(model);
    })
    meshy.loadModel([3,3,3],'./assets/models/rock.glb',[36,0,15],[10,10,10],true).then((model) => {
        main.scene.add(model);
    })
    meshy.loadModel([3,2.5,3],'./assets/models/rock.glb',[34,2,20],[10,3,1],true).then((model) => {
        main.scene.add(model);
    })
    meshy.loadModel([3,3,2.5],'./assets/models/rock.glb',[35,1,25],[5,3,1],true).then((model) => {
        main.scene.add(model);
    })
}