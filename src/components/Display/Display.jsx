import React from 'react';
import './Display.scss';
const Display = (props) => {
    return (
        <div id="display" className="Display">
            <h1>{props.total}</h1>
            <small>{props.expression}</small>
        </div>
    );
}

export default Display;