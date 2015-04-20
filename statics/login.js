
function login_post(){
	$.post('/users/login/', {
		"email" : $("#user_name").val(),
		"password": $("#password").val(),
		"captcha" : $("#captcha").val()
	}, function(data) {
		if (data.code==0){
			location.href = "main.html";
		}else{
			$("#login-result").html(data.message);
		}
	});
	return false;
}

function setting_post(){
	//use post_register for regi super_user
	$.post('/users/register/', {
		"email" : $('#admin-name').val(),
		"password" : $('#admin-password').val(),
		"passwordVerify" : $('#admin-password-verify').val(),
		"captcha" : $('#admin_captcha').val()
	}, function(data) {
		alert(data.message);
		if (data.code==0){
			location.href = "main.html";
		}else{
			$('#admin-result').html(data.message);
		}
	});
}

$(document).ready(function(){
	$.post('/users/login/', {
		"email" : "",
		"password":"",
		"captcha" : ""
	}, function(data) {
		if (data.code!=101){
			$("#login-form").fadeIn();
		}else{
			$('#setting-form').fadeIn();
		}
	});
});

