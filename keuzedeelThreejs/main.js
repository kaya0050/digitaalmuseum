import './scripts/style.css'
import * as THREE from 'three'
import * as meshy from './scripts/meshmaker'
import * as input from './scripts/input'
import * as map from './scripts/map'
import * as npcmaker from './scripts/npc'
import * as audiomanager from './scripts/audiomanager.js'
import * as player from './scripts/player'
import * as pointclouds from './scripts/pointcloud'
import * as physics from './scripts/physics.js';
//#region vfx en postprocessing
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
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

//#region walls
const points = []
points.push( new THREE.Vector3( -30, 0, 0 ) );
points.push( new THREE.Vector3( -30, 10, 0 ) );
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
const points5 = [
	new THREE.Vector3( 15, 0, 140 ),
	new THREE.Vector3( 15, 10, 140 ),
	new THREE.Vector3( 20, 0, 140 ),
	new THREE.Vector3( 20, 10, 140 )
]
meshy.createLine(0xffffff,points5)
const points6 = [
	new THREE.Vector3( 20, 0, 160 ),
	new THREE.Vector3( 20, 10, 160 ),
	new THREE.Vector3( 20, 0, 140 ),
	new THREE.Vector3( 20, 10, 140 )
]
meshy.createLine(0xffffff,points6)
const points7 = [
	new THREE.Vector3( 20, 0, 160 ),
	new THREE.Vector3( 20, 10, 160 ),
	new THREE.Vector3( 0, 0, 160 ),
	new THREE.Vector3( 0, 10, 160 )
]
meshy.createLine(0xffffff,points7)
const points8 = [
	new THREE.Vector3( 0, 0, 140 ),
	new THREE.Vector3( 0, 10, 140 ),
	new THREE.Vector3( 0, 0, 160 ),
	new THREE.Vector3( 0, 10, 160 )
]
meshy.createLine(0xffffff,points8)
const points9 = [
	new THREE.Vector3( 0, 0, 140 ),
	new THREE.Vector3( 0, 10, 140 ),
	new THREE.Vector3( 5, 0, 140 ),
	new THREE.Vector3( 5, 10, 140 )
]
meshy.createLine(0xffffff,points9)
const points10 = [
	new THREE.Vector3( 5, 0, 40 ),
	new THREE.Vector3( 5, 10, 40 ),
	new THREE.Vector3( 5, 0, 140 ),
	new THREE.Vector3( 5, 10, 140 )
]
meshy.createLine(0xffffff,points10)


//#endregion

await physics.initPhysics();



map.Loadmap1();
map.createMapColliders(meshy.meshes);

physics.createPlayerBody(meshy.meshy.position);
physics.playerBody.setTranslation(
	{
    	x: 10,
    	y: 10,
    	z: 130
	},
	true
);
//setup skybox
const envMap = await new RGBELoader().loadAsync(
    './assets/envmaps/rustig_koppie_puresky_4k.hdr'
);

envMap.mapping = THREE.EquirectangularReflectionMapping;

scene.environment = envMap;
const height = 15, radius = 500;
const skybox = new GroundedSkybox(envMap, height, radius );
scene.environmentIntensity = 0.5;
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

const textnpc = ["welkom in mijn winkel", "kijk gerust wat rond", "mischien vind je iets leuks"]
const textnpcfinished = ["luister eens naar mijn mixtape"]
meshy.loadModel([1, 1,1], './assets/models/fakemetaljacket.glb', [-40,5,30], [0, 0, 0], true).then((model) => {
	scene.add(model);
	const papaya = new npcmaker.npc("papaya", textnpc, textnpcfinished, false, model, 3, false, 2,npcmaker.finishtest);
	model.add(music2)
})
const textnpc2 = ["goedenavond", "lekker weertje he"]
const textnpcfinished2 = ["echt even genieten"]

meshy.loadModel([1, 1, 1], './assets/models/cute.gltf', [28, 0, 95], [0, 0, 0], true).then((model) => {
	scene.add(model);
	const cutiepatootie = new npcmaker.npc("geertruida", textnpc2, textnpcfinished2, false, model, 3, false, 2);
	model.add(music3)
})
const textnpc3 = ["hallo brudha", "heb je een sjekkie voor mij", "nee?"]
const textnpcfinished3 = ["wil je echte kemeel blouw sjek kopen?"]
meshy.loadModel([1, 1, 1], './assets/models/tabakslak.glb', [10, -0.5, 150], [0, 0, 0], true).then((model) => {
	scene.add(model);
	const cutiepatootie = new npcmaker.npc("tabakslak", textnpc3, textnpcfinished3, false, model, 3, false, 2);
	model.add(music3)
})

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

const music2 = await audiomanager.loadSound('./assets/audio/paradiso.mp3', true, 1,'allpass', 800,3,5)
const music3 = await audiomanager.loadSound('./assets/audio/rainydayrainallday.mp3', true, 1,'allpass', 800,3,5)

const speaker = new THREE.Object3D();
speaker.position.set(0, 0, 0);
const speaker2 = new THREE.Object3D();
speaker2.position.set(-40,5,30);

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
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = 0.3;
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

const size = 130;
cam.left = -size;
cam.right = size;
cam.top = size;
cam.bottom = -size;
cam.near = 1;
cam.far = 200;
sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
scene.add(sun);
const hemi = new THREE.HemisphereLight(
	0xffd9b8,
    0xffd9b8,
    3
);
const ShadowTintShader = {
  uniforms: {
    tDiffuse: { value: null },
    tintColor: { value: new THREE.Color(0x0033ff) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec3 tintColor;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);

      float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));

      // dark areas = shadows
      float shadowFactor = smoothstep(0.3, 0.7, 1.0 - luminance);

      color.rgb = mix(color.rgb, tintColor, shadowFactor * 0.3);

      gl_FragColor = color;
    }
  `
};
const shadowPass = new ShaderPass(ShadowTintShader);
composer.addPass(shadowPass);
scene.add(hemi);

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

function racastDOF(){
	raycaster.setFromCamera(new THREE.Vector2(0,0), camera);

	const hits = raycaster.intersectObjects(scene.children, true);

	if (hits.length > 0) {
    	bokehPass.uniforms.focus.value = hits[0].distance;
	}
}



//#region renderloop
const clock = new THREE.Clock(true)
const jumpresettime = 100;
let jumptimer = 0;
const pushbackforce = 0.0001
let once = false
let onceuse = false
const movespeed = 150;
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

move.normalize();
move.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

const speed = 20;

const vel = physics.playerBody.linvel();

const targetVel = {
    x: move.x * speed,
    y: vel.y,
    z: move.z * speed
};

physics.playerBody.setLinvel(
{
    x: THREE.MathUtils.lerp(vel.x, targetVel.x, 0.2),
    y: vel.y,
    z: THREE.MathUtils.lerp(vel.z, targetVel.z, 0.2)
},
true
);

// jump
if (input.jump) {
    physics.playerBody.setLinvel(
        { x: vel.x, y: 6, z: vel.z },
        true
    );
}
// step physics
physics.step();
const t = physics.playerBody.translation();
meshy.meshy.position.set(t.x, t.y, t.z);
composer.render()

}
animate();
//#endregion

function npchandling(npc) {
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
		if (npc.teleport) {
			loadnewmap(npc.nextmap, [0, 500, 0])
		}

		if (npc.onFinish) {
			npc.onFinish(npc);
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