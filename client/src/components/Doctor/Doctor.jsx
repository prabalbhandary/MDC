import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Doctor = ({ doctor }) => {
  const navigate = useNavigate();
  const startTime = moment(doctor.timings[0], "HH:mm");
  const endTime = moment(doctor.timings[1], "HH:mm");
  const duration = moment.duration(endTime.diff(startTime));
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => {
        navigate(`/book-appointment/${doctor._id}`);
      }}
    >
      <h1 className="cardtitle">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone number: </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address: </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee Per Visit: </b>
        {doctor.feePerConsultation}
      </p>
      <p>
        <b>Specialization: </b>
        {doctor.specialization}
      </p>
      <p>
        <b>Timings: </b>
        {doctor.timings[0]} - {doctor.timings[1]} ({hours}h {minutes}m)
      </p>
    </div>
  );
};

export default Doctor;
