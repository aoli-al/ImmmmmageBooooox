var super_user=0;
var tree_structure=[];

$(document).ready(function() {
	//alert('debug1');
	hide_select_btns();
	$.get('/users/is_superuser', function(data) {//is_super_user
		if (data.code==0)super_user=1;
		else super_user=0;
		if (super_user){
			jstree_data.plugins=super_plugin;
			$('#management_button').show();
			$('#new-user-button').show();
			build_trees();
				
		}
	});
	$.get('/users/folder_list',function(rp) {
		//get folders
		//alert("in get fid list   " + rp.data.folderList.length);
		if (rp.data.folderList.length==0){	//debuging
			//post new folder
			//alert(rp);
			$.post('/folders/create', 
			{
				"name"	: "New Node",
				"parentFolderId" : '#'
			},
			function(res) {
				if (code!=0)
					alert("the folder " + res.message);
				tree_structure=[{ "id" : res.data.fid, "parent" : '#', "text" : "New Node" }];
				refresh_trees();
			});
		}else{
			//use fid to get the folder info
			//$.get('/folders/info/:'+data.data);
			//end get
			var count=0;
			$.each(rp.data.folderList,function(key,val){
				$.get('/folders/info/'+val._id,function(res){
					var new_node={"id":val._id,"text":res.data.name,"parent":res.data.parentFolder};
					if (res.data.parentFolder==undefined)new_node.parent='#';
					tree_structure.push(new_node);
					count+=1;
					if (count==rp.data.folderList.length)
						refresh_trees();
				});
			});
		}
	});
});