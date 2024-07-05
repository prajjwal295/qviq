import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QR = (value) => {
  console.log(value);
  return (
    <div
      style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}
    >
      <QRCodeSVG value={"localhost:3000/profile/668832e6a6ba5dad10ce60b5"} />,
    </div>
  );
};

export default QR;
