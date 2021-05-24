export default function ProfileM8s({ formdata }) {
  return (
    <div>
      <div className="media-content">
        <p className="title is-4">{formdata.username}&apos;s m8s</p>
      </div>
      <br/>

      <div className="columns">
        <div className="column is-4 is-offset-0">
          <div className="card">
            <div className="card-image">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                  </div>
                  <div className="media-content">
                    <p className="title is-4">Chris</p>
                  </div>
                </div>
              </div>
              <figure className="image is-4by3">
                <img src="https://static.boredpanda.com/blog/wp-content/uploads/2020/10/rate-my-plate-facebook-group-5f7f126f135cc-png__700.jpg" alt={formdata.username}/>
              </figure>
            </div>
          </div>                 
        </div>

        <div className="column is-4 is-offset-0">
          <div className="card">
            <div className="card-image">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                  </div>
                  <div className="media-content">
                    <p className="title is-4">Dom</p>
                  </div>
                </div>
              </div>
              <figure className="image is-4by3">
                <img src="https://i2-prod.mirror.co.uk/incoming/article14433668.ece/ALTERNATES/s615b/0_Rate-My-Plate.jpg" alt={formdata.username}/>
              </figure>
            </div>
          </div>                 
        </div>

        <div className="column is-4 is-offset-0">
          <div className="card">
            <div className="card-image">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                  </div>
                  <div className="media-content">
                    <p className="title is-4">Devante</p>
                  </div>
                </div>
              </div>
              <figure className="image is-4by3">
                <img src="https://static.boredpanda.com/blog/wp-content/uploads/2020/10/rate-my-plate-facebook-group-5f7f1377e3006-png__700.jpg" alt={formdata.username}/>
              </figure>
            </div>
          </div>                 
        </div>
        
      </div>
    </div>
  )
}