export let npcs = []

export class npc {
    constructor(name,dialogue,dialogue2,finisheddia,mesh,karma,teleport,nextmap){
        this.name = name
        this.dialogue = dialogue
        this.dialogue2 = dialogue2
        this.finisheddia = finisheddia
        this.mesh = mesh
        this.dialoguecount = -1
        this.karma = karma
        this.teleport = teleport
        this.nextmap = nextmap
        npcs.push(this)
    }
    
}
