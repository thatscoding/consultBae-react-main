import { useState } from "react";
import AddEvent from "./AddEvent";
import { ListEvent } from "./ListEvent";

export default function App() {
  const [modal, setModal] = useState(true);

  return modal ? (
    <AddEvent setModal={setModal} />
  ) : (
    <ListEvent setModal={setModal} />
  );
}
