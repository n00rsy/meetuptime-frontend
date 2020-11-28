import React from 'react'
import { useForm } from 'react-hook-form';

export default function SigninForm({ signedIn, setSignedIn }) {

    const { register, handleSubmit } = useForm()

    function onSubmit(userInfo) {
        console.log(userInfo)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="username" name="username" ref={register} />
            <input type="password" placeholder="username" name="password" ref={register} />
            <input type="submit" value="Login" />
        </form>
    )

}
