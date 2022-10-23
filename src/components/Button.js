import PropTypes from 'prop-types';


const Button = ({text, color, onClick, testId}) => {
  return (
    <button style ={{backgroundColor: color}} className='btn' onClick={onClick} data-testid = {testId}>
        {text}
    </button>
  )
}

Button.defaultProps = {
    color: 'rgb(204, 204, 204)',
    text : 'Add some text'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button