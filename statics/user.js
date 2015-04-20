//the useless func
function move_fldr(){
	$('#myModal4').hide();
}

function logout(){
	$.get('/users/logout',function(res){
		if(res.code == 0)location.href = "index.html";
	});
}
