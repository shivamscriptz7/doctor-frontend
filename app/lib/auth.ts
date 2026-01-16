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

console.log(data);

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
