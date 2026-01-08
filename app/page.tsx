'use client';

import { useRouter } from 'next/navigation';

export default function Example() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <button onClick={goToLogin}>
      Go to Login
    </button>
  );
}
