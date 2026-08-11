import * as main from '../main'


//#region input
export let moveForward = false,zoom = false,jump = false,use = false,inventory = false, turnLeft = false, turnRight = false, moveBackward = false;
window.addEventListener('keydown', e => {
    if (e.code === 'KeyW') moveForward = true;
    if (e.code === 'KeyS') moveBackward = true;
    if (e.code === 'KeyA') turnLeft = true;
    if (e.code === 'KeyD') turnRight = true;
    if (e.code === 'KeyE') inventory = true;
    if (e.code === 'KeyQ') use = true;
    if (e.code === 'Space') jump = true;
    if (e.code === 'KeyR') zoom = true;
    
});
window.addEventListener('keyup', e => {
    if (e.code === 'KeyW') moveForward = false;
    if (e.code === 'KeyS') moveBackward = false;
    if (e.code === 'KeyA') turnLeft = false;
    if (e.code === 'KeyD') turnRight = false;
    if (e.code === 'KeyE') inventory = false;
    if (e.code === 'KeyQ') use = false;
    if (e.code === 'Space') jump = false;
    if (e.code === 'KeyR') zoom = false;
});
//#endregion
const zoomspeed = 0.5
const maxzoom = 30
export function zoompie(){
    if (zoom){
        if (main.camera.fov > maxzoom){
            main.camera.fov -= zoomspeed    ; 
            main.camera.updateProjectionMatrix();
        }
        
       
    }else{
        if (main.camera.fov < 75){
            main.camera.fov += zoomspeed
            main.camera.updateProjectionMatrix();
        }
    }
}