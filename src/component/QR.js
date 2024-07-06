import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QR = (value) => {
  console.log(value.value);
  return (
    <div className="flex flex-col gap-4 justify-center items-center border-2 border-solid">
      <div className="font-bold text-2xl">Your Personalised QR</div>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCodeSVG
          value={`https://qviq-three.vercel.app/profile/${value.value}`}
        />
        ,
      </div>
    </div>
  );
};

export default QR;
