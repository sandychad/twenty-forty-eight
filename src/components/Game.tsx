import React, {useEffect, useState, useRef} from 'react';
import Board, { ShiftDirection } from '../models/Board';
import Square from './Square';


const Game: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const boardRef = useRef<number[][]>();
    boardRef.current = board;
    

    const handleKeyUp = (e: KeyboardEvent) => {
        e.preventDefault();
        let direction: ShiftDirection | null = null;

        switch (e.key) {
            case "ArrowLeft":
                console.log("left");
                direction = ShiftDirection.Left;
                break;
            case "ArrowRight":
                console.log("right");
                direction = ShiftDirection.Right;
                break;
            case "ArrowUp":
                console.log("up");
                direction = ShiftDirection.Up;
                break;
            case "ArrowDown":
                console.log("down");
                direction = ShiftDirection.Down;
                break;
            default:
        }

        if (direction) {
            const newBoard  = Board.moveGrid(boardRef.current!.slice(), direction);
            setBoard(newBoard);
        }
    }

    useEffect(() => {
        setBoard(Board.getGrid());
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            setBoard([]);
            window.removeEventListener('keyup', handleKeyUp, true);
        }
    }, []);


    return (
     <>
        {
            board?.map((row, x) => {
                return (
                    <div key={x} className={"row row-" + x.toString()}>
                        {
                            row.map((value, y) => {
                                return (
                                    <div key={y} className={"col col-" + y.toString()}>
                                        <Square position={x * 4 + y} value={value} />
                                    </div>
                                )
                            })
                        }
                    </div>
            )})
        }
     </>   
    )
}

export default Game;