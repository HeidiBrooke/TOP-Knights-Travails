
const gameNode = (position, moves) => {
    position,
    coordinate = gameBoardPositions[position];
    moves,
    last = null;

    return {position, coordinate, moves, last}
}

const gameBoardPositions = [];
for(let j = 0; j < 8; j++){
    for(let i = 0; i < 8; i++){
    gameBoardPositions.push([j, i]);
}
}
//console.log(gameBoardPositions);

function verifyMove(coord) {
    let includes = false;
   gameBoardPositions.forEach(elem => {
    if((elem[0] == coord[0]) && (elem[1] == coord[1])){
        includes =  true;
    }})
    return includes;
}

function getIndex(coord){
    let theMove;
    gameBoardPositions.forEach(elem => {
        if((elem[0] == coord[0]) && (elem[1] == coord[1])){
            theMove = gameBoardPositions.indexOf(elem);
        }})
        return theMove;
}

const genMoves = (coordinate) => {
    const allMoves = [];
    let aMove;
    let thisMove = [coordinate[0]-2, coordinate[1] - 1];
    if(verifyMove(thisMove)){
        aMove = getIndex(thisMove);
        allMoves.push(aMove);
    }
    thisMove = [coordinate[0]-2, coordinate[1] + 1];
    if(verifyMove(thisMove)){
        aMove = getIndex(thisMove);
        allMoves.push(aMove);
    }
    thisMove = [coordinate[0]-1, coordinate[1] + 2];
    if(verifyMove(thisMove)){
        aMove = getIndex(thisMove);
        allMoves.push(aMove);
    }
    thisMove = [coordinate[0]+1, coordinate[1] + 2];
    if(verifyMove(thisMove)){
        aMove = getIndex(thisMove);
        allMoves.push(aMove);
    }
    thisMove = [coordinate[0]+2, coordinate[1] + 1];
    if(verifyMove(thisMove)){
        aMove = getIndex(thisMove);
        allMoves.push(aMove);
    }
    thisMove = [coordinate[0]+2, coordinate[1] - 1];
    if(verifyMove(thisMove)){
        aMove = getIndex(thisMove);
        allMoves.push(aMove);
    }
    thisMove = [coordinate[0]+1, coordinate[1] - 2];
    if(verifyMove(thisMove)){
        aMove = getIndex(thisMove);
        allMoves.push(aMove);
    }
    thisMove = [coordinate[0]-1, coordinate[1] - 2];
    if(verifyMove(thisMove)){
        aMove = getIndex(thisMove);
        allMoves.push(aMove);
    }
    return allMoves;
}

const gameNodes = [];
gameBoardPositions.forEach(coordinate => {
    let pos = gameBoardPositions.indexOf(coordinate);
    let moves = genMoves(coordinate);
    let node = gameNode(pos, moves);
    gameNodes.push(node);
})

function makeMovesNodes(gameNodes){
    gameNodes.forEach(node => {
        node.moves.forEach(move => {
            let index = node.moves.indexOf(move);
            node.moves[index] = gameNodes[move];
        })
    })
}

makeMovesNodes(gameNodes);

function printPath(nodeArray){
    console.log(`The shortest path is from: ${nodeArray[0].coordinate} to ${nodeArray[nodeArray.length-1].coordinate} is from:`);
    for(let i = 0; i<nodeArray.length-1; i++){
        console.log(`${nodeArray[i].coordinate} to `);
    }
    console.log(nodeArray[nodeArray.length-1].coordinate + '.')
}

function printQ(nodeArray){
    let printArray = [];
    nodeArray.forEach(node => {
        printArray.push(node.position);
    })
    console.log(printArray);
}

function retracePath(startNode, endNode){
    let path = [endNode];
    let reversePath = [];
    let currentNode = endNode;
    while(currentNode !== startNode){
        path.push(currentNode.last);
    currentNode = currentNode.last;
    }
    let length = path.length;
    for(let i = 0; i < length; i++){
        reversePath.push(path.pop());
    }
    return reversePath;
}

function kmBFS(eNode, qArray, pathArray){
    currentNode = qArray.shift();
    if(currentNode == eNode){
        return;
    }
    else{
        pathArray.push(currentNode);
        currentNode.moves.forEach(move => {
            if(!pathArray.includes(move)){
                qArray.push(move);
                move.last = currentNode;
            } 
        })
        kmBFS(eNode, qArray, pathArray);
    }
}


function knightMoves(startPoint, endPoint){
    let sNode;
    let eNode;
    let qArray = [];
    let path = [];
    let endPath = [];
    if(!(verifyMove(startPoint) && verifyMove(endPoint))){
        return 'that move is not on the board. Please try again.'
    }
    else{
        sNode = gameNodes[getIndex(startPoint)];
        eNode = gameNodes[getIndex(endPoint)];
        qArray.push(sNode);
        // for(let i = 0; i < 10; i++){
        //     kmBFS(eNode, qArray, pathArray);
        // }
        kmBFS(eNode, qArray, path);
        //return kmBFS(eNode, qArray, pathArray);
        //console.log(endPath);
        path = retracePath(sNode, eNode); 
    }
    printPath(path);
}

knightMoves([0, 0], [7, 0]);
knightMoves([0, 0], [7, 7]);
knightMoves([3, 3], [4, 4]);
    


