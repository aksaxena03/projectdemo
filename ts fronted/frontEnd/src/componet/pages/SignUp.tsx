import { useRef } from "react"
import axios from 'axios'
import {Brain as BrainLogo} from "../Logo/Brain"
import { Button } from "../Button"
import {Backend_url} from "../../../config"
import { useNavigate } from "react-router-dom"
export default function SignUp() {
  const usernameRef=useRef<HTMLInputElement>()
  const passwordRef=useRef<HTMLInputElement>()
  const navigate =useNavigate()
  async function signup(){
    try { 
      const username=usernameRef.current?.value
      const password=passwordRef.current?.value
     if(username!=""){
      await axios.post(`${Backend_url}/api/v1/signup`,
        {username,password}
      );
      alert("signup successful")

      navigate("/signin")}else(alert("invalid username"))
    } catch {
      alert("user exists")
    }
  }
  return (
    <>
      
      <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center"><BrainLogo size="size-16"/>
          <h2 className=" text-blue-500 ml-2 text-center text-5xl font-bold tracking-tight">
            Second Brain
          </h2></div>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="UserName" className="block text-sm/6 font-medium text-gray-900">
                UserName
              </label>
              <div className="mt-2">
                <input
                ref={usernameRef}
                  id="UserName"
                  name="UserName"
                  type="UserName"
                  required
                  autoComplete="UserName"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                ref={passwordRef}

                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <Button onClick={signup} variant="primary" text="SignUp" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" ></Button>
              
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            already a member?{' '}
            <a href={`/signin`} className="font-semibold text-indigo-600 hover:text-indigo-500">
              LogIn
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
