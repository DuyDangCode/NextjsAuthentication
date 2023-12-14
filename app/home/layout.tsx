'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    try {
      (async () => {
        try {
          await axios.get('/api/me');
          setIsLogin(true);
        } catch (error) {
          router.replace('/');
          return;
        }
      })();
    } catch (error) {}
  }, []);

  if (!isLogin) {
    return <p>Lodding...</p>;
  }

  return <div>{children}</div>;
};

export default HomeLayout;
