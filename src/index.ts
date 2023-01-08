import { AmmoJSPlugin, Vector3 } from "@babylonjs/core";
/* import "@babylonjs/inspector" */
import { scene, engine } from "./scene";
import Ammo from "ammojs-typed";
import { makeGround } from "./environment/ground";
import { makeBall1 } from "./particles/ballInstances";
import { makeChamber } from "./equipment/chamber";
import { makePaddles } from "./equipment/paddles";
import { makeSky } from "./environment/sky";
import { makeCollider } from "./equipment/collider";
import { makeMotor } from "./equipment/motor";
import { makeStand } from "./equipment/stand";

export async function main(): Promise<void> {
    // physics
    const ammo = await new (Ammo as any);
    const physics: AmmoJSPlugin = new AmmoJSPlugin(true, ammo);
    scene.enablePhysics(new Vector3(0, -2.2, 0), physics); //low gravity for smoother tumbling
    physics.setTimeStep((1 / 60) * scene.getAnimationRatio())

    // optimisations
    scene.freezeMaterials();
    scene.freezeActiveMeshes();
    scene.skipPointerMovePicking = true;
    scene.skipPointerUpPicking = true;
    scene.skipPointerDownPicking = true;
    scene.autoClear = false;
    scene.autoClearDepthAndStencil = false;
    /* scene.useRightHandedSystem = false; */
    scene.blockMaterialDirtyMechanism = true;

    // environment
    makeSky();
    makeGround();
    makeMotor(0.5, 0.1, scene);
    makeStand(scene);

    // mixer
    makeChamber(0.7, 0.9, 2, scene);
    makeCollider();
    makePaddles(0.1, 0.25, 0.55, scene);

    // particles
    makeBall1();

    /* scene.debugLayer.show(); */

    // render loop
    engine.runRenderLoop(() => { scene.render() })

    // adaptive window
    window.addEventListener('resize', () => engine.resize())
};

main();
