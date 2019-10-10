import React from 'react';
import './Buttons.scss';


const Buttons = (props) => {
    return (
        <section className="Buttons">
            <div className="container">
                {props.buttons.map(button => (
                    <div 
                        id={button.id} 
                        key={button.id}
                        className={button.id === 'back' ? 'button back' : 'button'}
                        onClick={() => props.updateExpr(button.value)}
                        >{button.value}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Buttons;