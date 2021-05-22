export default function ProfileBio({ username, highScore }) {
  return (
    <div>
      <div className="media-content">
        <p className="title is-4">{username}&apos;s bio</p>
      </div>
      <br/>
      <div className="media-content">
        <p className="title is-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <hr/>
      <div className="media-content">
        <p className="title is-4">Throw a pl8 Highscore</p>
      </div>
      <br/>
      <div className="media-content">
        <p className="title is-6">{highScore}</p>
      </div>
    </div>
  )
}