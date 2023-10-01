import React, { useState } from 'react';
import './styles/metrics.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function SetTracker({ name }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [sets, setSets] = useState([]);
  const [newSet, setNewSet] = useState({ SET: 0, WEIGHT: 0, REPS: 0 });

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleInputChange = (e, field) => {
    const updatedSet = { ...newSet, [field]: e.target.value };
    setNewSet(updatedSet);
  };

  const handleSave = () => {
    setSets([...sets, newSet]);
    setNewSet({ SET: 0, WEIGHT: 0, REPS: 0 });
    togglePopup();
  };

  const handleCancel = () => {
    setNewSet({ SET: 0, WEIGHT: 0, REPS: 0 });
    togglePopup();
  };

  return (
    <div className="set-tracker">
      <h2 className="subheading bold">Register Metrics</h2>
      <h2 className="title">{name}</h2>

      <div>
        {sets.map((set, index) => (
          <div className='newSet' key={index}>
            <span className="newSetLabel">SET:</span> {set.SET},{' '}
            <span className="newSetLabel">WEIGHT:</span> {set.WEIGHT},{' '}
            <span className="newSetLabel">REPS:</span> {set.REPS}
          </div>
        ))}
      </div>
      <button className='botonAdd' onClick={togglePopup}><FontAwesomeIcon icon={faPlus} className="tag-plus-icon" />Add Set</button>

      {isPopupVisible && (
        <div className="modal-overlay">
          <div className="popup">
            <table>
            <tbody>
  <tr>
    <td class="tg-0pky"><label className="newSetLabel">SET</label></td>
    <td class="tg-0pky"><input type="number" value={newSet.SET} onChange={(e) => handleInputChange(e, 'SET')} /></td>
  </tr>
  <tr>
    <td class="tg-0lax"><label className="newSetLabel">WEIGHT</label></td>
    <td class="tg-0lax"><input type="number" value={newSet.WEIGHT} onChange={(e) => handleInputChange(e, 'WEIGHT')} /></td>
  </tr>
  <tr>
    <td class="tg-0lax"><label className="newSetLabel">REPS</label></td>
    <td class="tg-0lax"><input type="number" value={newSet.REPS} onChange={(e) => handleInputChange(e, 'REPS')} /></td>
  </tr>
  <tr>
    <td class="tg-0lax"><button className='buttonSave' onClick={handleSave}>Save</button></td>
    <td class="tg-0lax"><button className='buttonCancel' onClick={handleCancel}>Cancel</button></td>
  </tr>
</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetTracker;
