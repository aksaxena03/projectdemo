import axios from "axios"
import { Brain as BrainLogo } from "../Logo/Brain"
import { Backend_url } from "../../../config"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../Button"

export default function SignIn() {

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  let [done, setDone] = useState<Boolean>(true)
  async function signin() {
    try {
      const username = usernameRef.current?.value
      const password = passwordRef.current?.value
      setDone(true)
      if (username != "") {
        console.log(username, password);
        const response = await axios.post(`${Backend_url}/api/v1/signin`,
          { username, password }
        );
        const jwt = response.data.token;
        localStorage.setItem("token", jwt)
        { username != "" && password != "" ? navigate("/Dash") : alert("invalid data") }

      } else {
        setDone(false)
        throw new Error()
      }

    } catch {
      setDone(false)
      alert("invalid username and password")
    }
  }
  return (


    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center"><BrainLogo size="size-16" />
            <h2 className=" text-blue-500 ml-2 text-center text-5xl font-bold tracking-tight">
              Second Brain
            </h2></div>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="UserName" className="block text-sm/6 font-medium text-gray-900">
                UserName
              </label>
              <div className="mt-2">
                <input ref={usernameRef}
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
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                {done ? null :
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg  dark:text-blue-400"
                    role="alert">
                    <span className="font-medium">Wrong password & username</span> </div>}
              </div>
            </div>
            <div>
              <Button onClick={signin} variant="primary" text="SignUp" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href={`/signup`} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
