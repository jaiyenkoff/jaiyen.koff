import React from 'react';
import './styles.scss';

const TextFieldWrapper = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className="textFieldRow">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input className="textFieldWrapper" onChange={handleChange} {...otherProps} />
        </div>
    );
}

export default TextFieldWrapper;