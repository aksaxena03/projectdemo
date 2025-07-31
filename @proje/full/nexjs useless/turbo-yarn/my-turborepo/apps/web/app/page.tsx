'use client'
import Inputs from '@repo/ui/inputs'
import { useRouter } from 'next/navigation';
// import { Router } from 'next/router';
export default function Home() {
  const router=useRouter();
  return (
    <div className="" style={{
      display: 'flex', height: "100vh", width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', margin: '0%'
    }}>
      <Inputs stl="" placeholder="enter room code" type='text' onchange={() => alert("hi")} />
      <button onClick={()=>{
        router.push('/chat')
      }}>join</button>
    </div>
  );
}
