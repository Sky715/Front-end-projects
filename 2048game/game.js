$(document).keydown(function (event){  //event是keydown事件自带的
    switch(event.keyCode) {
        case 37: //left
            //moveLeft()方法
            //完成向左移动的逻辑
            //返回值为Boolean类型，判断是否可以左移
            if(moveLeft()) {
                setTimeout("generateOneNumber();", 210);
                setTimeout("isgameover();", 300);
            }
            break;
        case 38: //up
            if(moveUp()) {
                setTimeout("generateOneNumber();", 210);
                setTimeout("isgameover();", 300);
            }
            break;
        case 39: //right
            if(moveRight()) {
                setTimeout("generateOneNumber();", 210);
                setTimeout("isgameover();", 300);
            }
            break;
        case 40: //down
            if(moveDown()) {
                setTimeout("generateOneNumber();", 210);
                setTimeout("isgameover();", 300);
            }
            break;
        default :
            break;
    }
});

function moveLeft(){
    //判断是否可以左移
    if(!canMoveLeft(board)) {
        //当前格子无法移动
        return false;
    }
    //完成向左移动的逻辑
    for (var i=0; i<4; i++) {
        //第一列无法左移，j从1开始
        for(var j=1; j<4; j++) {
            //当前数字格是有值的（2、4...，必不为0）
            if(board[i][j] != 0) {
                //向左移动的逻辑
                for(var k=0; k<j; k++) {
                    if(board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
                        //可以向左移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board) && !hasConflicted[i][k]) {
                        //可以向左移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //叠加分数
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();", 200);
    return true;
}

function moveUp() {
    //判断是否可以上移
    if(!canMoveUp(board)) {
        //当前格子无法移动
        return false;
    }
    //完成向上移动的逻辑
    //第一行无法上移，i从1开始
    for (var i=1; i<4; i++) {
        for(var j=0; j<4; j++) {
            //当前数字格是有值的（2、4...，必不为0）
            if(board[i][j] != 0) {
                //向上移动的逻辑
                for(var k=0; k<i; k++) {
                    if(board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
                        //可以向上移动
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if(board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasConflicted[i][k]) {
                        //可以向上移动
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //叠加分数
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();", 200);
    return true;
}

function moveRight(){
    //判断是否可以右移
    if(!canMoveRight(board)) {
        //当前格子无法移动
        return false;
    }
    //完成向右移动的逻辑
    for (var i=0; i<4; i++) {
        //第四列无法右移，j<3
        for(var j=0; j<3; j++) {
            //当前数字格是有值的（2、4...，必不为0）
            if(board[i][j] != 0) {
                //向右移动的逻辑
                for(var k=j+1; k<4; k++) {
                    if(board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
                        //可以向右移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !hasConflicted[i][k]) {
                        //可以向右移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //叠加分数
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();", 200);
    return true;
}

function moveDown() {
    //判断是否可以下移
    if(!canMoveDown(board)) {
        //当前格子无法移动
        return false;
    }
    //完成向下移动的逻辑
    //第四行无法下移，i<3
    for (var i=0; i<3; i++) {
        for(var j=0; j<4; j++) {
            //当前数字格是有值的（2、4...，必不为0）
            if(board[i][j] != 0) {
                //向下移动的逻辑
                for(var k=i+1; k<4; k++) {
                    if(board[k][j] == 0 && noBlokHorizontalRow(k, i, j, board)) {
                        //可以向下移动
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if(board[k][j] == board[i][j] && noBlokHorizontalRow(k, i, j, board) && !hasConflicted[i][k]) {
                        //可以向下移动
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //叠加分数
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();", 200);
    return true;
}

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><p>"+score+"</p><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}