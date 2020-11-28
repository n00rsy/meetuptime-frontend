import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';

export default function Week({selectedDays, setSelectedDays}) {
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

  console.log(errors);
    return (
        <div onChange={onChange}>
      <input type="checkbox" placeholder="Sunday" name="0" ref={register}/>
      <input type="checkbox" placeholder="Monday" name="1" ref={register} />
      <input type="checkbox" placeholder="Tuesday" name="2" ref={register} />
      <input type="checkbox" placeholder="Wednesday" name="3" ref={register} />
      <input type="checkbox" placeholder="Thursday" name="4" ref={register} />
      <input type="checkbox" placeholder="Friday" name="5" ref={register} />
      <input type="checkbox" placeholder="Saturday" name="6" ref={register} />
        </div>
    )
}