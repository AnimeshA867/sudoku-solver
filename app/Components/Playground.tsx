"use client";
import React, { useState, useEffect } from "react";

import SolveButton from "./SolveButton";
import { isSafe } from "@/utils/function";
import ClearButton from "./ClearButton";
const Playground = () => {
  type ChangeHandler = (gridIdx: number, idx: number, e: string) => void;

  let initialBoard = Array.from({ length: 9 }, () => Array(9).fill(-1));
  const [board, setBoard] =
    useState<Array<Array<number | string>>>(initialBoard);
  const [constant, setConstant] =
    useState<Array<Array<number | string>>>(initialBoard);
  const [solve, setSolve] = useState(false);
  let newBoard: any;
  const handleChange: ChangeHandler = (i, j, value) => {
    // const newBoard = [...board];
    newBoard = [...board];
    newBoard[i][j] = value;
    setConstant(newBoard);
    setBoard(newBoard);
  };
  useEffect(() => {
    console.log(board);
  }, [board]);
  const solveFunction = (boardData: any, row: number, col: number): any => {
    let board = [...boardData];
    if (row == 8 && col == 9) {
      return true;
    }

    if (col == 9) {
      row++;
      col = 0;
    }

    if (board[row][col] > 0) {
      return solveFunction(board, row, col + 1);
    }

    for (let num = 1; num <= 9; num++) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (solveFunction(board, row, col + 1)) {
          return board;
        }
      }
      board[row][col] = -1;
    }
    return null;
  };

  const solveSudoku = () => {
    console.log(typeof "1");
    let result = solveFunction(board, 0, 0);
    if (result == null) {
      setSolve(false);
    } else {
      setBoard(result);
      setSolve(true);
    }
  };
  const clearBoard = () => {
    setConstant(initialBoard);
    setBoard(initialBoard);
    setSolve(false);
  };

  return (
    <div className=" flex flex-col justify-evenly items-center gap-12 h-screen">
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-1  aspect-square ">
          {[...Array(9)].map((row, gridIdx) => {
            return (
              <div
                className={`grid grid-cols-9  group  ${
                  (gridIdx + 1) % 3 === 0
                    ? `border-b-4 border-black`
                    : `border-none`
                } border-collapse max-w-fit`}
                key={gridIdx}
              >
                {[...Array(9)].map((col, idx) => {
                  return (
                    <input
                      className={` ${
                        (idx + 1) % 3 === 0 ? `border-r-4 border-black` : ``
                      }  border-collapse text-[25px] text-black text-center font-bold aspect-square p-2  xl:max-w-[80px] xl:max-h-[80px] md:w-[50px] md:h-[50px] w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] ${
                        solve && typeof constant[gridIdx][idx] == "string"
                          ? `bg-sky-200`
                          : ` group-odd:odd:bg-gray-300 group-odd:even:bg-gray-200 group-even:even:bg-gray-300 group-even:odd:bg-gray-200  ${
                              solve
                                ? `pointer-events-none`
                                : `pointer-events-auto`
                            }`
                      }`}
                      key={idx}
                      // type="string"
                      maxLength={1}
                      value={
                        board[gridIdx][idx] !== -1 ? board[gridIdx][idx] : ""
                      }
                      onChange={(e) => {
                        let val = e.target.value;
                        handleChange(gridIdx, idx, val);
                      }}
                    ></input>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:w-1/2 lg:w-1/5 w-1/2 sm:w-1/3 gap-8 place-items-center justify-items-center ">
        <SolveButton solveSudoku={solveSudoku} />
        <ClearButton clearBoard={clearBoard} />
      </div>
    </div>
  );
};

export default Playground;
