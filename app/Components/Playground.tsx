"use client";
import React, { useState, useEffect } from "react";

import SolveButton from "./SolveButton";
import { isSafe, checkFault } from "@/utils/function";
import ClearButton from "./ClearButton";
const Playground = () => {
  type ChangeHandler = (gridIdx: number, idx: number, e: string) => void;

  let initialBoard = Array.from({ length: 9 }, () => Array(9).fill(-1));
  const [board, setBoard] =
    useState<Array<Array<number | string>>>(initialBoard);
  const [constant, setConstant] =
    useState<Array<Array<number | string>>>(initialBoard);
  const [solve, setSolve] = useState(false);
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);
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
    if (checkFault(boardData) == false) {
      return null;
    }
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
      setError(true);
      setSolve(true);
    } else {
      setBoard(result);
      setSolve(true);
    }
  };
  const clearBoard = () => {
    setConstant(initialBoard);
    setBoard(initialBoard);
    setSolve(false);
    setError(false);
  };

  return (
    <div className=" flex flex-col justify-evenly items-center gap-12 h-screen">
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-1  aspect-square border-4 border-gray-500 border-collapse">
          {[...Array(9)].map((row, gridIdx) => {
            return (
              <div
                className={`grid grid-cols-9  group  ${
                  (gridIdx + 1) % 3 === 0
                    ? `border-b-4 border-gray-500 `
                    : `border-none`
                } border-collapse max-w-fit last:border-b-0`}
                key={gridIdx}
              >
                {[...Array(9)].map((col, idx) => {
                  return (
                    <input
                      className={` ${
                        (idx + 1) % 3 === 0
                          ? `border-r-4 dark:border-black border-gray-500`
                          : ``
                      }  border-collapse text-[25px] text-black text-center font-bold aspect-square p-2  xl:max-w-[80px] xl:max-h-[80px] md:w-[50px] md:h-[50px] w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] ${
                        solve && typeof constant[gridIdx][idx] == "string"
                          ? `bg-sky-200`
                          : ` group-odd:odd:bg-gray-300 group-odd:even:bg-gray-200 group-even:even:bg-gray-300 group-even:odd:bg-gray-200 `
                      } ${
                        solve ? `pointer-events-none` : `pointer-events-auto`
                      } last:border-r-0`}
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
        <SolveButton solveSudoku={solveSudoku} disabled={solve} />
        <ClearButton clearBoard={clearBoard} />
      </div>
      {error && (
        <div
          className={`bg-red-100 border border-red-400 text-red-700 md:px-14 md:py-8  md:w-fit w-4/5 px-4 py-4 rounded absolute ${
            clicked
              ? `left-[-100%]`
              : `top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`
          } ${
            error
              ? `top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`
              : `left-[-100%]`
          } text-[20px]  transition-all duration-700`}
          role="alert"
        >
          <strong className="font-bold">Holy smokes! </strong>
          <span className="block sm:inline">
            Looks like that Sudoku puzzle cannot be solved
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => {
                setClicked(true);
                setError(false);
              }}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

export default Playground;
