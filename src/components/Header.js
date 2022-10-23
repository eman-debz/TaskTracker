import PropTypes from 'prop-types';
import Button from './Button';
import {useLocation} from 'react-router-dom';



const Header = ({title, onAdd, showAdd}) => {
  
  const location = useLocation()
  return (
    <header className='header'>
        <h1 data-testid = 'header-title'>{title}</h1>
        {location.pathname === '/' && (
        <Button 
          testId = {'header-button'}
          text = {showAdd ? 'Close' : 'Add Task'} 
          onClick = {onAdd}
        />
        )}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header