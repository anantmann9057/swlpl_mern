import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFilePicker } from "use-file-picker";
import { Col, Row } from "react-bootstrap";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import { setKey, fromLatLng } from "react-geocode";

import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function AttendanceCard() {
  const [clockStatus, setClockStatus] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [address, setAddress] = useState();
  const auth = localStorage.getItem("token");
  setKey("AIzaSyCBSE9f-8MEb5om7pzPBJo1yt-9ObNYhA4"); // Your API key here.
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [image, updateImage] = useState();

  const [locationLoading, setLocationLoading] = useState(true);

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
      setOpen(true);
      navigator.geolocation.getCurrentPosition((success, error) => {
        if (error) {
          toast("Failed to fetch Location!");
          setCurrentLocation(null);
        }

        setLocationLoading(false);
        setCurrentLocation(success.coords);

        console.log(success.coords.latitude, success.coords.longitude);

        fromLatLng(success.coords.latitude, success.coords.longitude)
          .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            setAddress(results[0].formatted_address);
            console.log(results[0].formatted_address);
          })
          .catch(console.error);
      });
      axios
        .post(
          import.meta.env.VITE_SERVER_BASE_URL + "/attendance/attendanceStatus",
          {
            authToken: localStorage.getItem("token"),
          }
        )
        .then((response) => {
          setOpen(false);

          if (response.data.status == "3") {
            localStorage.clear();
          }
          toast(response.data.status.message);
          var clock = response.data.clock_status;
          setClockStatus(clock);
          console.log(response);
          console.log(clockStatus);
        })
        .catch((e) => {
          setOpen(false);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const postAttendance = (base64Image) => {
    console.log(clockStatus);
    if (!auth) {
      navigate("/login");
    }

    setOpen(true);
    axios
      .post(
        import.meta.env.VITE_SERVER_BASE_URL + "/attendance/markAttendance",
        {
          authToken: localStorage.getItem("token"),
          clock_status: clockStatus,
          distance: "20",
          long: currentLocation.longitude,
          lat: currentLocation.latitude,
          image: base64Image,
        },
        {}
      )
      .then((response) => {
        setOpen(false);

        if (response.data.status == "3") {
          localStorage.clear();
        }
        toast(response.data.message);

        console.log(response.data);
      })
      .catch(function (error) {
        setOpen(false);

        // handle error
        console.log(error);
      })
      .finally(function () {
        setOpen(false);

        // always executed
      });
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById("atn_image"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;

    postAttendance(data);
    link.download = "downloaded-image.jpg";
  };
  return (
    <div className="container-fluid">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />

      <Row className="w-100 m-2 p-2">
        <Col className="w-50">
          <Card className="text-center">
            <Card.Header>Attendance</Card.Header>
            <Card.Body>
              {locationLoading ? (
                <CircularProgress></CircularProgress>
              ) : (
                <div>
                  <Card.Title>
                    {currentLocation
                      ? `${currentLocation.latitude} , ${currentLocation.longitude}`
                      : "Failed to fetch location"}
                  </Card.Title>
                  <Card.Text>
                    {address ? address : "Failed to fetch location"}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="m-2 w-100 container-fluid"
                    onClick={() => {
                      if (!image) {
                        openFilePicker();
                      } else {
                        handleDownloadImage();
                      }
                    }}
                  >
                    {image
                      ? `${clockStatus == 1 ? "Clock IN" : "Clock OUT"}`
                      : "Select Image"}
                  </Button>
                </div>
              )}
              <div className="container-fluid" id="atn_image">
                <div className="card bg-dark text-white">
                  {image ? (
                    <>
                      <img
                        className="container-fluid"
                        src={image}
                        alt={image.name}
                        style={{
                          backgroundImage: `${image}`,
                          objectFit: "fill",
                          maxHeight: "100vh",
                        }}
                      ></img>
                      <div
                        className="card-img-overlay container"
                        style={{
                          color: "white",
                          maxHeight: "25vh",
                        }}
                      >
                        {localStorage.getItem("user") ? (
                          <h6
                            className="card-title"
                            style={{
                              textAlign: "start",
                              fontSize: "10px",
                            }}
                          >
                            {`${
                              JSON.parse(localStorage.getItem("user"))
                                .first_name
                            } `}
                            {`${
                              JSON.parse(localStorage.getItem("user")).last_name
                            } `}
                            ({JSON.parse(localStorage.getItem("user")).emp_id})
                          </h6>
                        ) : (
                          {}
                        )}
                        <h6
                          className="card-title "
                          style={{
                            textAlign: "start",
                            fontSize: "10px",
                          }}
                        >
                          {address ? address : ""} ,{" "}
                        </h6>
                        <h6
                          className="card-title "
                          style={{
                            textAlign: "start",
                            fontSize: "10px",
                          }}
                        >
                          {currentLocation ? currentLocation.latitude : ""} ,{" "}
                          {currentLocation ? currentLocation.longitude : ""}
                        </h6>

                        <h6
                          className="card-title "
                          style={{
                            textAlign: "start",
                            fontSize: "10px",
                          }}
                        >
                          {new Date().toLocaleDateString()}{" "}
                          {new Date().toLocaleTimeString()}
                        </h6>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </Card.Body>
            <Card.Footer
              className={`text-muted ${
                clockStatus == 2 ? "bg-success" : "bg-danger"
              }`}
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              <h6
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {clockStatus == 2 ? "Clocked IN" : "Clocked OUT"}
              </h6>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
