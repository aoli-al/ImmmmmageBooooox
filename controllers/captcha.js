/*
 * Captcha Controller
 * Li Ao
 * hi@leeleo.me
 */

var captchagen = require('captchagen');

exports.generate = function (req, res, next) {
    var captcha = captchagen.create({ type: 'jpeg', font: 'Helvetica' }); 
    var captchaCode = captcha.text();
    console.log(captchaCode);
    console.log(captcha.height());
    console.log(captcha.width());

    if (captchaCode) {
        req.session.captcha = captchaCode;
    }

    console.log(req.session);
    captcha.generate();
    res.send(captcha.buffer());
}

exports.check = function (req, res, next) {
    console.log(req.session);
    console.log(req.cookies);
    if (typeof req.session.captcha !== 'string') {
        res.json({ code: 2, message: "验证码错误" }); 
    }
    else if (req.body.captcha == req.session.captcha) {
        next(); 
    }
    else {
        res.json({ code: 2, message: "验证码错误" }); 
    }
}
