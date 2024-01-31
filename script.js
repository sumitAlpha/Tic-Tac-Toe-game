const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");
//variables 
let currentPlayer;
let gameGrid;
const winningPositions=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

//make a function for initalization of game
function initGame(){
  currentPlayer="X";
  gameGrid=["","","","","","","","",""];
  //UI par bhi update karna hoga
  boxes.forEach((box,index)=>{
    box.innerText="";
    boxes[index].style.pointerEvents="all";
    //one more thing missing
    box.classList = `box box${index+1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText=`Current Player-${currentPlayer}`;

}
//function call
initGame();


//function for swapTurn
function swapTurn(){
  if(currentPlayer==="X"){
    currentPlayer="O";
  }
  else{
    currentPlayer= "X";

  }
  gameInfo.innerText=`Current Player-${currentPlayer}`;
};

// sumit code
//function for checkGameover
function checkGameOver(){
  let answer="";
  winningPositions.forEach((position)=>{
    if((gameGrid[position[0]]!=="" ||gameGrid[position[1]]!==""|| gameGrid[position[2]]!="")
    &&(gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]])){
       //check if winner is X
       if(gameGrid[position[0]]==="X")
       answer="X";
       else{
        answer="0";
       }
       //disable pointer events
       boxes.forEach((box)=>{
        box.style.pointerEvents="none";
       });
        
       //now we know X/0 koi ek winner hoga
       boxes[position[0]].classList.add("win");
       boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");
    }
  });
   //it means we have winner
   if (answer !==""){
    gameInfo.innerText= `Winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return;
   }
    //if there is a tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
      if(box!=="")
      fillCount++;
    });
   // board is filled game is tied
     if(fillCount===9){
      gameInfo.innerText="Game Tied!";
      newGameBtn.classList.add("active");
     }
}; 

//function for handleClick
function handleClick(index){
  if(gameGrid[index]===""){
    //UI update karo
    boxes[index].innerText=currentPlayer;
    //gameGrid par bhi changes karo
    gameGrid[index]=currentPlayer;
    boxes[index].style.pointerEvents="none";
    //swap karo turn
    swapTurn();
    //check karo ki koi jeet toh nhi gaya na
    checkGameOver();
  }
};


//boxes ke uppr add eventlistner lgana hai
boxes.forEach((box,index)=>{
  box.addEventListener("click",()=>{
    handleClick(index);
  })
});

newGameBtn.addEventListener("click", initGame);


