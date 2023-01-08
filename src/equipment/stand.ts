import {
    Scene,
    Mesh,
    MeshBuilder,
    Vector3,
    Nullable
} from '@babylonjs/core'

export function makeStand(scene: Scene): Nullable<Mesh> {

    const basicStand = MeshBuilder.CreateBox(
        "stand",
        {
            width: 3.5,
            height: 0.05,
            depth: 0.1
        },
        scene
    )
    basicStand.position = new Vector3(-0.5, -0.48, 0);

    const motorStand = MeshBuilder.CreateBox(
        "standMotor",
        {
            width: 0.3,
            height: 0.3,
            depth: 0.1
        },
        scene
    )
    motorStand.position = new Vector3(-1.70, -0.32, 0);

    basicStand.doNotSyncBoundingInfo = true;
    motorStand.doNotSyncBoundingInfo = true;

    const stand = Mesh.MergeMeshes([basicStand, motorStand]);

    basicStand.dispose();
    motorStand.dispose();

    return stand;
}
