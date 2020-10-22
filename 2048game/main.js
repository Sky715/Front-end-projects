//定义javascript数组
var board = new Array();

var hasConflicted = new Array();

var score = 0;

$(function(){
    newgame();
});

function newgame(){
    score = 0;
    updateScore(0);
    $("#gridcontainer").remove();
    //初始化棋盘格
    init();
    //生成两个随机位置的随机数字
    generateOneNumber();
    generateOneNumber();
}

function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

function init(){
    for(var i=0; i<4; i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j=0; j<4; j++){
            //初始化小格子的值为0
            board[i][j] = 0;
            hasConflicted[i][j] = false;
            var gridCell = $("#grid-cell-"+i+"-"+j);
            //设置每个格子到顶端、左端的距离
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    updateBoardView();
}

//初始化数字格
function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j); 
            //若棋盘格值为0，设置数字格宽高均为0
            if(board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            }
            //若棋盘格的值不为0的话，设置数字格的高宽为75并设置背景色和前景色以及数字值
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
}

//生成一个随机位置的随机数字
function generateOneNumber(){
    //生成随机位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0) {
            break;
        }
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));
        times ++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0 ; j < 4; j++) {
                if(board[i][j] == 0) {
                    var randx = i;
                    var randy = j;
                }
            }
        }
    }
    //生成随机数字（新生成的数字只能是2或4）
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置上显示随机数字
    board[randx][randy] = randNumber;
    ShowNumberWithAnimation(randx, randy, randNumber);
}