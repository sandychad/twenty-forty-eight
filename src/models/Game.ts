export enum ShiftDirection {
    Left = "left",
    Right = "right",
    Up = "up",
    Down = "down"
}

interface IMergeResult {
    newGrid: number[][],
    newScore: number
}

export class Board {
    
    static setPosition(position: number, value: number, grid: number[][]) {
        const [x, y] = this.getGridIndices(position);
        grid[x][y] = value;
    }

    static getGridIndices(position: number) {
        const x = Math.floor(position / 4);
        const y = position % 4;
        return [x, y]
    }


    static getGrid(): number[][] {
        let grid = [];

        for (let i = 0; i < 4; i++ ) {
            grid.push([-1, -1, -1, -1])
        }


        let firstPos, secondPos;
        firstPos = Math.floor(Math.random() * 16)
        
        while(true) {
            secondPos = Math.floor(Math.random() * 16)
            if (secondPos !== firstPos) {
                break;
            }
        }

        this.setPosition(firstPos, 2, grid);
        this.setPosition(secondPos, 2, grid);

        return grid;
    }

    static shiftLeftOrRight(grid: number[][], direction: ShiftDirection): number[][] {
        let returnGrid: number[][] = [];

        for (let x=0; x<4; x++) {
            let newRow = [];
            for (let val of grid[x]) {
                if (val !== -1) {
                    newRow.push(val);
                }
            }
            
            while (newRow.length < 4) {
                if (direction === ShiftDirection.Left) {
                    newRow.push(-1);
                } else {
                    newRow.unshift(-1);
                }
            }

            returnGrid.push(newRow);
        }

        return returnGrid;
    }

    static shiftUpOrDown(grid: number[][], direction: ShiftDirection): number[][] {
        let returnGrid: number[][] = grid.slice();

        for (let y=0; y<4; y++) {
            let newCol = [];

            for (let x=0; x<4; x++) {
                const val = grid[x][y]
                if (val !== -1) {
                    newCol.push(val);
                }
            }

            while (newCol.length < 4) {
                if (direction === ShiftDirection.Up) {
                    newCol.push(-1);
                } else {
                    newCol.unshift(-1);
                }
            }

            for (let x=0; x<4; x++) {
                returnGrid[x][y] = newCol[x];
            }
        }

        return returnGrid;
    }
    
    static shiftGrid(grid: number[][], direction: ShiftDirection): number[][] {
        switch(direction) {
            case ShiftDirection.Left:
            case ShiftDirection.Right:
                return this.shiftLeftOrRight(grid, direction);
            case ShiftDirection.Up:
            case ShiftDirection.Down:
                return this.shiftUpOrDown(grid, direction);
            default:
                return grid;
        }
    }

    static mergeLeftOrRight(grid: number[][], direction: ShiftDirection): IMergeResult {
        let returnGrid: number[][] = grid.slice();
        let scoreAdded: number = 0;

        for (let x=0; x<4; x++) {
            if (direction === ShiftDirection.Left) {
            
                for (let y=0; y<3; y++) {
                    const val = returnGrid[x][y];
                    const nextVal = returnGrid[x][y+1];

                    if (val !== -1 && val === nextVal) {
                        returnGrid[x][y] = val * 2;
                        returnGrid[x][y+1] = -1;
                        scoreAdded += val * 2;
                    }
                }  
            } else {
                for (let y=3; y>0; y--) {
                    const val = returnGrid[x][y];
                    const prevVal = returnGrid[x][y-1];

                    if (val !== -1 && val === prevVal) {
                        returnGrid[x][y] = val * 2;
                        returnGrid[x][y-1] = -1;
                        scoreAdded += val * 2;
                    }
                }
            }
            
        }

        return { newGrid:returnGrid, newScore: scoreAdded };
    }
    
    static mergeUpOrDown(grid: number[][], direction: ShiftDirection): IMergeResult {
        let returnGrid: number[][] = grid.slice();
        let scoreAdded: number = 0;

        for (let y=0; y<4; y++) {
            if (direction === ShiftDirection.Up) {
                for (let x=0; x<3; x++) {
                    const val = returnGrid[x][y];
                    const nextVal = returnGrid[x+1][y];

                    if (val !== -1 && val === nextVal) {
                        returnGrid[x][y] = val * 2;
                        returnGrid[x+1][y] = -1;
                        scoreAdded += val * 2;
                    }
                }  
            } else {
                for (let x=3; x>0; x--) {
                    const val = returnGrid[x][y];
                    const prevVal = returnGrid[x-1][y];

                    if (val !== -1 && val === prevVal) {
                        returnGrid[x][y] = val * 2;
                        returnGrid[x-1][y] = -1;
                        scoreAdded += val * 2;
                    }
                }
            }
            
        }

        return { newGrid:returnGrid, newScore: scoreAdded };
    }


    static mergeGrid(grid: number[][], direction: ShiftDirection): IMergeResult {
        switch(direction) {
            case ShiftDirection.Left:
            case ShiftDirection.Right:
                return this.mergeLeftOrRight(grid, direction);
            case ShiftDirection.Up:
            case ShiftDirection.Down:
                return this.mergeUpOrDown(grid, direction);
            default:
                return { newGrid: grid, newScore: 0};
        }
    }

    static moveGrid(grid: number[][], direction: ShiftDirection): IMergeResult {
        let returnGrid: number[][] = [];

        returnGrid = this.shiftGrid(grid, direction);
        const mergeResult = this.mergeGrid(grid, direction);
        returnGrid = this.shiftGrid(mergeResult.newGrid, direction);

        let pos;
        while(true) {
            pos = Math.floor(Math.random() * 16)
            const [x, y] = this.getGridIndices(pos)
            if (returnGrid[x][y] === -1) {
                returnGrid[x][y] = 2;
                break;
            }
        }

        return { newGrid: returnGrid, newScore: mergeResult.newScore};

    }

}

export default Board