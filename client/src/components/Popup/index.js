import React from 'react';
import './Popup.scss';

const Popup = ({children, trigger, setTtiger}) => {
    return (trigger) 
        ? (
            <div className={"popup"} onClick={()=>setTtiger(false)}>
                <div className={"popup-inner"} onClick={(e)=>e.stopPropagation()}>
                    <button className={"close-btn"} onClick={() => setTtiger(false)}>X</button>
                    {children}
                </div>
            </div>
        )
        : null
};

export default Popup;