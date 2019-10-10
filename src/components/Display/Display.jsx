import React from 'react';
import './Display.scss';
const Display = (props) => {
    //TODO change font size when we have many decimals
    let manyDecimals = props.manyDecimals;
    return (
        <div  className="Display">
            <h1  className={manyDecimals ? "manyDecimals" : ""}>{props.total}</h1>
            <small id="display">{props.expression}</small>
        </div>
    );
}

export default Display;