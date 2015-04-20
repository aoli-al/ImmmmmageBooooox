

function changeText(content)
{
    $("#currentState").attr("value",content);

}

function over1()
{
    document.getElementById("toLeft").style.visibility="hidden";
}
function out1()
{
    document.getElementById("toLeft").style.visibility="visible";
}
function over2()
{
    document.getElementById("toRight").style.visibility="hidden";
}
function out2()
{
    document.getElementById("toRight").style.visibility="visible";
}