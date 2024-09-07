
import { useState } from "react"
import Rooms from "./component/Rooms"
import Hero from "./component/Hero"

const Home = () => {
  return(
    <main className="px-4">
      <Hero/>
      <Rooms/>
    </main>
  )
}

export default Home
