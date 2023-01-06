import React from 'react';
import Select from 'react-select';
import './Filter.scss';

const customStyles = {
    control: () => ({
        backgroundColor: '#303033',
        borderRadius: '10px',
        display: 'flex',
        fontSize: '16px',
        lineHeight: '20px',
        minHeight: '56px',
        padding: '5px 15px',
        marginRight: '20px',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#F2F2F2',
    }),

    input: (provided) => ({
        ...provided,
        color: '#F2F2F2',
    }),

    placeholder: (provided) => ({
        ...provided,
        color: '#F2F2F2',
    }),
    indicatorSeparator:  () => ({
        display: 'none'
    }),
    menu: (provided)=> ({
        ...provided,
        backgroundColor: '#303033',
    })
  }
  

const Filter = (props) => {
    const categoryOptions = [
        { value: 'smartphones', label: 'smartphones' },
        { value: 'automotive', label: 'automotive' },
        { value: 'furniture', label: 'furniture' }
      ];

    return (
        <div className="filter-wrapper">
            <Select 
                styles={customStyles} 
                onChange={props.categoryHandler} 
                options={categoryOptions}
            />
        </div>
    );
};

export default Filter;