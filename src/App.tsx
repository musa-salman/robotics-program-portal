import  EventContainerShow  from './events/EventContainer';
import './App.css'
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

function App() {
  return (
    <>
      <EventContainerShow eventsProps={[]} />
    </>
  )
}

const events = [
  {
    date: "2024-05-22",
    title: "גשדג",
    details: "יוומנט",
    image: "event1.jpg",
    id:1,
    isAdmin: true
  },
  {
  
    date: "2024-05-22",
    title: "Event 2",
    details: "Event 2 details",
    image: "event2.jpg",
    id:2,
    isAdmin: true
  },
  {
    date: "2024-05-22",
    title: "Event 3",
    details: "Event 3 details",
    image: "event3.jpg",
    id:3,
    isAdmin: true
  },
  {
    date: "2024-05-22",
    title: "Event 4",
    details: "Event 3 details",
    image: "event3.jpg",
    id:4,
    isAdmin: true
  },
  // {
  //   date: "2024-05-22",
  //   title: "Event 5",
  //   details: "Event 3 details",
  //   image: "event3.jpg"
  // },
  // {
  //   date: "2024-05-22",
  //   title: "Event 6",
  //   details: "Event 3 details",
  //   image: "event3.jpg"
  // },
  // {
  //   date: "2024-05-22",
  //   title: "Event 7",
  //   details: "Event 3 details",
  //   image: "event3.jpg"
  // },
  // Add more events as needed
];

export default App
