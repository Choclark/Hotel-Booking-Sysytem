import { client } from "@/sanity/lib/client"
import RoomList from "./RoomList"
import { RoomDetails } from "@/app/Interfaces/RoomDetails"
const getRooms = async () => {
    const res:RoomDetails[] = await client.fetch(`*[_type == "room"]`)
    return res
}
const Rooms = async () => {
    const rooms:RoomDetails[] = await getRooms()
  return (
    <section>
        <div className="container mx-auto">
            <RoomList rooms={rooms}/>
        </div>
    </section>
  )
}

export default Rooms
