import { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getAllPl8s } from '../../lib/api'
import { getPayload } from '../../lib/auth'
import { isAuthenticated, removeToken } from '../../lib/auth'
import PlateForNav from './PlateForNav'

export default function Nav() {
  const [visibleCracks, setVisibleCracks] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const { m8Id } = getPayload()
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  const randomPl8 = async () => {
    try {
      const { data } = await getAllPl8s()
      const r = Math.floor(Math.random() * data.length)
      history.push(`/pl8s/${data[r]._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setIsLoggedIn(isAuthenticated)
  }, [location.pathname])

  return (
    <nav className="navbar">
      <div className="containerNav">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item plate-button" onMouseEnter={() => setVisibleCracks(true)} onMouseLeave={() => setVisibleCracks(false)}>
            <PlateForNav visibleCracks={visibleCracks}/>
          </Link>
          <Link to="/pl8s" className="navbar-item">
            PL8S
          </Link>
          <Link to="" onClick={randomPl8} className="navbar-item">
            Random PL8
          </Link>
          <Link to="/game" className="navbar-item">
            Game
          </Link>
          {isLoggedIn &&
            <>
              <Link to={`/m8/${m8Id}`} className="navbar-item">
                M8S
              </Link>
              <Link to="/pl8s/cr8" className="navbar-item">
                CR8 A PL8
              </Link>
            </>
          }
          <div className="buttons">
            {isLoggedIn ?
              <button className="button" onClick={handleLogout}>
                  Log Out
              </button>
              :
              <>
                <Link to="/login" className="button">
                    Login
                </Link>
                <Link to="/become-a-m8" className="button">
                    Become a M8
                </Link>
              </>
            }
          </div>
        </div>
      </div>
    </nav>  
  )
}