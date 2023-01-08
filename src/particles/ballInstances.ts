import { Color3, Mesh, MeshBuilder, PhysicsImpostor, StandardMaterial, Vector3 } from "@babylonjs/core";
import { scene } from '../scene'

export function makeBall1(): Mesh {

    let unitVector = new Vector3(1, 1, 1);
    let popSize = 100;

    function rand1() {
        let sign = Math.random() < 0.5;
        return Math.random() * (sign ? 1 : -1);
    }

    function rand2(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    let ball = MeshBuilder.CreateSphere("ball", {diameter: 0.12, segments: 2 }, scene);

    const ballCol = new StandardMaterial("ballCol", scene);
    ballCol.diffuseColor = new Color3(5.0, 5.0, 0.0)
    ball.material = ballCol;

    ball.registerInstancedBuffer("color", 3);
    ball.instancedBuffers.color = new Color3;

    for (let i = 0; i < popSize; ++i) {
        let b = ball.createInstance("ball" + i);
        /* b.alwaysSelectAsActiveMesh = true; */
        b.position.y = 0.20;
        b.position.x = rand1() * 0.9;
        b.position.z = rand1() * 0.35;
        b.scaling = unitVector.scale(rand2(0.5,1.2));

        if (b.scaling >= unitVector.scale(1.1)) {
            b.instancedBuffers.color = new Color3(3, 0, 0) // large = red
        } else if (b.scaling <= unitVector.scale(0.6)) {
            b.instancedBuffers.color = new Color3(0, 0, 0) // small = black
        } else {
            b.instancedBuffers.color = new Color3(3, 3, 0) // med = yellow 
        };

        /* TODO: kill particles outside chamber walls */
        /* if (b.isAnInstance && b.position.x > chamberR.x) { */
        /*     b.dispose(); */
        /* } */

        b.physicsImpostor = new PhysicsImpostor(b, PhysicsImpostor.SphereImpostor, { mass: 0.1, restitution: 0.01 });
    }

    return ball;

    /* ball.dispose(); TODO: have datGUI option to restart with less or no particles */
}
