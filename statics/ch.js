function register()
    {
        $.post("http://127.0.0.1:8000/users/register/",
            {
                "email":		    $("#username").val(),
                "password":			$("#password").val(),
                "passwordVerify":	$("#password_verify").val(),
                "captcha":          $("#captcha").val()
            },
            function(res){
                var res = eval(res);
                var message = res.message;
                var code = res.code;

                if(code == 0){
                    $('#myModal').modal('hide');
                    registerInit();
                }
                    

                if(code != 0){
                    $('#register-message').html(message);
                }
                    
                //alert(message);

            });
        
    };


function add_user_to_folder()
{
    $.post("the URL for add user to folder",
    {
        "users":                $("#currentState").val(),
        "folder":               $("#jstree_select_authority").jstree('get_selected')
    })
};

function change_password()
{
    if ($('#changePassword').val() == $('#changePassword2').val()){
        $.post("http://127.0.0.1:8000/users/change_password/",
        {
            'password' : $('#changePassword').val()
        },function(res){
            alert(res.message);
        })
    }else{
        alert('p!=pv');
    }

}; 
