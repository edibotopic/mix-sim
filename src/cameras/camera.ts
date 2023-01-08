import { ArcRotateCamera, FreeCamera, Scene, Vector3, Viewport, Nullable, Camera } from "@babylonjs/core";
import { canvas } from "../canvas";
import { engine } from "../scene";

export function makeCamera(scene: Scene): Nullable<Camera[]> {
    scene.activeCameras = []

    const cameraMain: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2.5, Math.PI / 4, 5.0, Vector3.Zero(), scene);
    cameraMain.attachControl(canvas, true);
    cameraMain.checkCollisions = true;
    cameraMain.collisionRadius = new Vector3(0.5, 0.5, 0.5);
    cameraMain.angularSensibilityX = 2000;
    cameraMain.angularSensibilityY = 2000;
    cameraMain.wheelPrecision = 1000;
    cameraMain.panningSensibility = 4000;
    cameraMain.lowerBetaLimit = 0.3
    cameraMain.upperBetaLimit = 1.5
    cameraMain.lowerRadiusLimit = 2
    cameraMain.upperRadiusLimit = 8

    let cameraInset = new FreeCamera("Inset", new Vector3(0, 2, 0), scene);
    cameraInset.setTarget(Vector3.Zero());
    let aspectRatio = engine.getAspectRatio(cameraMain);
    let insetW = (aspectRatio < 1) ? 0.34 : 0.34 * (1 / aspectRatio);
    let insetH = (aspectRatio < 1) ? 0.2 * aspectRatio : 0.2;
    let insetY = 1.01 - insetH;
    cameraInset.id = 'Inset'

    cameraMain.viewport = new Viewport(0, 0, 1, 1);
    cameraInset.viewport = new Viewport(0, insetY, insetW, insetH);

    scene.activeCameras.push(cameraMain);
    scene.activeCameras.push(cameraInset);

    return scene.activeCameras;
}
