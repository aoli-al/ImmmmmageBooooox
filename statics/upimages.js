$(document).ready(function(){
    var button = $('#upload-btn'), interval;
    var fileType = "pic",fileNum = "more"; 

    new AjaxUpload(button,{
        action: '/images/upload_image/',
        /*data:{
            'buttoninfo':button.text()
        },*/
        name: 'file',
        onSubmit : function(file, ext){
            
            if(fileType == "pic")
            {
                ext=ext.toLowerCase();
                var folder_id=$('#jstree').jstree('get_selected');
                if (ext && /^(jpg|png|jpeg|gif)$/.test(ext)){
                    this.setData({
                        'fid': folder_id[0]
                    });
                } else {
                    alert('非图片类型文件，请重传');
                    return false;               
                }
            }
                         
            button.text('Uploading');
             
            if(fileNum == 'more')
                this.disable();
             
                interval = window.setInterval(function(){
                var text = button.text();
                if (text.length < 14){
                    button.text(text + '.');                    
                } else {
                    button.text('Uploading');             
                }
            }, 200);
        },
        onComplete: function(file, response){
            refresh_pic_content(current_fldr_id);
            if(response.code!=0)
                //alert(response.message);
                 
            button.html('<span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>Upload');
                         
            window.clearInterval(interval);
                         
            this.enable();
             
            if(response == "success");
                //alert(file);                  
        }
    });
  
});
