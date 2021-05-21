import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getAllPl8s } from '../../lib/api'

export default function Nav() {
  const history = useHistory()
  const [searchValue, setSearchValue] = useState(null)

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(searchValue)
  }

  const randomPl8 = async () => {
    const { data } = await getAllPl8s()
    const r = Math.floor(Math.random() * data.length)
    history.push(`/pl8s/${data[r]._id}`)
  }

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
          <Link to="/" className="navbar-item">
            M8S
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/become-a-m8" className="navbar-item">
              Become a M8
            </Link>
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