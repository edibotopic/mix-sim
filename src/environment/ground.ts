import { Color3, MeshBuilder, StandardMaterial } from "@babylonjs/core";
import { scene } from '../scene'

export function makeGround(): void {
    const ground = MeshBuilder.CreateGround("ground", { width: 5, height: 4 }, scene)
    ground.position.y -= 0.5;

    const floor = new StandardMaterial("floor", scene);
    floor.diffuseColor = new Color3(0.2, 0.8, 0.6);
    floor.alpha = 1.0;
    ground.material = floor;

    ground.doNotSyncBoundingInfo = true;
    ground.freezeWorldMatrix();
}
