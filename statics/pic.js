var pic_in_fldr=[];

var pic_num=0;
function add_pic_to_show(pic_id){
	var url='/images/get_image/'+pic_id;
	$("#picSlide").append("<div class='item active' pic_id='"+pic_id+"'><img src='"+url+"'/></div>");
	$('#picture-area-all').append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><a href="#" class="thumbnail" pic_id="'+pic_id+'"><img src="'+url+'" class="pic" alt="缩略图"></a></div>');	
}

function refresh_pic_content(target_fldr_id){
	$('#picSlide').empty();
	$('#picture-area-all').empty();
	pic_in_fldr=[];
	pic_num=0;
	//get image id using target_fldr_id
	$.get('/folders/image_list/'+target_fldr_id, function(data) {
		pic_in_fldr=data.data.imageList;
		while (pic_num<pic_in_fldr.length&&pic_num<30){
			add_pic_to_show(pic_in_fldr[pic_num]);
			pic_num++;
		}
			
	});
}

function hide_select_btns(){
	$('#upload-btn').hide();
	$('#delete-btn').hide();
	$('#move-btn').hide();
}

function show_select_btns(){
	$('#upload-btn').show();
	$('#delete-btn').show();
	$('#move-btn').show();
}

$(document).ready(function (){	
	   
	var nScrollHeight = 0;
	var nScrollTop = 0;
	var nDivHeight = $("#picture-area-all").height();
			
	$("#picture-area-all").scroll(function(){
		nScrollHeight = $(this)[0].scrollHeight;
		nScrollTop = $(this)[0].scrollTop;
		//$('#home').html(nScrollTop + nDivHight-nScrollHight);
		if(nScrollTop + nDivHeight >= nScrollHeight-300){
			var count=0;
			while(count<20&&pic_num<pic_in_fldr.length){
				add_pic_to_show(pic_in_fldr[pic_num]);
				count++;pic_num++;
			}
		}
    });

	$('#latest').click(function(event) {
		$('#jstree').jstree('deselect_all');
		hide_select_btns();
		$(".breadcrumb").html('<li class="active">Latest</a></li>');
	});
});