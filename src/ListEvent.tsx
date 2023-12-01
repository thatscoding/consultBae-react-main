import { useEffect, useState } from "react";
import { AllEvents } from "./service/api";
import { EventTypeProps } from "./types/EventTypes";

export function ListEvent(props: any) {
  const [events, setEvents] = useState<EventTypeProps[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await AllEvents();
      console.log(res?.data);
      setEvents(res?.data);
    }
    getData();
  }, []);

  // console.log(events[0].guests[0]);
  return (
    <div className="container max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 mt-8 py-8 px-4">
        <span
          onClick={() => props.setModal(true)}
          className="bg-blue-600 px-6 py-2 rounded-xl hover:bg-blue-500 flex justify-center items-center text-white w-40 cursor-pointer"
        >
          Create Event
        </span>
        <h1>All Events</h1>
        <div className="">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="sm:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-96 overflow-scroll ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Event name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Guests
                  </th>
                </tr>
              </thead>
              <tbody>
                {events?.map((e) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {e.Eventname}
                    </th>
                    <td className="px-6 py-4"> {e.date}</td>
                    <td className="px-6 py-4"> {e.location}</td>
                    <td className="px-6 py-4">{e.time}</td>
                    <td className="px-6 py-4">
                      {e.guests.map((user, key) => (
                        <span key={key}>{user} | </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
