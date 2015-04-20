function register()
{
	$.post("the URL for register", 
	{
		"user_name":		string_un,
		"password":			string_pwd,
		"password_verify":	string_pwdV
	}, 
	function(res){
		res = eval(res);

	});
};

function login()
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
	});
};

function change_password()
{
	$.post("the URL for change password", 
	{
		"password":				string_pwd,
		"new_password":			string_new_pwd,
		"new_password_verify":	string_new_pwdV
	}, 
	function(res){
		res = eval(res);

	});
};

function move_image()
{
	$.post("the URL for move images", 
	{
		"image_ID":				img_id,
		"new_path":				string_new_path
	}, 
	function(res){
		res = eval(res);

	});
};

function delete_image()
{
	$.post("the URL for delete images", 
	{
		"image_ID":				img_id
	}, 
	function(res){
		res = eval(res);

	});
};

function add_user_to_folder()
{
	$.post("the URL for add user to folder", 
	{
		"users":				array_user,
		"folder":				string_folder
	}, 
	function(res){
		res = eval(res);

	});
};

function add_folder_to_user()
{
	for(var i=0;i<array_folder.length;i++)
		$.post("the URL for add user to folder", 
		{
			"users":				user,
			"folder":				array_folder[i]
		}, 
		function(res){
			res = eval(res);
	
		});
};

function upload_image()
{
	$.post("the URL for upload image", 
	{
		"image":				image,
		"folder":				string_folder
	}, 
	function(res){
		res = eval(res);

	});
}

function delete_user()
{
	$.post("the URL for delete user", 
	{
		"user":				user
	}, 
	function(res){
		res = eval(res);

	});
}

function add_folder()
{
	$.post("the URL for add folder", 
	{
		"folder":				new_folder,
		"father":				father_folder
	}, 
	function(res){
		res = eval(res);

	});
}

function delete_folder()
{
	$.post("the URL for delete folder", 
	{
		"folder":				folder
	}, 
	function(res){
		res = eval(res);

	});
}

function rename_folder()
{
	$.post("the URL for rename folder", 
	{
		"folder":				folder,
		"new_name":				string_name
	}, 
	function(res){
		res = eval(res);

	});
}

function move_image()
{
	$.post("the URL for move folder", 
	{
		"folder":				folder,
		"new_path":				string_new_path
	}, 
	function(res){
		res = eval(res);

	});
};

