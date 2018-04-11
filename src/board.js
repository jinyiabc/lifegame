import React, { Component } from 'react';
import {Startgame} from './startgame';
import { BoardSize } from './boardSize';

function Square(props) {

  //console.log(props.width);
  const width = props.width;
  if(width === 20 || width ===30 ) {
    return (
      <button style={{height:"20px",width:"20px"}}
        className="square" onClick={props.onClick} id={props.row.toString()+','+props.col.toString()}>
      </button>
    );
  } else if(width === 60){
    return (
      <button style={{height:"10px",width:"10px"}}
        className="square" onClick={props.onClick} id={props.row.toString()+','+props.col.toString()}>
      </button>
    );
  }

}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: null,
      isStart: false,
      width: 20,
      height: 20,
    };
    this.renderSquare = this.renderSquare.bind(this);
    this.nextOneGen = this.nextOneGen.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.boardSize = this.boardSize.bind(this);
    this.clear = this.clear.bind(this);

  }

componentWillMount(){
    const width = this.state.width;
    const height = this.state.height;
    const squares =  new Array(width).fill(null);
    squares.forEach(function(value,index,arr){
        arr[index] = Array(height).fill(0);
        console.log(index,arr[index]);
    });
    this.setState({squares:squares});
}

componentWillReceiveProps(nextProps){
}

componentWillUpdate(nextProps,nextState){

}

  handleClick(i,j) {

    const squares = this.state.squares.slice();
    squares[i][j] = 1;
    this.setState({
      squares: squares
  });
    if (squares[i][j] === 1){
    document.getElementById(i.toString()+','+j.toString()).style.backgroundColor = "lightpink";
  }
  }

  clear() {
    const squares = this.state.squares.slice();
    for( let i=0; i<squares.length; i++){
      for(let j=0; j<squares[i].length; j++){
        squares[i][j] = 0;
      }
    }
    this.setState({
      squares: squares,
      isStart: false,
  });
   const width = this.state.width;
   const height = this.state.height;
   nextGen(squares,width,height);
  }

  renderSquare(i,j) {
    const width = this.state.width;
    return (
      <Square
        value={this.state.squares[i][j]}
        row={i} col={j} id="myCell" width={width}
        onClick={() => this.handleClick(i,j)}
      />
  );
  }

  nextOneGen(){
    if(this.state.isStart){
        const squares = this.state.squares.slice();
        const width = this.state.width;
        const height = this.state.height;
        const test = nextGen(squares,width,height);
        this.setState({squares:test});
        //console.log(test);
      }
  }
  toggleStart() {
    this.setState({
      isStart: !this.state.isStart
    });
  }

  boardSize(width,height) {
    this.clear();
    this.setState({
      width: width,
      height:height,
    });

    const squares =  new Array(width).fill(null);
    squares.forEach(function(value,index,arr){
        arr[index] = Array(height).fill(0);
        //console.log(index,arr[index]);
    });
    this.setState({squares:squares});
    //console.log(this.state.width);
    if(width === 20){
      document.getElementById("myTable").style.width="380px";
    } else if (width === 30) {
      document.getElementById("myTable").style.width="950px";
    } else if (width === 60){
      document.getElementById("myTable").style.width="727px";
    }

  }



  render() {
   const squares = this.state.squares;
   const width = this.state.width;
   const board = new Array(width);
   for(let i=0; i<squares.length; i++){

        board[i] = squares[i].map((item,j)=>
            <span key={i.toString()+j.toString()}>
                {this.renderSquare(i,j)}

            </span>
        );
   }
//======defien toggle button
   let button;
if (this.state.isStart) {
  button = (
    <Startgame toggle={this.toggleStart} nextOneGen={this.nextOneGen} />
  );
} else {
  button = (
    <button onClick={this.toggleStart}>
      Start
    </button>
  );
}
   /*let board_size;
  //if (this.state.isStart){
    board_size = (
<BoardSize toggle={this.boardSize(20,50)} value={'20x50'} />
);
//}*/


    return (
      <div className="board-row" id="myTable">
          {board}
          <div>{button}</div>
          <div><button onClick={this.clear}>Clear</button></div>
          <div><BoardSize  width={20} height={20}
          boardSize={this.boardSize} value={'20x20'}/></div>
          <div><BoardSize  width={30} height={50}
          boardSize={this.boardSize} value={'30x50'}/></div>
          <div><BoardSize  width={60} height={80}
          boardSize={this.boardSize} value={'60x80'}/></div>


      </div>
    );
  }
}


export default Board;

// ========================================

function nextGen(squares,width,height) {
  const result =  new Array(width).fill(null);
  result.forEach(function(value,index,arr){
      arr[index] = Array(height).fill(0);
  });
  const newSquare =  new Array(width).fill(null);
  newSquare.forEach(function(value,index,arr){
      arr[index] = Array(height).fill(0);
  });

  const square = squares.slice();
  const row = squares.length;
  const col = squares[0].length;

  for (let i = 0; i < row; i++) {
    for (let j=0; j< col; j++){
       result[i][j] = square[evalrow(i-1,row)][evalcol(j-1,col)]+square[evalrow(i-1,row)][evalcol(j,col)]+
square[evalrow(i-1,row)][evalcol(j+1,col)]+square[evalrow(i,row)][evalcol(j-1,col)]+
square[evalrow(i,row)][evalcol(j+1,col)]+square[evalrow(i+1,row)][evalcol(j-1,col)]+
square[evalrow(i+1,row)][evalcol(j,col)]+square[evalrow(i+1,row)][evalcol(j+1,col)];

      if(result[i][j] === 3 || (result[i][j] === 2 && square[i][j] === 1 )) {
        newSquare[i][j] = 1;
        if(square[i][j] === 0){
        document.getElementById(i.toString()+','+j.toString()).style.backgroundColor = "lightpink";
      } else {
        document.getElementById(i.toString()+','+j.toString()).style.backgroundColor = "red";
      }
      } else {
        newSquare[i][j] = 0;
        document.getElementById(i.toString()+','+j.toString()).style.backgroundColor = "white";

      }
    }
  }
  return newSquare;
}

function evalrow(i,row){
  if(i<0){
    i = (i+row)%row;
  } else if(i>row-1){
    i = i%row;
  }
  return i;
}

function evalcol(j,col){
  if(j<0){
    j = (j+col)%col;
  } else if(j>col-1){
    j = j%col;
  }
  return j;
}
