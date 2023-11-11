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
 