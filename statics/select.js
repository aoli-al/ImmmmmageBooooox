// item selection
$(document).ready(function() {
	var select_mode = "";
	$(document).on('click','.thumbnail',function() {
		if (select_mode!=""){
			$(this).toggleClass('selected');
		}else{
			$(".item").removeClass('active');
			$('#myModal6').modal('show');
			$('.item').filter('[pic_id="'+$(this).attr("pic_id")+'"]').addClass('active');
			//alert($(this).attr("num"));
		}
	});

	// all item selection
	$('#select-all-btn').click(function() {
		$('.thumbnail').addClass('selected');
	});

	$('#select-inverse-btn').click(function(event) {
		$('.thumbnail').toggleClass('selected');
	});

	$('#delete-btn').click(function(event) {
		if (select_mode === "") {
			select_mode = "delete";
			enable_select(this);
		}else{
			f_delete();
			select_mode = "";
			disable_select(this);
			$('#myModal8').modal('show');
			$('.thumbnail').removeClass('selected');
		}
	});

	$('#download-btn').click(function(event) {
		if (select_mode === "") {
			select_mode = "download";
			enable_select(this);
		}else{
			f_download();
			select_mode = "";
			disable_select(this);
			$('.thumbnail').removeClass('selected');
		}
	});

	$('#move-btn').click(function(event) {
		if (select_mode === "") {
			select_mode = "move";
			enable_select(this);
		}else{
			select_mode = "";
			disable_select(this);
			$('#myModal7').modal('show');
			$('.thumbnail').removeClass('selected');
		}
	});

	
});

function enable_select(obj) {
	$('#select-all-btn').attr("disabled", false);
	$('#select-inverse-btn').attr("disabled", false);
	$(obj).addClass('btn-danger');
	$('#operate-btns').children('button').not($(obj)).attr("disabled", true);
};

function disable_select(obj) {
	$('#select-all-btn').attr("disabled", true);
	$('#select-inverse-btn').attr("disabled", true);
	$(obj).removeClass('btn-danger');
	$('#operate-btns').children('button').not($(obj)).attr("disabled", false);
};

function f_delete() {
	var pics=$('.thumbnail').filter('.selected');
	var count=0;
	$.each(pics,function(key,val){
		$.post("",
		{
			'iid' : val.pic_id
 		},function(res){
			count+=1;
			if (count==pics.length){
				refresh_pic_content();
			}
		});
	});
};

function f_download() {
	var pics=$('.thumbnail').filter('.selected');
	$.each(pics,function(key,val){
		var elemIF=document_createElement_x('iframe');
		elemIF.src=val.children('img').src;
		elemIF.style.display='none';
		document.body.a(elemIF);
	});
};

function f_move() {

};