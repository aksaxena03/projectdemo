import { getServerSession } from "next-auth";


export default async function home(){
const session =await getServerSession()

  return(
    <div className="">{JSON.stringify(session)}
    
    </div>
  )
}



//dumb way
// "use client"

// import Image from "next/image";
// import NextAuth from "next-auth"
// import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'
// export default function Home() {
//   function Component() {
//     const session = useSession()

//     return (
//       <div className="">
//         {session.status == "authenticated" && <button onClick={() => { signOut() }}>signOut</button>}
//         {session.status == "unauthenticated" && <button onClick={() => { signIn() }}>signIn</button>}
//       </div>

//     )
//   }
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <div className="">
//           <SessionProvider>
//             <Component />
//           </SessionProvider>
//           hello
//         </div>
//       </main>
//     </div>
//   );
// }
