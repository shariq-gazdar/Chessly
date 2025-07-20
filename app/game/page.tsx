"use client"
import { Chess } from 'chess.js';
import {  useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { Chessboard } from 'react-chessboard';

function page() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const level = searchParams.get("level");
    const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const boardOptions ={
    position : fen,
    onPieceDrop : onDrop
  }
  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((g) => {
      const updated = new Chess(g.fen());
      modify(updated);
      setFen(updated.fen());
      return updated;
    });
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    };

    let result = null;
    safeGameMutate((game) => {
      result = game.move(move);
    });

    return result !== null;
  }
  return (
  <div
  > <Chessboard  /></div>
  )
}

export default page
