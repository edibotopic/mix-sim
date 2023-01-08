import {
    Scene,
    Vector3,
    HemisphericLight
} from '@babylonjs/core'

export function makeLight(scene: Scene): HemisphericLight {
    const light = new HemisphericLight("light_main", new Vector3(1, 1, 0), scene);
    return light;
}
