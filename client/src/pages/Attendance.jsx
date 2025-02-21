import AppAppBar from "../components/AppBar";
import AttendanceCard from "../components/AttendanceCard";
import AttendanceTab from "../components/AttendanceTab";

export default function Attendance() {

  return (
    <div className="mt-5">
      <AppAppBar></AppAppBar>
      <div>
      
        <AttendanceCard></AttendanceCard>
        <AttendanceTab></AttendanceTab>
      </div>
    </div>
  );
}
