//the useless func
function move_fldr(){
	$('#myModal4').hide();
}

function logout(){
	$.get('http://127.0.0.1:8000/users/logout',function(res){
		if(res.code == 0)location.href = "index.html";
	})
}
