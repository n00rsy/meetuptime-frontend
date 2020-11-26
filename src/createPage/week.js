import React from 'react';
import { useForm } from 'react-hook-form';

export default function Week() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
    return (
        <div>
      <input type="checkbox" placeholder="Sunday" name="Sunday" ref={register} />
      <input type="checkbox" placeholder="Monday" name="Monday" ref={register} />
      <input type="checkbox" placeholder="Tuesday" name="Tuesday" ref={register} />
      <input type="checkbox" placeholder="Wednesday" name="Wednesday" ref={register} />
      <input type="checkbox" placeholder="Thursday" name="Thursday" ref={register} />
      <input type="checkbox" placeholder="Friday" name="Friday" ref={register} />
      <input type="checkbox" placeholder="Saturday" name="Saturday" ref={register} />
        </div>
    )
}