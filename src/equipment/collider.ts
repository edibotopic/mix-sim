import {Color3, Mesh, MeshBuilder, PhysicsImpostor, StandardMaterial, Tools, Vector3 } from "@babylonjs/core";
import { scene } from '../scene'

export function makeCollider(): void {
    const colliderCol = new StandardMaterial("colliderCol", scene);
    colliderCol.diffuseColor = new Color3(5.0, 0.0, 0.0)
    colliderCol.alpha=0.00;

    const diagCol = new StandardMaterial("colliderCol", scene);
    diagCol.diffuseColor = new Color3(0.0, 0.0, 5.0)
    diagCol.alpha=0.00;
    
    //straight colliders
    const left = MeshBuilder.CreateBox("mesh", { width: 0.3, height: 1, depth: 1, sideOrientation: Mesh.BACKSIDE}, scene)
    left.position = new Vector3(1.03,0,0)
    const right = left.clone();
    right.position = new Vector3(-1.03,0,0)
    const bottom = MeshBuilder.CreateBox("mesh", { width: 0.3, height: 2, depth: 1, sideOrientation: Mesh.BACKSIDE}, scene)
    bottom.position = new Vector3(0,-0.45,0)
    bottom.rotation.z = Tools.ToRadians(90);
    const top = MeshBuilder.CreateBox("mesh", { width: 0.3, height: 2, depth: 1, sideOrientation: Mesh.BACKSIDE}, scene)
    top.position = new Vector3(0,0.49,0)
    top.rotation.z = Tools.ToRadians(90);
    const back = MeshBuilder.CreateBox("mesh", { width: 0.3, height: 1, depth: 2, sideOrientation: Mesh.BACKSIDE}, scene)
    back.position = new Vector3(0,0,-0.43)
    back.rotation.y = Tools.ToRadians(-90);
    const front = back.clone();
    front.position = new Vector3(0,0,0.43)

    //diagonal colliders
    const frontTop = MeshBuilder.CreateBox("mesh", { width: 0.25, height: 2, depth: 2, sideOrientation: Mesh.BACKSIDE}, scene)
    frontTop.position = new Vector3(0.0,0.38,0.3);
    frontTop.rotation.y = Tools.ToRadians(90);
    frontTop.rotation.z = Tools.ToRadians(-45);

    const backTop = MeshBuilder.CreateBox("mesh", { width: 0.25, height: 2, depth: 2, sideOrientation: Mesh.BACKSIDE}, scene)
    backTop.position = new Vector3(0.0,0.35,-0.3);
    backTop.rotation.y = Tools.ToRadians(90);
    backTop.rotation.z = Tools.ToRadians(45);

    const backBottom = MeshBuilder.CreateBox("mesh", { width: 0.25, height: 2, depth: 2, sideOrientation: Mesh.BACKSIDE}, scene)
    backBottom.position = new Vector3(0.0,-0.5,-0.3);
    backBottom.rotation.y = Tools.ToRadians(90);
    backBottom.rotation.z = Tools.ToRadians(-45);

    const frontBottom = MeshBuilder.CreateBox("mesh", { width: 0.25, height: 2, depth: 2, sideOrientation: Mesh.BACKSIDE}, scene)
    frontBottom.position = new Vector3(0.0,-0.5,0.3);
    frontBottom.rotation.y = Tools.ToRadians(90);
    frontBottom.rotation.z = Tools.ToRadians(45);

    // impostors
    left.physicsImpostor = new PhysicsImpostor(left, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    right.physicsImpostor = new PhysicsImpostor(right, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    bottom.physicsImpostor = new PhysicsImpostor(bottom, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    top.physicsImpostor = new PhysicsImpostor(top, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    back.physicsImpostor = new PhysicsImpostor(back, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    front.physicsImpostor = new PhysicsImpostor(front, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    frontTop.physicsImpostor = new PhysicsImpostor(frontTop, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    backTop.physicsImpostor = new PhysicsImpostor(backTop, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    backBottom.physicsImpostor = new PhysicsImpostor(backBottom, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);
    frontBottom.physicsImpostor = new PhysicsImpostor(frontBottom, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.0 }, scene);

    // materials
    left.material = colliderCol;
    right.material = colliderCol;
    bottom.material = colliderCol;
    top.material = colliderCol;
    back.material = colliderCol;
    front.material = colliderCol;
    frontTop.material = diagCol;
    backTop.material = diagCol;
    backBottom.material = diagCol;
    frontBottom.material = diagCol;

    left.freezeWorldMatrix();
    right.freezeWorldMatrix();
    top.freezeWorldMatrix();
    bottom.freezeWorldMatrix();
    back.freezeWorldMatrix();
    front.freezeWorldMatrix();
    backBottom.freezeWorldMatrix();
    backTop.freezeWorldMatrix();
    frontBottom.freezeWorldMatrix();
    frontTop.freezeWorldMatrix();

}
