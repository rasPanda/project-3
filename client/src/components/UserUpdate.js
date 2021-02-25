import React from 'react'

export default function UserUpdateForm({ formData, handleSave, handleChange }) {
  const inputFields = ['username', 'location']

  return <form className="column">
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
            onChange={handleChange}
            name={field}
          />
        </div>
      </div>
    })}
    <div className="field">
      <label className="label">Bio</label>
      <div className="control">
        <textarea
          className="input"
          type="text"
          value={formData.bio}
          onChange={handleChange}
          name='bio'
        />
      </div>
    </div>

    <button className="button mt-5 is-success" onClick={handleSave}>Save</button>
  </form>
}