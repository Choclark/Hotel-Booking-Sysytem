import { client } from "@/sanity/lib/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { bookingDetails } from "../Interfaces/bookingDetails";
import UserBookingList from "../component/UserBookingList";
const getUserBooking = async (email: string | null) => {
  const res = await client.fetch(
    `*[_type == "booking" && email == "${email}"]`
  );
  return res;
};

const page = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const UserBookings: bookingDetails[] = await getUserBooking(user?.email);
  console.log(UserBookings);
  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8 h-full">
        <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
          My Bookings
        </h3>
        <div className="">
          {UserBookings.length < 1 ? (
            <p className="text-center font-medium text-md">
              You don't have any reservation
            </p>
          ) : (
            UserBookings.map((booking) => {
              return (
                <UserBookingList key={booking._id}  booking={booking} />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
