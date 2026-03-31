// let token:any = '';

// export async function loginApi(email: string, password: string) {
//     console.log('email',email);
//     console.log('password',password);
    
    
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     }
//   );
// // console.log(res,'json');

// // response body read karo
// const data = await res.json();
// //  save token
//   localStorage.setItem('access_token', data.access_token);

//   return data;
// }

// export async function signupApi(data: any) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     }
//   );

//   return res.json();
// }



// export async function getPatients(limit = 10, page = 1) {
//   try {
//     const token = localStorage.getItem('access_token');
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/patient?limit=${limit}&page=${page}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//            Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || 'Failed to fetch patients');
//     }

//     return data;
//   } catch (error) {
//     console.error('Get patients error:', error);
//     throw error;
//   }
// }



// export async function createPatientApi(data: any) {
//     const token = localStorage.getItem('access_token');

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/patient`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
     
//       body: JSON.stringify(data),
//     }
//   );

//   return res.json();
// }

// export async function updatePatientApi(id: number, data: any) {
//   console.log(id,data,'dat');
//   const token = localStorage.getItem('access_token');
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/patient/${id}`,
//     {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}` },
//       body: JSON.stringify(data),
//     }
//   );

//   return res.json();
// }



const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('access_token')
    : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export default apiFetch;

export async function loginApi(email: string, password: string) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem('access_token', data.access_token);
  return data;
}


export async function signupApi(data: any) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export async function getPatients(limit = 10, page = 1) {
  return apiFetch(`/patient?limit=${limit}&page=${page}&sortBy=createdAt&sortOrder=DESC`);
}


export async function createPatientApi(data: any) {
  return apiFetch('/patient', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export async function updatePatientApi(id: number, data: any) {
  return apiFetch(`/patient/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}


export async function deletePatientApi(id: number) {
  return apiFetch(`/patient/${id}`, {
    method: 'DELETE',
  });
}




export async function getMedicines(limit = 10, page = 1) {
  return apiFetch(`/medicines?limit=${limit}&page=${page}`);
}

export async function createPharmacyApi(data: any) {
  return apiFetch('/medicines', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export async function updatePharmacyApi(id: number, data: any) {
  return apiFetch(`/medicines/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}


export async function deletePharmacyApi(id: number) {
  return apiFetch(`/medicines/${id}`, {
    method: 'DELETE',
  });
}





export async function getAppointment(limit = 10, page = 1) {
  return apiFetch(`/appointments?limit=${limit}&page=${page}`);
}

export async function createAppointmentApi(data: any) {
  return apiFetch('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export async function udateAppointmentApi(id: number, data: any) {
  return apiFetch(`/appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}


export async function deleteAppointmentApi(id: number) {
  return apiFetch(`/appointments/${id}`, {
    method: 'DELETE',
  });
}



// for bed management


export async function getBedApi(limit = 10, page = 1) {
  return apiFetch(`/bed-management?limit=${limit}&page=${page}`);
}

export async function createBedApi(data: any) {
  return apiFetch('/bed-management', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export async function updateBedApi(id: number, data: any) {
  return apiFetch(`/bed-management/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}


export async function deleteBedApi(id: number) {
  return apiFetch(`/bed-management/${id}`, {
    method: 'DELETE',
  });
}





// for Department management

export async function getDepartmentApi(limit = 10, page = 1) {
  return apiFetch(`/departments?limit=${limit}&page=${page}`);
}
export async function createDepartmentApi(data: any) {
  return apiFetch('/departments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export async function updateDepartmentApi(id: number, data: any) {
  return apiFetch(`/departments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}


export async function deleteDepartmentApi(id: number) {
  return apiFetch(`/departments/${id}`, {
    method: 'DELETE',
  });
}


// for invoice

export async function createInvoiceApi(data: any) {
  return apiFetch('/invoice', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}



export async function getInvoiceApi(limit = 10, page = 1) {
  return apiFetch(`/invoice?limit=${limit}&page=${page}`);
}


export async function updateInvoiceApi(id: number, data: any) {
  return apiFetch(`/invoice/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteInvoiceApi(id: number) {
  return apiFetch(`/invoice/${id}`, {
    method: 'DELETE',
  });
}


// dashboard

export async function getCountApi(limit = 10, page = 1) {
  return apiFetch(`/dashboard/count?limit=${limit}&page=${page}`);
}
export async function getRecentPatientApi(limit = 10, page = 1) {
  return apiFetch(`/dashboard/recent-patient?limit=${limit}&page=${page}`);
}
export async function getRecentAppointmentApi(limit = 10, page = 1) {
  return apiFetch(`/dashboard/recent-appointment?limit=${limit}&page=${page}`);
}



// doctor
 
// ══════════════════════════════════════════════════════════════════════════════
// DOCTOR APIs
// ══════════════════════════════════════════════════════════════════════════════
 
export async function getDoctorApi(limit = 10, page = 1) {
  return apiFetch(`/doctor?limit=${limit}&page=${page}`);
}
 
export async function createDoctorApi(data: any) {
  return apiFetch('/doctor', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
 
export async function updateDoctorApi(id: number, data: any) {
  return apiFetch(`/doctor/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
 
export async function deleteDoctorApi(id: number) {
  return apiFetch(`/doctor/${id}`, {
    method: 'DELETE',
  });
}
 