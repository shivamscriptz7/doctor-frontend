'use client';

import { useRouter } from 'next/navigation';


// app/dashboard/page.jsx
import HospitalLayout from './dashboard/page';

export default function DashboardPage() {
  return <HospitalLayout />;
}

// export default function Example() {
//   const router = useRouter();

//   const goToLogin = () => {
//     router.push('/login');
//   };

//   const goToSidebar = () => {
//     router.push('/sidebar');
//     router.push('/patients');
//   };

//   //  const goToSidebar = () => {
//   //   router.push('/sidebar');
//   // };

//   return (
//     <>
// {/*     
//     <button onClick={goToLogin}>
//       Go to Login
//     </button>

//     <button onClick={goToSidebar}>
//       Go to Sidebar
//     </button> */}
//     router.push('/login');
//     </>
    
//   );
// }


