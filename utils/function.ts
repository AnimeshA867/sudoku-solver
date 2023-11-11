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
    for(let i=0;i<9;i++){
        let arr=board[i].sort();
        for(let j=0;j<9;j++){
            if(arr[j]==arr[j+1]){
                return false;
            }
        }
    }
    for(let a=0;a<7;a+3){

        for (let i = a; i < a+3; i++) {
            for (let j = a; j < a+3; j++) {
                const currentRow = 0 + i;
                const currentCol = 0 + j;
                for(let k=1;k<=9;k++){
                    
                    if (board[currentRow][currentCol] === k) {
                        return false; // Number is repeated in the grid
                    }
                }
            }
        }
  }
  
    return true;
 }