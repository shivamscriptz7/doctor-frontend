let token:any = '';

export async function loginApi(email: string, password: string) {
    console.log('email',email);
    console.log('password',password);
    
    
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }
  );
// console.log(res,'json');

// response body read karo
const data = await res.json();
//  save token
  localStorage.setItem('access_token', data.access_token);

  return data;
}

export async function signupApi(data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}



export async function getPatients(limit = 10, page = 1) {
  try {
    const token = localStorage.getItem('access_token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/patient?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch patients');
    }

    return data;
  } catch (error) {
    console.error('Get patients error:', error);
    throw error;
  }
}



export async function createPatientApi(data: any) {
    const token = localStorage.getItem('access_token');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/patient`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
     
      body: JSON.stringify(data),
    }
  );

  return res.json();
}

export async function updatePatientApi(id: number, data: any) {
  console.log(id,data,'dat');
  const token = localStorage.getItem('access_token');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/patient/${id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}




