export let npcs = []

export class npc {
    constructor(name,dialogue,dialogue2,finisheddia,mesh,karma,teleport,nextmap,onFinish){
        this.name = name
        this.dialogue = dialogue
        this.dialogue2 = dialogue2
        this.finisheddia = finisheddia
        this.mesh = mesh
        this.dialoguecount = -1
        this.karma = karma
        this.teleport = teleport
        this.nextmap = nextmap
        this.onFinish = onFinish

        npcs.push(this)

    }
    
}
export function audiostore(){
    console.log("finishfunc")
    open("../assets/html/audio.html")
}
export function photostore(){
    console.log("finishfunc")
    open("../assets/html/photo.html")
}
export function buildbridge(){
    
}