import {
    CSG,
    Scene,
    MeshBuilder,
    Mesh,
    Vector3,
    StandardMaterial,
    Color3,
    Tools,
    PhysicsImpostor
} from '@babylonjs/core'

export function makeChamber (ID: number, OD: number, length: number, scene: Scene) {
    const restitution = 5.0;

    // Create outer wall with a Cylinder
    const mOuter = MeshBuilder.CreateCylinder(
        "mOuter",
        {
        diameter: OD-0.1,
        height: length,
        },
        scene,
    );
    // Create inner wall with a Tube
    const mInner = MeshBuilder.CreateTube(
        "mInner",
        {
        path: [new Vector3(0, -length / 2, 0), new Vector3(0, length / 2, 0)],
        radius: ID / 2,
        sideOrientation: Mesh.DOUBLESIDE,
        cap: Mesh.CAP_END
        },
        scene,
    );
    // Add some caps
    const capL = MeshBuilder.CreateCylinder(
        "mL",
        {
        diameter: OD,
        height: length / 10,
        },
        scene,
    );
    capL.position = new Vector3(1.0,0,0);
    capL.rotation.z = Tools.ToRadians(90);
    capL.bakeCurrentTransformIntoVertices();
    capL.physicsImpostor = new PhysicsImpostor(capL, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: restitution }, scene);

    const capR = MeshBuilder.CreateCylinder(
        "mL",
        {
        diameter: OD,
        height: length / 10,
        },
        scene,
    );
    capR.position = new Vector3(-1.0,0,0);
    capR.rotation.z = Tools.ToRadians(90);
    capR.bakeCurrentTransformIntoVertices();
    capR.physicsImpostor = new PhysicsImpostor(capR, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: restitution }, scene);

    // Create a cutter for the opening
    const mCutter = MeshBuilder.CreateBox(
        "cutter",
        {
        height: OD*0.5,
        width: length, 
        },
        scene
    )
    mCutter.position = new Vector3(1.2,0.0,0.0); /* NOTE: 1.2 for cut and 2.5 for closed */
    // Create a CSG from each mesh
    const outerCSG = CSG.FromMesh(mOuter);
    const innerCSG = CSG.FromMesh(mInner);
    const cutterCSG = CSG.FromMesh(mCutter);
    // Subtract inner tube from outer cylinder
    const pipeCSG = outerCSG.subtract(innerCSG);
    // Cut opening from pipe
    const chamberCSG = pipeCSG.subtract(cutterCSG);
    // Create a mesh from the final CSG
    const chamber = chamberCSG.toMesh("mChamber", null, scene);
    // Dispose of component meshes
    mInner.dispose();
    mOuter.dispose();
    mCutter.dispose();
    scene.removeMesh(mInner);
    scene.removeMesh(mOuter);
    scene.removeMesh(mCutter);

    chamber.position = new Vector3(0,0,0);
    chamber.rotation.z = Tools.ToRadians(90);
    chamber.bakeCurrentTransformIntoVertices();
    chamber.physicsImpostor = new PhysicsImpostor(chamber, PhysicsImpostor.MeshImpostor, { mass: 0, restitution: restitution }, scene);

    // Give chamber some transparency
    const mat = new StandardMaterial("clearChamber", scene);
    mat.diffuseColor = new Color3(0.5, 0.6, 0.9)
    mat.emissiveColor = new Color3(0.1, 0.1, 0.2)
    mat.alpha = 0.6
    chamber.material = mat

    chamber.freezeWorldMatrix();

    // Return the chamber mesh
    return chamber;
}
