import * as THREE from 'three'
import { vec3 } from 'three/tsl';

export const listener = new THREE.AudioListener();;
//export const sound = new THREE.Audio(listener);
export const audioLoader = new THREE.AudioLoader();


export function loadSound(path, loop=false, volume=1,filtertype="allpass",frequencyval=0,distance=0,rolloff=0){
    
    return new Promise((resolve)=>{

        const sound = new THREE.PositionalAudio(listener);
        
        const filter = listener.context.createBiquadFilter();
        filter.type = filtertype;
        filter.frequency.value = frequencyval;

        audioLoader.load(path,(buffer)=>{

            sound.setBuffer(buffer);
            sound.setLoop(loop);
            sound.setVolume(volume);
            sound.setRefDistance( distance );
            sound.setRolloffFactor(rolloff)
            sound.setFilter(filter);
            resolve(sound);

        });

    }); 
}