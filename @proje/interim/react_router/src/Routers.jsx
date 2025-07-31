import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"
function Routers() {

  return (

    <>
      <BrowserRouter>
        < Link to="/ak" >home</Link> <br />
        < Link to="*" >page not found</Link> <br />
        header
        <Routes>
          <Route path="/" element={<Main/>}>
            <Route path="/ak" element={<Home />}></Route>
            <Route path="/help" element={<Help />}></Route>

          </Route>
        </Routes>
        footer
      </BrowserRouter>

    </>
  )
}
function Main(){
  return(
    <>
    at the main page
    <Outlet/> 
    {/* home and help come into the outlet it is called react outlet */}
    footer
    </>
    
  )
}

function Help() {
  return (
    <div> at help page</div>
  )
}
function Home() {
  return (
    <div> at home page</div>
  )
}

export default Routers
