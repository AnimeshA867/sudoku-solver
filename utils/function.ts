  export const isSafe = (
    board: number[][],
    row: number,
    col: number,
    num: number
  ): boolean => {

    
    for (let x = 0; x <= 8; x++) {
      if (board[row][x] == num) {
        return false;
      }
    }
    for (let x = 0; x <= 8; x++) {
      if (board[x][col] == num) {
        return false;
      }
    }
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] == num) {
          return false;
        }
      }
    }
    return true;
  };


  export const checkFault=(board:any)=>{
    console.log(board);
    for(let i=0;i<9;i++){
        let obj:{[key:number]:number}={
           1:0,
           2:0,
           3:0,
           4:0,
           5:0,
           6:0,
           7:0,
           8:0,
           9:0,
         }
        for(let j=0;j<9;j++){
          if(board[i][j]!==-1){

            obj[board[i][j]]++;
          }
        }
        console.log(obj);
        for(let a in obj ){
          if(obj[a]>=2){
            return false;
          }
        }
      }
      for(let i=0;i<9;i++){
        let obj:{[key:number]:number}={
          1:0,
          2:0,
          3:0,
          4:0,
          5:0,
          6:0,
          7:0,
          8:0,
          9:0,
        }
        for(let j=0;j<9;j++){
          if(board[j][i]!==-1){
            
            obj[board[j][i]]++;
          }
        }
        console.log(obj);
        for(let a in obj){
          if(obj[a]>=2){
            return false;
          }
        }
      }
        
      

    
    

    for(let a=0;a<7;a=a+3){
    for(let b=0;b<7;b=b+3){
     let obj:{[key:number]:number}={
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
      }
        for (let i = a; i < a+3; i++) {
            for (let j = b; j < b+3; j++) {
                let val:number=board[i][j];
                   obj[val]++; 
                   
            }
        }

    
        for(let i=1;i<=9;i++){
          if(obj[i]>=2){
            return false;
          }
        }
  }
  
} 
return true;
} 