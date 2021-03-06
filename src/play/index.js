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
            var height = width * 750 / 550;
            var scale = width / 550;
            var awards = ["", "风景卡片", "名片夹", "牛奶",
                          "精品棉袜", "抽纸", "洗衣液", "保暖内衣",
                          "食用油", "IPONE5"];
            var perAng = 2 * Math.PI / awards.length;
            var origin = 0;
            zr.addShape(new ImageShape({
                style: {
                    x: 0,
                    y: 0,
                    image: './img/bg.png',
                    width: width,
                    height: width * 15 / 11
                }
            }));
            var turn = new ImageShape({
                id: guid(),
                style: {
                    x: 33 * scale,
                    y: 200 * scale,
                    image: './img/turn.png',
                    width: 479 * scale,
                    height: 479 * scale
                },
                rotation: [0, (33 + 479/2) * scale, (200 + 479/2) * scale]
            });
            zr.addShape(turn);
            zr.addShape(new ImageShape({
                style: {
                    x: 216 * scale,
                    y: 307 * scale,
                    image: './img/arrow.png',
                    width: 112 * scale,
                    height: 188 * scale
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
                            result = (result + 1) % awards.length;;
                            if (0 === result) {
                                alert('谢谢参与');
                            }
                            else {
                                alert('恭喜你得到了' + awards[result] + '！');
                            }
                        })
                        .start('QuarticOut');
                }
            }));
            zr.render();
        }
    };
});
