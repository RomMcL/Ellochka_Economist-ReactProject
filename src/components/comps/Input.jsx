import React from "react";
import css from "../../styles/views/local/form.css";

const { FormInput } = css;

const Input = (props) => {

    const { placeholder, inputValue, action } = props;


    return (
        <React.Fragment>
            <FormInput
                value={inputValue}
                type={"text"}
                placeholder={placeholder}
                maxLength={"100"}
                onChange={event => {
                    const newValue = event.target.value;

                    action(newValue);
                }}
            />

        </React.Fragment>
    )
}

export default Input;