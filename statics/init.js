/**
 * Created by KiwiDc on 4/10/15.
 */


function registerInit()
{
        $("#username").val("");
        $("#password").val(""),
        $("#password_verify").val("");
        $("#captcha").val("");
        $('#register-message').html('');
}

function managementInit()
{
    $("#currentState").attr("value","选择要修改权限的账号");
}