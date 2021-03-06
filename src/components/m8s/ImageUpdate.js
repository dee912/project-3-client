import React from 'react'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function ImageUpload({ formdata, setFormdata }) {
  const [image, setImage] = React.useState('')
  const [imageAdded, setImageAdded] = React.useState(false)

  function handleUpload() {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: uploadUrl,
          uploadPreset,
          sources: ['local'],
          multiple: false,
        },
        (err, result) => {
          if (err) console.log(err)
          if (result.event === 'success') {
            setImage(result.info.url)
          }
        }
      )
      .open()
  }
  if (image && !imageAdded) {
    setImageAdded(true)
    setFormdata({ ...formdata, avatar: image })
  }
  return (
    <>
      {!image && <button onClick={handleUpload} type="button" className="card-footer-item">Upload Image</button>}
    </>
  )
}

export default ImageUpload