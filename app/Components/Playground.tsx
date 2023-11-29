"use client";
import React, { useState, useEffect } from "react";

import SolveButton from "./SolveButton";
import { isSafe, checkFault } from "@/utils/function";
import ClearButton from "./ClearButton";
const Playground = () => {
  type ChangeHandler = (gridIdx: number, idx: number, e: string) => void;
  type removeHandler = (gridIdx: number, idx: number) => void;

  let initialBoard = Array.from({ length: 9 }, () => Array(9).fill(-1));
  const [board, setBoard] =
    useState<Array<Array<number | string>>>(initialBoard);
  const [constant, setConstant] =
    useState<Array<Array<number | string>>>(initialBoard);
  const [solve, setSolve] = useState(false);
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  let newBoard: any;
  const handleChange: ChangeHandler = (i, j, value) => {
    // const newBoard = [...board];
    newBoard = [...board];
    newBoard[i][j] = value;
    setConstant(newBoard);
    setBoard(newBoard);
  };
  const removeBoardData: removeHandler = (i, j) => {
    // const newBoard = [...board];
    newBoard = [...board];
    newBoard[i][j] = "";
    setConstant(newBoard);
    setBoard(newBoard);
  };

  const solveFunction = (boardData: any, row: number, col: number): any => {
    setLoading(true);
    if (checkFault(boardData) == false) {
      return null;
    } else {
      const board = [...boardData];
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
    }
  };

  const solveSudoku = () => {
    console.log(typeof "1");
    let result = solveFunction(board, 0, 0);
    if (result == null) {
      setError(true);
      // setSolve(true);
    } else {
      setBoard(result);
    }
    setSolve(true);
    setLoading(false);
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
        {loading && (
          <div
            role="status"
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
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
                      } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-collapse text-[15px] sm:text-[25px] text-black text-center font-bold aspect-square p-2  xl:max-w-[80px] xl:max-h-[80px] md:w-[50px] md:h-[50px] w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] transition-all duration-300  rounded-none ${
                        solve && typeof board[gridIdx][idx] == "string"
                          ? `bg-sky-200`
                          : `group-odd:odd:bg-gray-300 group-odd:even:bg-gray-200 group-even:even:bg-gray-300 group-even:odd:bg-gray-200`
                      } ${
                        error && typeof board[gridIdx][idx] == "string"
                          ? `bg-red-200`
                          : ``
                      } ${
                        solve ? `pointer-events-none` : `pointer-events-auto`
                      } last:border-r-0`}
                      key={idx}
                      type="tel"
                      min={1}
                      max={9}
                      maxLength={1}
                      pattern="[1-9]"
                      inputMode="numeric"
                      value={
                        board[gridIdx][idx] !== -1 ? board[gridIdx][idx] : ""
                      }
                      onChange={(e) => {
                        let val = e.target.value;
                        if (parseInt(val) >= 1 && parseInt(val) <= 9) {
                          handleChange(gridIdx, idx, val);
                        } else if (val == "Backspace") {
                          removeBoardData(gridIdx, idx);
                        }
                        return;
                      }}
                    ></input>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:w-1/2 xl:w-1/5 lg:w-2/5 w-1/2 sm:w-1/3 gap-8 place-items-center justify-items-center ">
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
            error && solve
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
                setSolve(false);
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
