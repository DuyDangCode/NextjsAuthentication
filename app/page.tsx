'use client';

import axios, { Axios, AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const rouute = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    console.log('username: ', username);
    console.log('password: ', password);

    try {
      const respone = await axios.post('/api/auth/login', {
        username: username,
        password: password,
      });
      rouute.push('/home');
    } catch (e) {
      const error = e as AxiosError;
      alert(error);
    }
  };
  return (
    <div className='flex h-full w-full justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 items-center justify-center'
      >
        <div className='flex flex-col '>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            required
            className=' border-2 border-black'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            className='border-2 border-black'
          />
        </div>
        <button
          type='submit'
          className=' border-2 border-black w-[100px] h-auto'
        >
          Login
        </button>
      </form>
    </div>
  );
}
