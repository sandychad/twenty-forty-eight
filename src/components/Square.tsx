import React from 'react';

interface SquareProps {
    position: number;
    value: number;
}

const Square: React.FC<SquareProps> = ({
    position,
    value
}) => {

    return (
     <div className={"cell" + (value === -1 ? " cell-empty" : " cell-" + value)}>
        <span>{value === -1 ? "" : value}</span>
     </div>   
    )
}

export default Square;