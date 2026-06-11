import * as meshy from './meshmaker'
import * as main from '../main'
import * as THREE from 'three'

export let clouds = null
//#region 8 hot hells
export function Loadmap1(){
//Sañjīva
//meshy.createPainting([500,500],"./assets/images/blubblub.png",[0,-1,0],[Math.PI / 2,0,0],false)
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
//frontrowhouses
meshy.createBox([10,10,15],[0,0,0],0x444444,[-40,10,30],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-40,10,50],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-40,10,70],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-40,10,10],true)
//backrow houses
meshy.createBox([10,10,15],[0,0,0],0x444444,[-60,10,30],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-60,10,50],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-60,10,70],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[-60,10,10],true)


for (let index = 0; index < 11; index++) {
    meshy.loadModel([1,1,1],'./assets/models/pole.glb',[(- 10 + (index * 2)),0,19],[0,0,0],true).then((model) => {
        main.scene.add(model);
    })
    
}
for (let index = 0; index < 40; index++) {
    meshy.loadModel([1,1,1],'./assets/models/pole.glb',[-11,0,(20 + (index * 2))],[0,0,0],true).then((model) => {
        main.scene.add(model);
    })
    
}


//boats
meshy.createBox([10,10,15],[0,0,0],0x444444,[40,-3,30],true)
meshy.createBox([10,10,15],[0,0.5,0],0x444444,[0,-3,30],true)
meshy.createBox([10,10,15],[0,0,0],0x444444,[40,-3,50],true)
meshy.createBox([10,10,15],[0,0.1,0],0x444444,[40,-3,75],true)
meshy.createBox([10,10,15],[0,-0.3,0],0x444444,[40,-3,95],true)
meshy.loadModel([3,3,3],'./assets/models/ufo.gltf',[-40,35,32],[10,10,10],false).then((model) => {
    main.scene.add(model);
})
meshy.loadModel([3,3,3],'./assets/models/whale.glb',[30,10,135],[10,10,10],false).then((model) => {
    main.scene.add(model);
})

//make videos
meshy.createBoxTexvideo([3, 2, 0.1], './assets/video/vidjo.mp4', [10, 5, 0])
meshy.createBoxTexvideo([3, 2, 0.1], './assets/video/tree.mp4', [13, 5, 0])
meshy.createBoxTexvideo([3, 2, 0.1], './assets/video/starto.mp4', [16, 5, 0])
meshy.createBoxTexvideo([3, 2, 0.1], './assets/video/vidjotje.mp4', [19, 5, 0])
// make images
meshy.createPainting([3.5,5],"./assets/images/new2.png",[0,2,-4.5],[0,0,-0.03],true,false,"hello painting")
meshy.createPainting([3.5,5],"./assets/images/new1.png",[5,2,-4.5],[0,0,-0.03],true,true,"hello painting2")
meshy.createPainting([1,1],"./assets/images/tats.png",[11.5,7,-4.4],[0,0,0.05],true)
meshy.createPainting([2,2],"./assets/images/ultra.png",[9.5,6,-4.4],[0,0,0.05],true)
meshy.createPainting([2,2],"./assets/images/skull.png",[7.5,2,-4.4],[0,0,0.05],true)
meshy.createPainting([2,2],"./assets/images/aliem.png",[9.5,3,-4.4],[0,0,0.05],true)
meshy.createPainting([5,3.5],"./assets/images/pinboard.png",[10,6,-4.5],[0,0,-0.02])
meshy.createPainting([5,3.5],"./assets/images/cityboy.png",[15,6,-4.5],[0,0,0])

//meshy.loadModel([1,1,1],'./assets/models/shelf.gltf',[0,-0.5,-3],[0,Math.PI / 2,0]).then((model) => {main.scene.add(model);})
//meshy.loadModel([0.5,0.5,0.5],'./assets/models/ufo.gltf',[2.5,0,-4],[0,0.5,0]).then((model) => {main.scene.add(model);})
//meshy.loadModel([0.5,0.5,0.5],'./assets/models/cute.gltf',[1.3,0,-4],[0,-1,0]).then((model) => {main.scene.add(model);})
meshy.loadModel([1,1,1],'./assets/models/scooter.gltf',[-1,0,18],[0,0.2,0]).then((model) => {main.scene.add(model);})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[-3,0,15],[0,0.2,0]).then((model) => {main.scene.add(model);})
meshy.loadModel([1,1,1],'./assets/models/cone.glb',[3,0,15],[0,0.2,0]).then((model) => {main.scene.add(model);})



}
export function Loadmap2(){
    //Kālasūtra
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
    //Saṃghāta
}
export function Loadmap4(){
    //Raurava

}
export function Loadmap5(){
    //Mahāraurava

}
export function Loadmap6(){
    //Tapana

}
export function Loadmap7(){
    //Pratāpana

}
export function Loadmap8(){
    //Avīci

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