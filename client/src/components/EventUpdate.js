import React from 'react'

export default function EventUpdateForm({ formData, handleSave, handleFormChange }) {
const inputFields = ['name', 'location', 'time', 'details']

  return <form>
    {inputFields.map(field => {
      return <div key={field} className="field">
      <label className="label">
        {field[0].toUpperCase() + field.slice(1)}
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={formData[field]}
          onChange={handleFormChange}
          name={field}
        />
      </div>
    </div>
    })}
    <button className="button mt-5 is-success" onClick={handleSave}>Save</button>
  </form>
}