import React, { Component } from 'react';
import Select from 'react-select';

const Input = ( props ) => {
    let inputType = null;

    switch ( props.type ) {
        case ('textInput'):
            
        case ('numberInput'):
            inputType = <input 
                className={props.type} 
                type={props.type}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}/>;
            break;
        case ('select'):
            inputType = 
                <Select 
                    className={props.type}
                    defaultValue={props.default}
                    options={props.options}
                    onChange={props.onChange}
                    onChange={props.onSelectChange}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                        ...theme.colors,
                          primary25: 'hotpink',
                          primary: 'black',
                        },
                    })}
                />;
            break;
        default:
            return null;
    }

    return (
        <div className="form-input">
            {inputType}
        </div>
    );
}

export default Input;