import p1 from "./assets/profile/p1.jpg";
import p2 from "./assets/profile/p2.jpg";
import { MdWorkspacePremium } from "react-icons/md";
import { LuChevronsUpDown } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EventType } from "./types/EventTypes";
import { CreateEvent } from "./service/api";

function AddEvent(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);

  const [doc, setDoc] = useState<EventType>({
    Eventname: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    remainder: "1 Hours",
  });

  const [guest, setGuest] = useState([""]);
  const [notification, setNotification] = useState("email");
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoc({ ...doc, [e.target.name]: e.target.value });
    console.log(doc);
  };

  const handleAddGeust = (email: string) => {
    setGuest([...guest, email]);
    setEmail("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    // const formData = new FormData();
    // formData.append("Eventname", doc.Eventname);
    // formData.append("description", description);
    // formData.append("date", doc.date);
    // formData.append("time", doc.time);
    // formData.append("duration", doc.duration);
    // formData.append("location", doc.location);
    // formData.append("guests", guest);
    // formData.append("notification", notification);
    // formData.append("remainder", doc.remainder);
    // formData.append("file", file);

    const data = {
      Eventname: doc.Eventname,
      description: description,
      date: doc.date,
      time: doc.time,
      duration: doc.duration,
      location: doc.location,
      guests: guest,
      notification: notification,
      remainder: doc.remainder,
      file: "p1.png",
    };

    if (
      doc.Eventname === "" ||
      description === "" ||
      doc.date === "" ||
      doc.time === "" ||
      doc.location === "" ||
      guest.length === 0
    ) {
      alert("All fields are requireds.");
    } else {
      try {
        console.log(data);
        const response = await CreateEvent(data);
        // Handle the response from the server
        console.log("Server response:", response);
        props.setModal(false);
      } catch (error) {
        console.error("Error :", error);
      }
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto container bg-gray-50 h-100">
        <div className="px-6 py-10 space-y-4">
          <div className=" flex justify-between ">
            <h1 className="text-xl font-bold">Create Event</h1>
            <span
              onClick={() => props.setModal(false)}
              className="flex items-center justify-center bg-gray-200 px-1 font-bold cursor-pointer rounded"
            >
              <RxCross2 />
            </span>
          </div>
          <div className="">
            <h1>Event Name</h1>
            <div className="sm:relative flex flex-wrap gap-6">
              <input
                type="text"
                required
                className="w-full bg-gray-100  rounded-lg  p-2 "
                placeholder="Enter event name"
                name="Eventname"
                onChange={(e) => handleChange(e)}
                value={doc.Eventname}
              />
              <button
                style={{
                  top: "50%",
                  transform: "translate(0, -50%)",
                }}
                onClick={() => setOpen(true)}
                className="sm:absolute right-2 px-6 py-1 border-2 border-gray-200 rounded-xl "
              >
                Add Description
              </button>
            </div>
          </div>
          {/* {apiUrl} */}
          <div className=" pt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
            <div className="space-y-1">
              <h1>Date</h1>
              <input
                type="date"
                required
                className="pl-2 p-1 rounded border border-gray-300 lg:w-2/3"
                name="date"
                onChange={(e) => handleChange(e)}
                value={doc?.date}
              />
            </div>
            <div className="space-y-1">
              <h1>Time</h1>
              <input
                type="time"
                name="time"
                required
                className="pl-2 p-1 rounded border border-gray-300 lg:w-2/3"
                onChange={(e) => handleChange(e)}
                value={doc?.time}
              />
            </div>
            <div className="space-y-1">
              <h1>Duration</h1>
              <input
                type="text"
                name="duration"
                required
                placeholder="1 hours"
                className="pl-2 p-1 rounded border border-gray-300 lg:w-2/3"
                onChange={(e) => handleChange(e)}
                value={doc?.duration}
              />
            </div>
          </div>
          {doc.date && doc.time && (
            <>
              <p className="py-2">
                This event will take place on the {doc.date} from {doc.time} PM
                until {doc.time} PM
              </p>
            </>
          )}

          <div className="">
            <h1>Location</h1>
            <div className="sm:relative flex flex-wrap gap-6">
              <input
                type="text"
                name="location"
                required
                className="w-full bg-gray-100  rounded-lg  p-2"
                placeholder="Choose location"
                onChange={(e) => handleChange(e)}
                value={doc?.location}
              />
              <button
                style={{
                  top: "50%",
                  transform: "translate(0, -50%)",
                }}
                className="sm:absolute right-2 px-6 py-1 border-2 border-gray-200 rounded-xl "
              >
                Set Meeting Room
              </button>
            </div>
          </div>
          <div className="">
            <h1>Add Guest</h1>
            <div className="sm:relative flex flex-wrap gap-6">
              <input
                type="text"
                name="email"
                required
                className="w-full bg-gray-100  rounded-lg  p-2"
                placeholder="contact@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                style={{
                  top: "50%",
                  transform: "translate(0, -50%)",
                }}
                className="sm:absolute right-2 px-6 py-1 border-2 border-gray-200 rounded-xl "
                onClick={() => handleAddGeust(email)}
              >
                Add
              </button>
            </div>
            <div className="flex gap-2 py-3 items-center flex-wrap">
              <span className="relative rounded-full w-16 h-16 object-cover">
                <img
                  src={p1}
                  alt=""
                  className="rounded-full w-16 h-16 object-cover"
                />

                <span className="absolute top-0 -right-1 text-blue-400">
                  <MdWorkspacePremium />
                </span>
              </span>
              <span className="relative rounded-full w-16 h-16 object-cover">
                <img
                  src={p2}
                  alt=""
                  className="rounded-full w-16 h-16 object-cover"
                />

                <span className="absolute top-0 -right-1 text-blue-400">
                  <MdWorkspacePremium />
                </span>
              </span>
              <span className="relative rounded-full w-16 h-16 object-cover">
                <img
                  src={p1}
                  alt=""
                  className="rounded-full w-16 h-16 object-cover"
                />

                <span className="absolute top-0 -right-1 text-blue-400">
                  <MdWorkspacePremium />
                </span>
              </span>
              <span className="relative rounded-full w-16 h-16 object-cover">
                <img
                  src={p2}
                  alt=""
                  className="rounded-full w-16 h-16 object-cover"
                />

                <span className="absolute top-0 -right-1 text-blue-400">
                  <MdWorkspacePremium />
                </span>
              </span>
              <span className="flex justify-center items-center rounded-full bg-gray-200 w-14 h-14 object-cover font-bold">
                +3
              </span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex flex-col space-y-2">
              <h1>Notification</h1>
              <div className="flex  bg-gray-100 rounded">
                <p
                  className={
                    notification == "email"
                      ? "bg-gray-200 rounded px-4 py-1 border border-gray-300 cursor-pointer duration-500 ease-in-out text-sm"
                      : "bg-gray-100 rounded px-4 py-1 cursor-pointer duration-500 ease-in-out text-sm"
                  }
                  onClick={() => setNotification("email")}
                >
                  Email
                </p>
                <p
                  className={
                    notification == "slack"
                      ? "bg-gray-200 rounded px-4 py-1 border border-gray-300 cursor-pointer duration-500 ease-in-out text-sm"
                      : "bg-gray-100 rounded px-4 py-1 cursor-pointer duration-500 ease-in-out text-sm"
                  }
                  onClick={() => setNotification("slack")}
                >
                  Slack
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <h1>Set Remainder</h1>
              <div className="flex  bg-gray-100 rounded">
                <p className="flex items-center justify-evenly space-x-2 bg-gray-200 rounded px-4 py-1 border border-gray-300 ">
                  <span>1 hour before event</span>
                  <span>
                    <LuChevronsUpDown className="text-lg" />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="py-4">
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
          <div className=" w-full flex justify-end">
            <div className=" flex gap-4 flex-wrap py-4 justify-center">
              <span
                onClick={() => props.setModal(false)}
                className="h-10 flex justify-center items-center w-40 border border-gray-200 rounded cursor-pointer"
              >
                Cancel
              </span>
              <span
                onClick={() => handleSubmit()}
                className="h-10 flex justify-center items-center w-40 bg-blue-500 text-white rounded cursor-pointer"
              >
                Create Event
              </span>
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full ">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Description
                        </Dialog.Title>
                        <div className="mt-2 w-full">
                          <textarea
                            name="description"
                            required
                            id=""
                            className="w-full  border border-black h-40 rounded"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default AddEvent;
