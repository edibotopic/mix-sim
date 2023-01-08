import {
    CSG,
    Tools,
    Scene,
    MeshBuilder,
    Mesh,
    Vector3,
    Color3,
    StandardMaterial,
    PhysicsImpostor,
    HingeJoint
} from '@babylonjs/core'
import { gui, options, guiAdd } from '../gui/controls'

export function makePaddles(diameter: number, length: number, span: number, scene: Scene): void {
    // Create shaft with a Tube to form a hole
    const shaft = MeshBuilder.CreateTube(
        "shaft",
        {
            path: [new Vector3(0, -length / 2, 0), new Vector3(0, length / 2, 0)],
            radius: diameter / 2,
            sideOrientation: Mesh.FRONTSIDE,
        },
        scene,
    );
    // Create a paddle with a box
    const paddle = MeshBuilder.CreateBox(
        "paddle",
        {
            height: span / 3,
            depth: span,
            width: length / 2,
            sideOrientation: Mesh.FRONTSIDE
        },
        scene
    )
    // Create a CSG from each mesh
    const shaftCSG = CSG.FromMesh(shaft);
    const paddleCSG = CSG.FromMesh(paddle);
    // Union the two CSG objects
    const paddledShaftCSG = shaftCSG.union(paddleCSG);
    // Create a mesh from the final CSG
    const paddleOnShaft = paddledShaftCSG.toMesh("paddles", null, scene);
    // Dispose of component meshes
    shaft.dispose();
    paddle.dispose();
    scene.removeMesh(shaft);
    scene.removeMesh(paddle);

    // Create solid shaft
    const shaftSolid = MeshBuilder.CreateTube(
        "shaftSolid",
        {
            path: [new Vector3(0, -length * 4, 0), new Vector3(0, length * 6, 0)],
            radius: diameter / 2.2,
            sideOrientation: Mesh.FRONTSIDE,
        },
        scene,
    );

    // Adjust starting orientation
    shaftSolid.rotation.z = Tools.ToRadians(90)

    // Give shaft and paddles some colour
    const paddleCol = new StandardMaterial("paddleCol", scene);
    paddleCol.diffuseColor = new Color3(0.9, 0.4, 0.9)
    paddleOnShaft.material = paddleCol;

    const shaftCol = new StandardMaterial("shaftCol", scene);
    shaftCol.diffuseColor = new Color3(1, 1, 1)
    shaftSolid.material = shaftCol;

    paddleOnShaft.position = new Vector3(0, 0, 0);
    paddleOnShaft.rotation.z = Tools.ToRadians(90);

    const paddleRight = paddleOnShaft.clone()
    paddleRight.position = new Vector3(-0.6, 0, 0);
    paddleRight.rotation.x = Tools.ToRadians(45);

    const paddleLeft = paddleOnShaft.clone()
    paddleLeft.position = new Vector3(0.6, 0, 0);
    paddleLeft.rotation.x = Tools.ToRadians(110);

    const holder = MeshBuilder.CreateSphere("holder", { diameter: 0.1, segments: 2 }, scene);
    holder.position = new Vector3(0.0, 0, 0);
    const holderRight = MeshBuilder.CreateSphere("holderR", { diameter: 0.1, segments: 2 }, scene);
    holderRight.position = new Vector3(-0.6, 0, 0);
    const holderLeft = MeshBuilder.CreateSphere("holderL", { diameter: 0.1, segments: 2 }, scene);
    holderLeft.position = new Vector3(0.6, 0, 0);

    paddleOnShaft.physicsImpostor = new PhysicsImpostor(paddleOnShaft, PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0 }, scene);
    paddleRight.physicsImpostor = new PhysicsImpostor(paddleRight, PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0 }, scene);
    paddleLeft.physicsImpostor = new PhysicsImpostor(paddleLeft, PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0 }, scene);
    holder.physicsImpostor = new PhysicsImpostor(holder, PhysicsImpostor.SphereImpostor, { mass: 0 });
    holderRight.physicsImpostor = new PhysicsImpostor(holderRight, PhysicsImpostor.SphereImpostor, { mass: 0 });
    holderLeft.physicsImpostor = new PhysicsImpostor(holderLeft, PhysicsImpostor.SphereImpostor, { mass: 0 });

    var joint = new HingeJoint({
        mainPivot: new Vector3(0, 0, 0),
        connectedPivot: new Vector3(0, 0, 0),
        mainAxis: new Vector3(1, 0, 0),
        connectedAxis: new Vector3(0, 0, 0),
    });
    var jointR = new HingeJoint({
        mainPivot: new Vector3(0, 0, 0),
        connectedPivot: new Vector3(0, 0, 0),
        mainAxis: new Vector3(1, 0, 0),
        connectedAxis: new Vector3(0, 0, 0),
    });
    var jointL = new HingeJoint({
        mainPivot: new Vector3(0, 0, 0),
        connectedPivot: new Vector3(0, 0, 0),
        mainAxis: new Vector3(1, 0, 0),
        connectedAxis: new Vector3(0, 0, 0),
    });

    holder.physicsImpostor.addJoint(paddleOnShaft.physicsImpostor, joint);
    holderRight.physicsImpostor.addJoint(paddleRight.physicsImpostor, jointR);
    holderLeft.physicsImpostor.addJoint(paddleLeft.physicsImpostor, jointL);

    // GUI
    guiAdd("speed", 0.0);

    gui.add(options, "speed", 0.0, 2.0, 0.5).onChange(function(value: number) {
        let speed = value;
        joint.setMotor(3 * speed, 2 * speed);
        jointR.setMotor(3 * speed, 2 * speed);
        jointL.setMotor(3 * speed, 2 * speed);
    });

}
