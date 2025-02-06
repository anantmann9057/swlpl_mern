import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFilePicker } from "use-file-picker";
import { Col, Row } from "react-bootstrap";

export default function AttendanceCard() {
  const [clockStatus, setClockStatus] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const auth = localStorage.getItem("token");

  const [image, updateImage] = useState();
  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    onFilesSelected: ({ plainFiles, filesContent, errors }) => {
      // this callback is always called, even if there are errors
      console.log("onFilesSelected", plainFiles, filesContent, errors);
      updateImage(filesContent[0].content);
    },
    onFilesRejected: ({ errors }) => {
      // this callback is called when there were validation errors
      console.log("onFilesRejected", errors);
    },
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      // this callback is called when there were no validation errors
      var formData = new FormData();
      var imagefile = plainFiles[0];
      formData.append("file", imagefile);

      console.log("onFilesSuccessfullySelected", plainFiles, filesContent);
    },
  });

  useEffect(() => {
    if (auth) {
      navigator.geolocation.getCurrentPosition((success) => {
        setCurrentLocation(success.coords);
        console.log(success.coords.latitude, success.coords.longitude);
      });
      axios
        .post("http://localhost:3000/attendance/attendanceStatus", {
          authToken: localStorage.getItem("token"),
        })
        .then((response) => {
          if (response.data.status == "3") {
            localStorage.clear();
          }
          var clock = response.data["clock_status"];
          setClockStatus(clock);
          console.log(response);
        });
    }
  }, []);

  return (
    <div className="container-fluid">
      <Row className="w-100 m-2 p-2">
        <Col className="w-50">
          <Card className="text-center">
            <Card.Header>Attendance</Card.Header>
            <Card.Body>
              <Card.Title>Attendance Status </Card.Title>
              <Card.Text>
                {clockStatus == 2 ? "Clocked IN" : "Clocked OUT"}
              </Card.Text>
              <Card.Text>
                {currentLocation
                  ? `${currentLocation.latitude} , ${currentLocation.longitude}`
                  : "Failed to fetch location"}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  openFilePicker();
                }}
              >
                Mark Attendance
              </Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        </Col>
        <Col className="w-50">
          {image ? (
            <img
            className="container"
              src={image}
              alt={image.name}
              style={{
                objectFit: "contain",
                maxHeight:'35vh'
              }}
            ></img>
          ) : (
            "Upload Image"
          )}
        </Col>
      </Row>
    </div>
  );
}
