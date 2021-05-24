export default function Projectile() {

  const drag = () => {
    console.log('dragging')
  }

  const handleClick = (event) => {
    console.log('click')
  }

  return (
    <div onClick={handleClick} className="projectile" draggable="true" onDragStart={drag}>
      <div className="inner">
      </div>
    </div>
  )
}