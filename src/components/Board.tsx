import React, {useEffect, useState, useRef} from 'react';
import Game, { ShiftDirection } from '../models/Game';
import Square from './Square';

interface BoardProps {
    addToScore: (points: number) => void;
}

const Board: React.FC<BoardProps> = ({addToScore}) => {
    const [game, setGame] = useState<number[][]>([]);
    const gameRef = useRef<number[][]>();
    gameRef.current = game;


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
            const {newGrid, newScore}  = Game.moveGrid(gameRef.current!.slice(), direction);
            setGame(newGrid);
            addToScore(newScore);            
        }
    }

    useEffect(() => {
        setGame(Game.getGrid());
        window.addEventListener('keyup', handleKeyUp, true);

        return () => {
            setGame([]);
            window.removeEventListener('keyup', handleKeyUp, true);
        }
    }, []);


    return (
     <>
        {
            game?.map((row, x) => {
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

export default Board;