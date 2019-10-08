import React from 'react';
import './Brand.scss';

const Brand = (props) => {
    return (
        <section className="Brand">
            <span>{props.brandName}</span>
        </section>
    );
}

export default Brand;