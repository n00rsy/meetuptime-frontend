import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function Calendar({selectedDates, setselectedDates}) {


  function handleDayClick(day, { selected }) {
      let newselectedDates = [...selectedDates]
    if (selected) {
      const selectedIndex = newselectedDates.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      newselectedDates.splice(selectedIndex, 1);
    } 
    else {
        newselectedDates.push(day);
    }
    setselectedDates(newselectedDates)
  }

    return (
      <div>
        <DayPicker
          selectedDays={selectedDates}
          onDayClick={handleDayClick}
        />
      </div>
    );
  
}