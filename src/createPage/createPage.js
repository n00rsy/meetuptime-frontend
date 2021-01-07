import React, {useEffect} from 'react';
import CreateForm from './createForm'
import './styles.css'

export default function CreatePage() {
  useEffect(() => {
    document.getElementsByClassName('app-wrapper')[0].style.backgroundColor = 'var(--bg)'
        
  }, [])
  return (

    <div className="create-form-container">
      <CreateForm></CreateForm>
    </div>
  );
}