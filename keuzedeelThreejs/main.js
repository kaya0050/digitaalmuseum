import './scripts/style.css'
import * as THREE from 'three'
import * as meshy from './scripts/meshmaker'
import * as input from './scripts/input'
import * as map from './scripts/map'
import * as npcmaker from './scripts/npc'
import * as audiomanager from './scripts/audiomanager.js'
import * as player from './scripts/player'
import * as pointclouds from './scripts/pointcloud'
//#region vfx en postprocessing
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
//#endregion
import { debug } from 'three/src/nodes/TSL.js'
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Water } from 'three/addons/objects/Water.js';
export let scene = new THREE.Scene()

//#region html references
const btn = document.getElementById('colorBtn')
const text = document.getElementById('textbox')
const naam = document.getElementById('name')
const hud = document.getElementById('hud')
//const karmalvl = document.getElementById('karma')

btn.addEventListener('click', () => {
	meshy.meshy.material.color.set(Math.random() * 0xffffff)
})
//#endregion

const points = []
points.push( new THREE.Vector3( -20, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
meshy.createLine(0xffffff,points)
//pointclouds.createpointcloud(0.1,40)
map.Loadmap1()
//setup skybox
const envMap = await new RGBELoader().loadAsync(
    './assets/envmaps/rustig_koppie_puresky_4k.hdr'
);

envMap.mapping = THREE.EquirectangularReflectionMapping;

scene.environment = envMap;
const height = 15, radius = 200;
const skybox = new GroundedSkybox(envMap, height, radius );
skybox.position.y = 0;
scene.add( skybox );

const waterGeometry = new THREE.PlaneGeometry(1000, 1000);

const water = new Water(
    waterGeometry,
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
            './assets/images/water.jpg',
            texture => {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }
        ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x006a85,
        distortionScale: 0.2,
    }
);

water.rotation.x = -Math.PI / 2;
water.position.y = -1;
scene.add(water);



const textnpc = ["welkom in de wereld van dromen", "kijk gerust wat rond", "mischien vind je iets leuks", "doei"]
const textnpcfinished = ["maak maar een ommetje"]
meshy.loadModel([1, 1, 1], './assets/models/cute.gltf', [2, -0.5, 1], [0, -Math.PI / 2, 0], true).then((model) => {
	scene.add(model);
	const cutiepatootie = new npcmaker.npc("geertruida", textnpc, textnpcfinished, false, model, 3, false, 2);
	model.add(music2)
})


const meshnpc2 = meshy.createBoxTexvideo([1, 1, 1], './assets/video/tree.mp4', [3, 0, 0])
const textnpc2 = ["hoi hoi", "ik ben jackoline", "ik ben een kubus"]
const textnpc2finished = ["ik ben een blok", "..."]
const jackoline = new npcmaker.npc("jackoline", textnpc2, textnpc2finished, false, meshnpc2, -2)

meshy.meshes.forEach(element => {
	scene.add(element)
});


//#region camera and renderer
export const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight
)
const cameraHolder = new THREE.Object3D();
scene.add(cameraHolder);
cameraHolder.add(camera);
camera.position.set(0, 2, 0);

//audio
camera.add(audiomanager.listener);

const music2 = await audiomanager.loadSound('./assets/audio/beachyploinkie.mp3', true, 1,'allpass', 800,3,5)
const music3 = await audiomanager.loadSound('./assets/audio/paradiso.mp3', true, 1,'allpass', 800,3,5)

const speaker = new THREE.Object3D();
speaker.position.set(0, 0, 0);
const speaker2 = new THREE.Object3D();
speaker.position.set(20, 0, 0);

speaker.add(music2)
speaker2.add(music3)
scene.add(speaker)
scene.add(speaker2)

const renderer = new THREE.WebGLRenderer({ antialias: true })
const container = document.getElementById("game-container");
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);
renderer.setSize(container.clientWidth, container.clientHeight);
camera.aspect = container.clientWidth / container.clientHeight;
camera.updateProjectionMatrix();
renderer.setClearColor(0x777777);
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.4;
const resolution = new THREE.Vector2(
	container.clientWidth,
	container.clientHeight
);
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const bokehPass = new BokehPass( scene, camera, {
	focus: 20,
	aperture: 0.0005,
	maxblur: 0.005
} );
composer.addPass( bokehPass );
const filmPass = new FilmPass();
composer.addPass( filmPass );
const sun = new THREE.DirectionalLight(0xffffff, 2);

sun.position.set(50, 100, 50);
sun.target.position.set(0, 0, 0);
scene.add(sun.target);
sun.castShadow = true;
const cam = sun.shadow.camera;
const size = 100;
cam.left = -size;
cam.right = size;
cam.top = size;
cam.bottom = -size;
cam.near = 1;
cam.far = 200;
sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
scene.add(sun);
//scene.add(new THREE.CameraHelper(sun.shadow.camera));
//#endregion


//#region rezisefixer
window.addEventListener("resize", () => {
	renderer.setSize(container.clientWidth, container.clientHeight);
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();
});
//#endregion


//#region raycast
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);
const canvas = renderer.domElement
window.addEventListener('click', (event) => {
	raycaster.setFromCamera(mouse, camera)
	const validNPCs = npcmaker.npcs.filter(n => n.mesh);
	const intersectsnpc = raycaster.intersectObjects(validNPCs.map(n => n.mesh), true);
	if (intersectsnpc.length > 0) {
		const clickedMesh = intersectsnpc[0].object;

		const clickedNPC = npcmaker.npcs.find(n => {
			let found = false;
			n.mesh.traverse(c => {
				if (c === clickedMesh) found = true;
			});
			return found;
		});

		if (clickedNPC) {
			npchandling(clickedNPC, clickedMesh);
		}
	}
})
//#endregion

