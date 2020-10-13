import React from 'react'

const ErrorMessage = ({errorMessage}) => {

    const errorMessageStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (errorMessage === null) {
        return null
    } else {
        return (
            <div style={errorMessageStyle}>
                {errorMessage}
            </div>
        )
    }
}

export default ErrorMessage