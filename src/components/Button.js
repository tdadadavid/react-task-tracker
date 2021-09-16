import PropTypes from 'prop-types'

const Button = ( {name , color , onClick}) => {

    return (
        <button
        onClick = {onClick}
        style={{ backgroundColor: color}} 
        className='btn'>
            {name}
        </button>
    )
}

Button.defaultProps = {
    color: 'green'
}

Button.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
