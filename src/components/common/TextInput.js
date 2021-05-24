export default function TextInput({ label, name, formErrors, formdata }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className={`input ${formErrors.name ? 'is-danger' : ''}`}
          placeholder={label}
          name={name}
          value={formdata.name}
        />
        {formErrors.name && <p className="help is-danger">{formErrors.name}</p>}
      </div>
    </div>
  )
}