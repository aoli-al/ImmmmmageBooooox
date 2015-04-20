function login_post()
{
	$.post("the URL for login", 
	{
		"user_name":	$("#user_name").val(),
		"password":		$("#password").val()
	}, 
	function(res){
		res = eval(res);
		if (res.code===0){
			window.location.href="main.html";
		}else{
			alert(res.message);
		}
		//message = res.message;
		//code = res.code;
	});
	return false;
};

