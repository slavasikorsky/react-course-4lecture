import React from 'react';
import './Search.scss';

const Search = (props) => {
    return (
        <div className="search-wrapper">
            <input 
                onKeyUp={props.postsHandler}
                type="text" 
                className="search-input" 
                placeholder="Search Article"
            />
        </div>
    );
};

export default Search;