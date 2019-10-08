import React from 'react';
import './Buttons.scss';
import { updateExpression } from '@babel/types';

const Buttons = (props) => {
    return (
        <section className="Buttons">
            <div className="container">
                {props.buttons.map(button => (
                    <div 
                        id={button.id} 
                        key={button.id}className="button"
                        onClick={()=> updateExpression()}
                        >{button.value}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Buttons;