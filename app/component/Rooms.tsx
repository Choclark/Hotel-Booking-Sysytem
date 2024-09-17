import { client, sanityFetch } from "@/sanity/lib/client"
import RoomList from "./RoomList"
import { RoomDetails } from "@/app/Interfaces/RoomDetails"
const getRooms = async () => {
    const res:RoomDetails[] = await sanityFetch({
      query:`*[_type == "room"]`,
      tags:["room"],
    })
    
    return res
}
const Rooms = async () => {
    const rooms:RoomDetails[] = await getRooms()
    return (
    <section>
         {
          rooms && rooms.length > 0 ? (
            <div className="container mx-auto">
            <RoomList rooms={rooms}/>
            </div>
          ):(
            <p>No rooms found or Data error </p>
          )
         }
    </section>
  )
}

export default Rooms