//#region mouse look 
canvas.addEventListener('click', async () => {
	canvas.requestPointerLock();

	music2.play()
	music3.play()
});

let yaw = 0;   // horizontale rotatie
let pitch = 0; // verticale rotatie

document.addEventListener('mousemove', e => {
	if (document.pointerLockElement === canvas) {
		yaw -= e.movementX * 0.002;
		pitch -= e.movementY * 0.002;
		pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
	}
});
//#endregion

//#region collision
function willCollide(newPosition) {
	const playerBox = new THREE.Box3().setFromObject(meshy.meshy);
	const newBox = playerBox.clone();
	newBox.translate(newPosition.clone().sub(meshy.meshy.position));

	for (const col of meshy.colliders) {
		if (col.mesh === meshy.meshy) continue;

		if (newBox.intersectsBox(col.box)) {
			return true;
		}
	}
	return false;
}
function racastDOF(){
	raycaster.setFromCamera(new THREE.Vector2(0,0), camera);

	const hits = raycaster.intersectObjects(scene.children, true);

	if (hits.length > 0) {
    	bokehPass.uniforms.focus.value = hits[0].distance;
	}
}

//#endregion


//#region renderloop
const clock = new THREE.Clock(true)
const velocity = new THREE.Vector3(0, 0, 0);
const grav = -0.5;
let isGrounded = false;
const jumpresettime = 100;
let jumptimer = 0;
const pushbackforce = 0.0001
let once = false
let onceuse = false
const movespeed = 100;
function animate() {
	requestAnimationFrame(animate);
	jumptimer -= 1;
	input.zoompie()
	map.animatemap()
	const delta = clock.getDelta()
	racastDOF()
	pointclouds.animatepoints(-0.0001)
	water.material.uniforms['time'].value += 0.2 / 60.0;


	composer.setSize(container.clientWidth, container.clientHeight);
	if (input.use && onceuse == false) {
		onceuse = true
	}
	else if (input.use == false && onceuse == true) {
		onceuse = false
	}

	cameraHolder.position.copy(meshy.meshy.position);
	cameraHolder.rotation.y = yaw;
	camera.rotation.x = pitch;

	const move = new THREE.Vector3();
	if (input.moveForward) move.z -= 1;
	if (input.moveBackward) move.z += 1;
	if (input.turnLeft) move.x -= 1;
	if (input.turnRight) move.x += 1;
	if (input.jump && isGrounded && jumptimer < 0) {
		velocity.y += 0.15;
		jumptimer = jumpresettime;
	}

	move.normalize();
	move.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
	move.multiplyScalar(0.1);

	velocity.x = move.x;
	velocity.z = move.z;
	velocity.y += grav * delta;

	const nextY = meshy.meshy.position.clone();
	nextY.y += velocity.y;

	if (!willCollide(nextY)) {
		meshy.meshy.position.y = nextY.y;
		isGrounded = false;
	}
	else {
		if (velocity.y < 0) {
			isGrounded = true;
		}
		velocity.y = 0;
	}

	const nextX = meshy.meshy.position.clone();
	nextX.x += velocity.x;

	if (!willCollide(nextX)) {
		meshy.meshy.position.x += (velocity.x * movespeed) * delta;
	} else {
		//pushback
		meshy.meshy.position.x -= Math.sign(velocity.x) * pushbackforce;
		velocity.x = 0;
	}
	const nextZ = meshy.meshy.position.clone();
	nextZ.z += velocity.z;

	if (!willCollide(nextZ)) {
		meshy.meshy.position.z += (velocity.z * movespeed) * delta;
	} else {
		//pushback
		meshy.meshy.position.z -= Math.sign(velocity.z) * pushbackforce;
		velocity.z = 0;
	}
	composer.render()

}
animate();
//#endregion


function npchandling(npc) {
	npc.mesh.lookAt(meshy.meshy.position)
	npc.mesh.rotateY(-Math.PI / 2)
	npc.dialoguecount += 1
	if (npc.finisheddia === false && npc.dialoguecount < npc.dialogue.length) {
		naam.textContent = npc.name
		text.textContent = npc.dialogue[npc.dialoguecount];
	} else if (npc.finisheddia === true && npc.dialoguecount < npc.dialogue2.length) {
		naam.textContent = npc.name
		text.textContent = npc.dialogue2[npc.dialoguecount];
	} else {
		naam.textContent = ""
		text.textContent = ""
		if (npc.karma) {
			player.playerState.karma += npc.karma
			npc.karma = null
		}
		if (npc.teleport) {
			loadnewmap(npc.nextmap, [0, 500, 0])
		}

		npc.dialoguecount = -1
		npc.finisheddia = true
	}
}

function loadnewmap(nmbr, position) {
	meshy.meshes.forEach(m => scene.remove(m));
	meshy.models.forEach(m => scene.remove(m));
	meshy.colliders.length = 0;
	meshy.meshes.length = 0;
	meshy.models.length = 0;
	npcmaker.npcs.length = 0;

	meshy.meshy.position.x = position[0]
	meshy.meshy.position.y = position[1]
	meshy.meshy.position.z = position[2]
	map.loadthismap(nmbr)
	meshy.meshes.forEach(element => {
		scene.add(element)
	});
}

//#endregion