var current_fldr_id;

var plugin=[ "wholerow" ,"sort" ];
var super_plugin=[ "wholerow" , "contextmenu" ,"dnd" ,  "sort"];

var context_manu={
	"create" : {
			"separator_before"	: false,
			"separator_after"	: false,
			"_disabled"			: false, //(this.check("create_node", data.reference, {}, "last")),
			"label"				: "Create",
			"action"			: function (data) {
				var inst = $.jstree.reference(data.reference),
					obj = inst.get_node(data.reference);
				inst.create_node(obj, {}, "last");
			}
		},
		"rename" : {
			"separator_before"	: false,
			"separator_after"	: false,
			"_disabled"			: false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
			"label"				: "Rename",
			"action"			: function (data) {
				var inst = $.jstree.reference(data.reference),
					obj = inst.get_node(data.reference);
				inst.edit(obj);
			}
		},
		"remove" : {
			"separator_before"	: false,
			"icon"				: false,
			"separator_after"	: false,
			"_disabled"			: false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
			"label"				: "Delete",
			"action"			: function (data) {
				var inst = $.jstree.reference(data.reference),
					obj = inst.get_node(data.reference);
				if (window.confirm("Confirm to delete folder "+obj.text)){
					if(inst.is_selected(obj)) {
						inst.delete_node(inst.get_selected());
					}
					else {
						inst.delete_node(obj);
					}
				}
			}
		}
};

function changefolder(obj){
	$('#jstree').jstree('deselect_all');
	$('#jstree').jstree('select_node', $(obj).attr("ref"));
}

function build_trees () {
	//config the main jstreer
	$('#jstree')
	.on('select_node.jstree',function(e,data){
		$('.thumbnail').removeClass('selected');
		show_select_btns();
		var i,j,r="";
		j=data.instance.get_path(data.selected[0],false,true);
		for (i=0;i<j.length-1;i++){
			r=r+'<li><a href="javascript:void(0)" onclick="javascript:changefolder(this)" ref="'+j[i]+'">'+data.instance.get_node(j[i]).text+'</a></li>';
		}
		var current_fldr=data.instance.get_node(j[j.length-1]);
		r=r+'<li class="active">'+current_fldr.text+'</a></li>';
		$(".breadcrumb").html(r);

		$('#picSlide').empty();
		$('#picture-area-all').empty();
		current_fldr_id=current_fldr.id;
		refresh_pic_content(current_fldr_id);
		
	})
	.on('rename_node.jstree',function(e,data){
		$('#jstree').jstree('deselect_all');
		$('#jstree').jstree('select_node', data.node);
		var n=data.instance.get_node(data.node);
		$.each(tree_structure, function(key, val){
			if(val.id==data.node.id){
				tree_structure[key].text=data.text;
				$.post("/folders/change_name/",
				{
					'fid'	: val.id,
					'name'	: data.text
				},function(res){
					//if (res.data.parentFolder)alert('rename code '+res.code);
				});
			}
		});
		refresh_trees();
	})
	.on('move_node.jstree',function(e,data){
		//alert();
		$('#jstree').jstree('deselect_all');
		$('#jstree').jstree('select_node', data.node);
		var n=data.instance.get_node(data.node);
		$.each(tree_structure, function(key, val){
			if(val.id==data.node.id){
				tree_structure[key].parent=data.parent;
				//add_move
			}
			
		});
		refresh_trees();
	})
	.on('create_node.jstree',function(e,data){
		$.post('/folders/create', 
		{
			"name"	: "New Node",
			"parentFolderId" : data.parent
		},
		function(res) {
			if (res.code==0){
				tree_structure.push({ "id" : res.data.fid, "parent" : data.parent, "text" : "New Node" });
				refresh_trees();
			}
		});
	})
	.on('delete_node.jstree',function(e,data){
		var to_be_delete;
		$.each(tree_structure,function(key,val){
			if (val.id==data.node.id){
				to_be_delete=key;
				$.post("/folders/delete",
					{
						"fid" : val.id 
					},
					function(res){
						if (res.code==0){
							tree_structure.splice(to_be_delete, 1);
							if (tree_structure.length==0){
								$.post('/folders/create', 
								{
									"name"	: "New Node",
									"parentFolderId" : '#'
								},
								function(res) {
									if (res.code!=0)
										alert("the folder " + res.message);
									tree_structure=[{ "id" : res.data.fid, "parent" : '#', "text" : "New Node" }];
									refresh_trees();
								});
							}else 
								refresh_trees();
						}else alert(res.message); 
				});
			}
		});
		
	})
	.jstree(jstree_data);
	//config the authorize_folder_select jstree
	$('#jstree_select_authority').jstree(tree_auth_data);
	
	$('#jstree_select_move').jstree(tree_move_data);
}

var jstree_data={
		"contextmenu":{
			"select_node":false,
			"items":context_manu
		},
		"core" : {
			"multiple" :false,
			"check_callback" : true,
			'data' : function(obj,callback){
				callback.call(this,tree_structure);
			}
		 },
		"plugins" : plugin
	};

var tree_auth_data={
		"core" : {
			"multiple" :true,
			"check_callback" : false,
			'data' : function(obj,callback){
				callback.call(this,tree_structure);
			}
		 },
		 "checkbox" : {
			"three_state" : false,
			"keep_selected_style" : false
		 },
		"plugins" : [ "wholerow" ,  "checkbox" , "sort"]
	};

var tree_move_data={
		"core" : {
			"multiple" :false,
			"check_callback" : false,
			'data' : function(obj,callback){
				callback.call(this,tree_structure);
			}
		 },
		"plugins" : [ "wholerow" ,  "sort"]
	};


function refresh_trees(){
	$('#jstree').jstree('refresh');
	//$('#jstree').data('jstree',false).empty().jstree(jstree_data);
	$('#jstree_select_authority').jstree('refresh');
	$('#jstree_select_move').jstree('refresh');
}