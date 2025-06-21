'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Alert from '@/components/Alert';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(true)
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      role: 'admin', // explicitly set role
    });

    if (!res.ok) {
      setError('Invalid credentials or server error.');
      return;
    }

    

    if (session?.user?.role !== 'admin') {
      setError('Access denied: Not an admin.');
    } else {
      router.push('/admin/dashboard'); 
    }
  };

  return (
  <>
    {session?.user?.role === 'admin' ? (
        <div className='w-full h-full flex items-center justify-center'>
          <div className='w-[90%] md:w-[60%] lg:w-[50%] h-[10%] flex flex-col items-center justifi-center'>
            <Alert
              msg={'Admin already logged in'}
              onClose={() => setShowAlert(false)}
            />
            <div>
              Move to <a href='/admin/dashboard' className='text-blue-200'>Dashboard</a>
            </div>
          </div>
        </div>
      ) : (
    <div className="w-full lg:w-[40%] flex items-center justify-center">     
        <form
          onSubmit={handleLogin}
          className="p-8 rounded shadow-md shadow-gray-700 w-full max-w-md lg:mt-9"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

          <label htmlFor='email' className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name='email'
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='password' className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name='password'
            className="w-full p-2 border border-gray-300 rounded mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
          >
            Login
          </button>
        </form>
    </div>
      )}
      </>
  );
}
