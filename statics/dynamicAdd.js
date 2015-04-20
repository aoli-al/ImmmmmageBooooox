var name1=['User1','User2','User3','User4','User5','User6','User7'];

$(document).ready(function(){
    for(var i = 0;i < 7;i++)
    {
        $("#pickUser").append("<button type='button' role='group' class='btn btn-default'  aria-expanded='false'><input type='checkbox'> "+name1[i]+"</button>");

    }
});

$(document).ready(function(){
    for(var i = 0;i < 7;i++)
    {
        $("#ch_pickUser").append("<li><a onclick=changeText('"+name1[i]+"') id='text4'>"+name1[i]+"</a></li>");
    }
});



