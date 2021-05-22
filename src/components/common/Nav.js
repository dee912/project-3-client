import { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getAllPl8s } from '../../lib/api'
import { isAuthenticated, removeToken } from '../../lib/auth'

export default function Nav() {
  const history = useHistory()
  const location = useLocation()
  const [searchValue, setSearchValue] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(searchValue)
  }

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  const randomPl8 = async () => {
    const { data } = await getAllPl8s()
    const r = Math.floor(Math.random() * data.length)
    history.push(`/pl8s/${data[r]._id}`)
  }
  console.log(isLoggedIn)


  useEffect(() => {
    setIsLoggedIn(isAuthenticated)
  }, [location.pathname])

  return (
    <nav className="navbar is-dark is-fullwidth">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/pl8s" className="navbar-item">
            PL8S
          </Link>
          <Link to="" onClick={randomPl8} className="navbar-item">
            Random PL8
          </Link>
          {isLoggedIn &&
            <>
              <Link to="/m8s" className="navbar-item">
                M8S
              </Link>
              <Link to="/pl8s/cr8" className="navbar-item">
                CR8 A PL8
              </Link>
            </>
          }
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
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
            <form type="search" onSubmit={handleSubmit}>
              <span className="navbar-item is-inline-block">
                <span className="field">
                  <span className="control">
                    <input
                      className="input"
                      type="search"
                      placeholder="FIND A PL8 M8"
                      onKeyUp={handleChange}
                    />
                  </span>
                </span>
              </span>
              <span className="navbar-item is-inline-block">
                <span className="field">
                  <button type="submit" className="button is-warning">
                    Search
                  </button>
                </span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </nav>  
  )
}