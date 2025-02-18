import AttendanceCard from "../components/AttendanceCard";
import AttendanceTab from "../components/AttendanceTab";
import Header from "../components/Header";

export default function Attendance() {

  return (
    <>
      <Header></Header>
      <div>
      
        <AttendanceCard></AttendanceCard>
        <AttendanceTab></AttendanceTab>
      </div>
    </>
  );
}
