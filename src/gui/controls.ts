import GUI from 'lil-gui'

export const gui = new GUI({title: "Adjust Mixing Speed"});
gui.domElement.style.width = "300px";
gui.domElement.style.right = "0px";

export let options: any = {}

export function guiAdd(property: string, value: number | string) {
    options[property] = value;
    return options;
}
