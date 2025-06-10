// import axios from 'axios'

import Link from "next/link";

// export default async function Home() {
//   const response=await axios.get("http://localhost:3000/api/path/v1/user")
//   const data=response.data
//   return (
//     <div className="">
//       {data.username}
//       {data.password}
//     </div>
//   );
// }



export default function Home(){

  return(
      <div className="">
        <Link className="border-2 m-1" href="/signup" >signup</Link>
        <Link className="border-2 m-1" href="/signin" >signin</Link>
      </div>
  );
} 