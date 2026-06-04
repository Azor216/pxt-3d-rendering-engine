// ============================================================
// 3D PLATFORMER
// Skákej po platformách, dostaň se na konec!
// Šipky = pohyb/otáčení, A = skok, B = dřep
// ============================================================

Render3D.createScene()
Render3D.setSkyColor(9)
Render3D.setGroundColor(1)
Render3D.setLightDirection(0.4, 0.8, -0.3)
Render3D.setGroundLevel(-20)
Render3D.setGravity(0.014)
Render3D.setJumpForce(0.25)
Render3D.setFieldOfView(65)

// === STARTOVNÍ PLATFORMA ===
let pStart = Render3D.addBox(0, -0.25, 0, 6, 0.5, 6, 15)
Render3D.setCollider(pStart, true)

// === CESTA Z PLATFOREM ===
// Řada 1 - rovně dopředu
let p1 = Render3D.addBox(0, -0.25, 5, 3, 0.5, 3, 7)
Render3D.setCollider(p1, true)
let p2 = Render3D.addBox(0, 0.25, 10, 2.5, 0.5, 2.5, 7)
Render3D.setCollider(p2, true)
let p3 = Render3D.addBox(0, 0.75, 15, 2, 0.5, 2, 7)
Render3D.setCollider(p3, true)

// Odbočka doprava + nahoru
let p4 = Render3D.addBox(4, 1.5, 17, 2.5, 0.5, 2.5, 5)
Render3D.setCollider(p4, true)
let p5 = Render3D.addBox(8, 2, 17, 2, 0.5, 2, 5)
Render3D.setCollider(p5, true)
let p6 = Render3D.addBox(12, 2.5, 17, 2.5, 0.5, 2.5, 5)
Render3D.setCollider(p6, true)

// Úzký most
let bridge = Render3D.addBox(12, 2.5, 22, 1, 0.5, 6, 4)
Render3D.setCollider(bridge, true)

// Platforma za mostem
let p7 = Render3D.addBox(12, 2.5, 27, 3, 0.5, 3, 3)
Render3D.setCollider(p7, true)

// Schody nahoru
let s1 = Render3D.addBox(12, 3, 31, 2, 0.5, 2, 6)
Render3D.setCollider(s1, true)
let s2 = Render3D.addBox(12, 3.8, 35, 2, 0.5, 2, 6)
Render3D.setCollider(s2, true)
let s3 = Render3D.addBox(12, 4.6, 39, 2, 0.5, 2, 6)
Render3D.setCollider(s3, true)

// Odbočka doleva - klesání
let p8 = Render3D.addBox(8, 4, 41, 2.5, 0.5, 2.5, 8)
Render3D.setCollider(p8, true)
let p9 = Render3D.addBox(4, 3.5, 41, 2, 0.5, 2, 8)
Render3D.setCollider(p9, true)
let p10 = Render3D.addBox(0, 3, 41, 2, 0.5, 2, 8)
Render3D.setCollider(p10, true)

// Cik-cak sekce
let z1 = Render3D.addBox(-3, 3.5, 45, 2, 0.5, 2, 2)
Render3D.setCollider(z1, true)
let z2 = Render3D.addBox(0, 4, 49, 2, 0.5, 2, 2)
Render3D.setCollider(z2, true)
let z3 = Render3D.addBox(-3, 4.5, 53, 2, 0.5, 2, 2)
Render3D.setCollider(z3, true)

// === CÍLOVÁ PLATFORMA ===
let pEnd = Render3D.addBox(-3, 4.5, 58, 4, 0.5, 4, 5)
Render3D.setCollider(pEnd, true)
// Cílový sloup se zlatou pyramidou
let goalPillar = Render3D.addBox(-3, 6, 58, 0.8, 2.5, 0.8, 14)
Render3D.setCollider(goalPillar, false)
Render3D.addPyramid(-3, 7.5, 58, 1.5, 1.2, 5)

// === DEKORACE (bez kolizí) ===
let d1 = Render3D.addBox(-4, 1.5, 0, 0.4, 3, 0.4, 12)
Render3D.setCollider(d1, false)
let d2 = Render3D.addBox(4, 1.5, 0, 0.4, 3, 0.4, 12)
Render3D.setCollider(d2, false)
let d3 = Render3D.addBox(15, 4, 17, 0.4, 3, 0.4, 12)
Render3D.setCollider(d3, false)
let d4 = Render3D.addBox(15, 4, 27, 0.4, 3, 0.4, 12)
Render3D.setCollider(d4, false)

// === KAMERA ===
Render3D.setCameraPosition(0, 2, -2)
Render3D.setCameraRotation(0, 0.15)

// === GAME LOOP ===
let fell = false

game.onUpdate(function () {
    // Pohyb
    let fwd = 0
    if (controller.up.isPressed()) fwd = 0.1
    if (controller.down.isPressed()) fwd = -0.1

    // Otáčení
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

    // Pohyb hráče
    if (fwd !== 0) {
        Render3D.movePlayer(fwd, 0)
    }

    // Fyzika
    Render3D.updatePhysics()

    // Render
    Render3D.render()
})
