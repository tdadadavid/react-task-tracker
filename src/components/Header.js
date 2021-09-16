import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title , color , onAdd , showForm }) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {
                location.pathname === '/' && 
                <Button 
                    name={showForm ? 'Close' : 'Add'} 
                    color={showForm ? 'red' : 'green'} 
                    onClick={onAdd}
                />
            }
        </header>
    )
}

export default Header
