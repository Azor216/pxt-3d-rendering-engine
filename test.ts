// ============================================================
// TEST / DEMO - 3D Engine
// Jednoduchá ukázka: kostka + podlaha + jump/crouch/sprint
// Šipky = pohyb, A = skok, B = dřep, A+B = sprint
// ============================================================

Render3D.createScene()
Render3D.setSkyColor(9)
Render3D.setGroundColor(7)
Render3D.setLightDirection(0.5, 0.8, -0.3)

// Podlaha
let ground = Render3D.addGround(0, 20, 15)

// Ukázkové objekty
let box = Render3D.addBox(0, 1, 5, 2, 2, 2, 8)
let box2 = Render3D.addBox(5, 0.5, 8, 1, 1, 1, 2)
let box3 = Render3D.addBox(-4, 1.5, 6, 1.5, 3, 1.5, 7)

// Kamera
Render3D.setCameraPosition(0, 2, -4)
Render3D.setCameraRotation(0, 0.15)
Render3D.setFieldOfView(60)
Render3D.setGroundLevel(0)

// Ovládání
game.onUpdate(function () {
    // Pohyb dopředu/dozadu + strafe
    let fwd = 0
    let right = 0
    if (controller.up.isPressed()) fwd = 0.1
    if (controller.down.isPressed()) fwd = -0.1
    if (controller.left.isPressed()) {
        Render3D.rotateCamera(-0.04, 0)
    }
    if (controller.right.isPressed()) {
        Render3D.rotateCamera(0.04, 0)
    }

    // A = skok
    if (controller.A.isPressed()) {
        Render3D.jump()
    }
    // B = dřep
    Render3D.crouch(controller.B.isPressed())

    // Sprint když A+B
    Render3D.sprint(controller.A.isPressed() && controller.B.isPressed())

    // Pohyb hráče (s automatickým sprintem)
    if (fwd !== 0 || right !== 0) {
        Render3D.movePlayer(fwd, right)
    }

    // Fyzika (gravitace, dopad)
    Render3D.updatePhysics()

    // Animace
    Render3D.rotateMeshBy(box, 0, 0.01, 0)

    // Render
    Render3D.render()
})
