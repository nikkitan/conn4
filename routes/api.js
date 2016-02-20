var _global=require('../globals.js');


exports.onNewGame = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  res.send(JSON.stringify({ result: 'success!', active_player:1}));
};

function getNeighbor(board, playerID, x, y, dirX, dirY){
  console.log('[getNeigh_X]:' + x);
  console.log('[getNeigh_Y]:' + y);
  console.log('[getNeigh_PID]:' + playerID);

  var neighbors = [];
  var n;
  var prevX = x;
  var newX = prevX;
  var prevY = y;
  var newY = prevY;
  for(var i = 0; i < 4; ++i){
    if(newX + dirX > -1 && newX + dirX < 7){
      prevX = newX;
      newX += dirX;
    }
    if(newY + dirY > -1 && newY + dirY < 7){
      prevY = newY;
      newY += dirY;
    }
    if(prevX != newX || prevY != newY){
      prevX = newX;
      prevY = newY;
      console.log('[getNeib_NEIB['+newX+']['+newY+']]:' + board[newX][newY]);
      if(board[newX][newY] == playerID){
        n=[newX,newY];
        neighbors.push(n);
      }
    }
  }
  return neighbors;
  
}

exports.onPlayerClick = function (req, res){
  
  var data = JSON.parse(req.body.json);
  var curPlayer = data.active_player;
  var board = data.board;
  console.log('[onClick]:' + JSON.stringify(board));
  var x = parseInt(data.x);
  var y = parseInt(data.y);
  var verticalNeighbors = getNeighbor(board,curPlayer,x,y,0,1);
  console.log('[VERT]:' + verticalNeighbors);
  var leftHorizontalNeighbors = getNeighbor(board,curPlayer,x,y,-1,0);
  console.log('[LEFT_HORZ]:' + leftHorizontalNeighbors);
  var rightHorizontalNeighbors = getNeighbor(board,curPlayer,x,y,1,0);
  console.log('[RIGHT_HORZ]:' + rightHorizontalNeighbors);
  var leftDiagNeighbors = getNeighbor(board,curPlayer,x,y,-1,1);
  console.log('[-1,1_DIAG]:' + leftDiagNeighbors);
  var rightDiagNeighbors = getNeighbor(board,curPlayer,x,y,1,1);
  console.log('[1,1_DIAG]:' + rightDiagNeighbors);
  data = {};
  data.active_player = curPlayer;
  
  if(verticalNeighbors.length >= 3){
    data.foundWin = 1;
  }else if(leftHorizontalNeighbors.length >= 3){
    data.foundWin = 1;
  }else if(rightHorizontalNeighbors.length >= 3){
    data.foundWin = 1;
  }else if(leftDiagNeighbors.length >= 3){
    data.foundWin = 1;
  }else if(rightDiagNeighbors.length >= 3){
    data.foundWin = 1;
  }
  res.setHeader('Content-Type', 'application/json');
  
  res.send(JSON.stringify(data));  
}