import { Engine, Scene } from "@babylonjs/core";
import { makeCamera } from "./cameras/camera";
import { canvas } from "./canvas";
import { makeLight } from "./environment/light";

export const engine = new Engine(canvas, true);
export const scene = makeScene();

function makeScene(): Scene {
    let scene = new Scene(engine);
    makeCamera(scene);
    makeLight(scene);

    return scene;
}

makeScene();
