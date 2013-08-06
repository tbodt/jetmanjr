speedUp=function(){
    ig.game.movetimer.set(0.05);
};

speedDown=function(){
    ig.game.movetimer.set(0.95);
};

saveBoard=function(){
    if(undefined !== ig.game.storage){
    ig.game.storage.set('gboard',ig.game.board);
    ig.game.storage.set('minutes',ig.game.minutes);
    ig.game.storage.set('seconds',ig.game.seconds);
    }
};

startGame=function(){
    ig.system.setGame(SuperChess);
    ig.system.restoreGame=false;  
    $(".alertify-dialog").css('zIndex','-999999');
};

restoreBoard=function(){
    $(".alertify-dialog").css('zIndex','-999999');
    ig.system.setGame(SuperChess);
    ig.system.restoreGame=true;  
};

function buttonPos(){
    var padding=11.5;
    //var leftPos=$("#canvas").css("marginLeft");

    var leftNumericPos=parseInt($("#canvas").css("marginLeft").replace(/[^-\d\.]/g, ''),10);
    if(leftNumericPos===0) leftNumericPos=$("#canvas").css("left").replace(/[^-\d\.]/g, '');

    var midpos=(($("#canvas").css("width").replace(/[^-\d\.]/g, '')),10)+45;

/*
    $(".btnStart").css("display","none");
    $(".btnStart").css("left",leftNumericPos+"px");
    $(".btnStart").fadeIn('slow');

    var newlen=parseFloat(padding,10)+parseInt(leftNumericPos,10)+parseInt($(".btnStart").css("width").replace(/[^-\d\.]/g, ''),10);
    $(".saveboard").css("display","none");
    $(".saveboard").css("left",newlen+"px");
    $(".saveboard").fadeIn('slow');
    newlen+=parseFloat(padding,10)+parseInt($(".saveboard").css("width").replace(/[^-\d\.]/g, ''),10);
    $(".restoreboard").css("display","none");
    $(".restoreboard").css("position","absolute");

    $(".restoreboard").css("left",newlen+"px");
    $(".restoreboard").fadeIn('slow');
    newlen+=parseFloat(padding,10)+parseInt($(".restoreboard").css("width").replace(/[^-\d\.]/g, ''),10);
    $(".speedUp").css("display","none");
    $(".speedUp").css("left",newlen+"px");
    $(".speedUp").fadeIn('slow');
    newlen+=parseFloat(padding,10)+parseInt($(".speedUp").css("width").replace(/[^-\d\.]/g, ''),10);
    $(".speedDown").css("display","none");
    $(".speedDown").css("left",newlen+"px").fadeIn('slow', function() {});
    $(".speedDown").fadeIn('slow');
*/
    $("#bottom").css("display","none");
    $("#bottom").css("top",((canvas.height)+160)+"px");
//    $("#bottom").css("left",(((document.width)/2)-120)+"px");
    $("#blurb").css("zIndex","9999");
    $("#bottom").css("zIndex","9999");
    $("#bottom").fadeIn('slow');
    $("#blurb").css("display","none");
    //$("#blurb").css("top",((canvas.height)+185)+"px");


    $("#blurb").css("left",(((document.width)/2)-160)+"px");
    $("#blurb").fadeIn('slow');
    $("#canvas").css("height","80%");
    $("#canvas").css("width","95%");
    $("#canvas").fadeIn('slow');
    $("#canvas").css('zIndex','-9999');

}

//   $(document).ready(buttonPos);
$(window).resize(buttonPos);
$(window).load(buttonPos);

$(document).ready(function() {
    buttonPos();


});
