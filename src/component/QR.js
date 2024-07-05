import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QR = (value) => {
  console.log(value);
  return (
    <div
      style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}
    >
      <QRCodeSVG value={"Www.google.com"} />,
    </div>
  );
};

export default QR;
