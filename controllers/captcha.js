/*
 * Captcha Controller
 * Li Ao
 * hi@leeleo.me
 */

var captchagen = require('captchagen');

exports.generate = function (req, res, next) {
    var captcha = captchagen.create({ width:1000, height:1000 }); 
    var captchaCode = captcha.text();
    console.log(captchaCode);
    console.log(captcha.height());
    console.log(captcha.width());

    if (captchaCode) {
        req.session.captcha = captchaCode;
    }

    captcha.generate();
    res.send(captcha.buffer());
}

exports.check = function (req, res, next) {
    if (req.body.captcha == req.session.captcha) {
        next(); 
    }
    else {
        res.json({ code: 1, message: "验证码错误" }); 
    }
}
