import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Week({ selectedDays, setSelectedDays }) {
  const { register, errors } = useForm({
    reValidateMode: 'onChange'
  });

  function onChange(data) {
    let newSelectedDays = [...selectedDays]
    if (!data.target.checked) {
      const selectedIndex = newSelectedDays.findIndex(selectedDay =>
        selectedDay === data.target.name
      );
      newSelectedDays.splice(selectedIndex, 1);
    }
    else {
      newSelectedDays.push(data.target.name);
    }
    setSelectedDays(newSelectedDays)
  }

  useEffect(() => {
    selectedDays.forEach(selectedDay => {
      document.getElementsByName(selectedDay)[0].checked = true
    })
  });

  return (
    <div className = "days-wrapper" onChange={onChange}>
      <div className="day-container">
        <label className="day-label" for="sun">Sun</label>
        <input id="sun" className="day" type="checkbox" placeholder="Sunday" name="0" ref={register} />
      </div>
      <div className="day-container">
        <label className="day-label" for="mon">Mon</label>
        <input id="mon" className="day" type="checkbox" placeholder="Monday" name="1" ref={register} />
      </div>
      <div className="day-container">
        <label className="day-label" for="tue">Tue</label>
        <input id="tue" className="day" type="checkbox" placeholder="Tuesday" name="2" ref={register} />
      </div>
      <div className="day-container">
        <label className="day-label" for="wed">Wed</label>
        <input id="wed" className="day" type="checkbox" placeholder="Wednesday" name="3" ref={register} />
      </div>
      <div className="day-container">
        <label className="day-label" for="thu">Thu</label>
        <input id="thu" className="day" type="checkbox" placeholder="Thursday" name="4" ref={register} />
      </div>
      <div className="day-container">
        <label className="day-label" for="fri">Fri</label>
        <input id="fri" className="day" type="checkbox" placeholder="Friday" name="5" ref={register} />
      </div>
      <div className="day-container">
        <label className="day-label" for="sat">Sat</label>
        <input id="sat" className="day" type="checkbox" placeholder="Saturday" name="6" ref={register} />
      </div>
    </div>
  )
}