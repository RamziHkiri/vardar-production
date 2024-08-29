import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
interface Event {
  title: string;
  start: Date;
  end: Date;
}
interface MyCalendarProps {
  events: Event[];
}

const MyCalendar: React.FC<MyCalendarProps> = ({ events }) => {
  
  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100vh' }}
      />
    </div>
  )
}
 
 
;

export default MyCalendar;
