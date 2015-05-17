define(function (require) {

    var zrender     = require('zrender');
    var guid        = require('zrender/tool/guid');
    var ImageShape  = require('zrender/shape/Image');
    var Animation   = require('zrender/animation/animation');
    var zr          = zrender.init(document.getElementById('turn-table'));

    return {
        init: function () {
            zr.clear();

            var width = zr.getWidth();
            var height = width;
            var scale = width / 450;
            var awards = ["360经验值", "100M空间", "36经验值", "360MB空间",
                          "100经验值", "36MB空间", "100G永久免费空间"];
            var perAng = 2 * Math.PI / awards.length;
            var origin = 0;

            zr.addShape(new ImageShape({
                style: {
                    x: 0,
                    y: 0,
                    image: './img/disc-bg.gif',
                    width: width,
                    height: width
                }
            }));
            var turn = new ImageShape({
                style: {
                    x: 50 * scale,
                    y: 50 * scale,
                    image: './img/disc-rotate.gif',
                    width: 352 * scale,
                    height: 352 * scale
                },
                rotation: [0, (50 + 176) * scale, (50 + 176) * scale]
            });
            zr.addShape(turn);
            zr.addShape(new ImageShape({
                style: {
                    x: 209 * scale,
                    y: 90 * scale,
                    image: './img/arrow.png',
                    width: 32 * scale,
                    height: 191 * scale
                }
            }));
            zr.addShape(new ImageShape({
                style: {
                    x: 179.5 * scale,
                    y: 183 * scale,
                    image: './img/buttons_01.png',
                    width: 91 * scale,
                    height: 92 * scale
                },
                clickable: true,
                onclick: function () {
                    var Dreg = Math.PI * 8 + Math.random() * Math.PI * 3;
                    origin += Dreg;

                    zr
                        .animate(turn.id)
                        .when(5000, {
                            rotation : [
                                origin,
                                turn.rotation[1],
                                turn.rotation[2]]
                        })
                        .done(function () {
                            var result = Math.floor((origin % (2 * Math.PI)) / perAng);
                            result = result % awards.length;;
                            alert('恭喜你得到了' + awards[result] + '！');
                        })
                        .start('QuarticOut');
                }
            }));
            zr.render();
        }
    };
});
