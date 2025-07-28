"use client";
import { Chess, Square } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import type {
  ChessboardOptions,
  PieceDropHandlerArgs,
  SquareHandlerArgs,
} from "react-chessboard";

function Page() {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});
  const [playerColor, setPlayerColor] = useState<"w" | "b">("w");

  useEffect(() => {
    const isWhite = Math.random() < 0.5;
    const color = isWhite ? "w" : "b";
    setPlayerColor(color);

    setTimeout(() => {
      const botColor = color === "w" ? "b" : "w";
      if (chessGame.turn() === botColor) {
        makeRandomMove();
      }
    }, 200);
  }, []);

  function makeRandomMove() {
    if (chessGame.isGameOver()) return;

    const botColor = playerColor === "w" ? "b" : "w";
    // if (chessGame.turn() !== botColor) return;

    const possibleMoves = chessGame.moves();
    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    chessGame.move(randomMove);
    setChessPosition(chessGame.fen());

    if (chessGame.isCheckmate()) {
      alert("Checkmate! You lost.");
    }
  }

  function getMoveOptions(square: Square) {
    const moves = chessGame.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, React.CSSProperties> = {};
    for (const move of moves) {
      newSquares[move.to] = {
        background:
          chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.2) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.2) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    }

    newSquares[square] = { background: "rgba(255, 255, 0, 0.4)" };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick({ square, piece }: SquareHandlerArgs) {
    if (chessGame.turn() !== playerColor) return;

    if (!moveFrom && piece) {
      const hasMoveOptions = getMoveOptions(square as Square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    const foundMove = chessGame
      .moves({ square: moveFrom as Square, verbose: true })
      .find((m) => m.to === square);

    if (!foundMove) {
      const hasMoveOptions = getMoveOptions(square as Square);
      setMoveFrom(hasMoveOptions ? square : "");
      return;
    }

    try {
      chessGame.move({ from: moveFrom, to: square, promotion: "q" });
      setChessPosition(chessGame.fen());
      setMoveFrom("");
      setOptionSquares({});

      if (chessGame.isCheckmate()) {
        alert("You win! Checkmate.");
        return;
      }

      setTimeout(makeRandomMove, 300);
    } catch {
      setMoveFrom("");
      setOptionSquares({});
    }
  }

  function onPieceDrop({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs): boolean {
    if (!targetSquare) return false;

    try {
      const move = chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (move) {
        setChessPosition(chessGame.fen());
        setMoveFrom("");
        setOptionSquares({});

        if (chessGame.isCheckmate()) {
          alert("You win! Checkmate.");
          return true;
        }

        setTimeout(makeRandomMove, 300);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  const chessboardOptions: ChessboardOptions = {
    onPieceDrop,
    onSquareClick,
    position: chessPosition,
    squareStyles: optionSquares,
    id: "click-or-drag-to-move",
    boardOrientation: playerColor === "w" ? "white" : "black",
    boardStyle: { width: 500 },
  };

  return (
    <div className="flex justify-center my-10">
      <Chessboard options={chessboardOptions} />
    </div>
  );
}

export default Page;
