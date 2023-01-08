import { MeshBuilder } from "@babylonjs/core";
import { SkyMaterial } from "@babylonjs/materials";
import { scene } from "../scene"

export function makeSky() {
    const skyMaterial = new SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;
    skyMaterial.luminance = 0.5;
    skyMaterial.rayleigh = 0.3;
    skyMaterial.azimuth = 0.25;
    const skybox = MeshBuilder.CreateBox("skyBox", { size: 100.0 }, scene);
    skybox.material = skyMaterial;
}
