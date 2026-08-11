import * as main from '../main'
export var inventory = []

export function addtoinventory(item){
    inventory.push(item)
}
export function swapitems(){
    const tempitem = inventory[0]
    inventory.splice(0,1)
    inventory.push(tempitem)
}
