controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Lollipop = sprites.create(assets.image`Lollipop`, SpriteKind.Projectile)
    Lollipop.setPosition(randint(9, 145), randint(1, 12))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Blobert.setPosition(randint(9, 150), 107)
    statusbar.value += -0.1
})
info.onScore(300, function () {
    scene.setBackgroundImage(assets.image`Upclose castle`)
    game.splash("Now you are actually safe!")
    for (let index = 0; index < 1e+100; index++) {
        sprites.destroy(Forest_Reapers)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(Forest_Reapers)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
})
info.onScore(100, function () {
    game.splash("You escaped, for now.")
    scene.setBackgroundImage(assets.image`Castle from far`)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    if (controller.A.isPressed()) {
        game.showLongText("Im tired, stop teleporting!", DialogLayout.Bottom)
        info.changeLifeBy(-1)
    }
})
info.onLifeZero(function () {
    music.play(music.stringPlayable("D F D B G C F B ", 120), music.PlaybackMode.InBackground)
    game.gameOver(false)
})
info.onScore(200, function () {
    scene.setBackgroundImage(assets.image`Pathway to castle`)
    game.showLongText("Oh no, they followed me here!", DialogLayout.Bottom)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    scene.cameraShake(6, 1000)
    info.changeLifeBy(-1)
})
let Forest_Reapers: Sprite = null
let Lollipop: Sprite = null
let statusbar: StatusBarSprite = null
let Blobert: Sprite = null
Blobert = sprites.create(assets.image`Blobert`, SpriteKind.Player)
scene.setBackgroundImage(assets.image`Deadly Forest`)
controller.moveSprite(Blobert)
Blobert.setBounceOnWall(true)
info.setLife(3)
animation.runImageAnimation(
Blobert,
assets.animation`Blobert but Animated`,
1000,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(Blobert)
statusbar.setColor(8, 2)
statusbar.max = 1
statusbar.value += 1
game.onUpdateInterval(1000, function () {
    Forest_Reapers = sprites.create(assets.image`Deadly_Forest-Reapers`, SpriteKind.Enemy)
    Forest_Reapers.setVelocity(0, 30)
    Forest_Reapers.setPosition(randint(9, 150), 7)
    timer.after(50, function () {
        info.changeScoreBy(1)
    })
})
