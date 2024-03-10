import {useEffect, useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/not-found");
  },[])
  return (
    <div className='w-full h-full flex'>
      <span className='m-auto text-lg font-Montserrat'>Not Found Anything</span>
    </div>
  )
}

export default NotFound
