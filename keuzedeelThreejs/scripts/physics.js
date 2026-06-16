import RAPIER from '@dimforge/rapier3d-compat';
import * as THREE from 'three'
export let world;
export let playerBody;
export const bodies = [];

export async function initPhysics() {
    await RAPIER.init();

    world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
}
export function createTrimeshCollider(model, isStatic = true) {

    model.updateMatrixWorld(true);

    model.traverse((child) => {

        if (!child.isMesh) return;

        const geometry = child.geometry.clone();

        // BELANGRIJK: world transform toepassen
        geometry.applyMatrix4(child.matrixWorld);

        const vertices = new Float32Array(
            geometry.attributes.position.array.slice()
        );

        let indices;

        if (geometry.index) {
            indices = new Uint32Array(
                geometry.index.array.slice()
            );
        } else {
            const count = vertices.length / 3;
            indices = new Uint32Array(count);

            for (let i = 0; i < count; i++) {
                indices[i] = i;
            }
        }

        const body = world.createRigidBody(
            isStatic
                ? RAPIER.RigidBodyDesc.fixed()
                : RAPIER.RigidBodyDesc.dynamic()
        );

        const collider = RAPIER.ColliderDesc.trimesh(
            vertices,
            indices
        );

        world.createCollider(collider, body);

        bodies.push({ mesh: child, body });
    });
}
export function createPlayerBody(position) {

    playerBody = world.createRigidBody(
        RAPIER.RigidBodyDesc.dynamic()
            .lockRotations()
            .setTranslation(position.x, position.y, position.z)
    );

    world.createCollider(
        RAPIER.ColliderDesc.capsule(0.4, 0.8),
        playerBody
    );
}
export function createBoxCollider(mesh, mass = 1, isStatic = false) {
    const scale = mesh.scale;

    const size = new THREE.Box3().setFromObject(mesh).getSize(new THREE.Vector3());

    const rigidBodyDesc = isStatic
        ? RAPIER.RigidBodyDesc.fixed()
        : RAPIER.RigidBodyDesc.dynamic();

    const body = world.createRigidBody(rigidBodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.cuboid(
        size.x * 0.5,
        size.y * 0.5,
        size.z * 0.5
    );

    world.createCollider(colliderDesc, body);

    body.setTranslation(mesh.position.x, mesh.position.y, mesh.position.z);

    bodies.push({ mesh, body });

    return body;
}

export function step() {
    syncBodies()
    world.step();
}
export function syncBodies() {
    for (const { mesh, body } of bodies) {
        const t = body.translation();
        const r = body.rotation();

        mesh.position.set(t.x, t.y, t.z);
        mesh.quaternion.set(r.x, r.y, r.z, r.w);
    }
}