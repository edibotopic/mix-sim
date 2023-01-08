import {
    Scene,
    Mesh,
    MeshBuilder,
    Vector3,
    Tools,
    Nullable
} from '@babylonjs/core'

export function makeMotor(OD: number, length: number, scene: Scene): Nullable<Mesh> {
    const motorConnect = MeshBuilder.CreateCylinder(
        "body",
        {
            diameter: OD - 0.1,
            height: length,
        },
        scene
    );
    motorConnect.position = new Vector3(-1.5, 0, 0);
    motorConnect.rotation.z = Tools.ToRadians(90);

    const motorBody = MeshBuilder.CreateCylinder(
        "connect",
        {
            diameter: OD * 1.2,
            height: length * 4,
        },
        scene
    );
    motorBody.position = new Vector3(-1.7, 0, 0);
    motorBody.rotation.z = Tools.ToRadians(90);

    motorBody.doNotSyncBoundingInfo = true;
    motorConnect.doNotSyncBoundingInfo = true;

    const motor = Mesh.MergeMeshes([motorConnect, motorBody])
    motorBody.dispose();
    motorConnect.dispose();

    return motor;

}
