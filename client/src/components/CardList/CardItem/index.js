import React from 'react';
import Button from '../../Button';

import './CardItem.scss';
import placeholder from '../../../assets/images/placeholder.png';


const CardItem = (props) => {
    const link = '/products/' + props.id;
    const title = props.title  || 'Title not found';
    const imgSrc = props.imgSrc || placeholder;
    const clName = props.clName || 'grid__item';
    const text= props.text;
    const price = props.price;
    const rating = props.rating;
    
    return (
        <div className={clName}>
            <img src={imgSrc} alt={title} className="grid__item-image" />
            <div className="grid__item-content">
                <h3 className="grid__item-title">{title}</h3>
                {text && 
                    (<p className="grid__item-text">{text}</p>)
                }
                <div className="item-bottom">
                    <Button className="button--with-arrow" to={link}>Read more</Button>
                    <div className="grid__item-stats">
                        <span className="grid__item-price">{price}$</span>
                        <span className="grid__item-rating">{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;