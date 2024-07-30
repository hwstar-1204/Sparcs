import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import PropTypes from "prop-types";

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props) => {
  let config = {
    fps: props.fps,
    qrbox: props.qrbox,
    aspectRatio: props.aspectRatio,
    disableFlip: props.disableFlip,
  };
  return config;
};

const Html5QrcodePlugin = ({
  fps,
  qrbox,
  aspectRatio,
  disableFlip,
  verbose,
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
  width,
  height,
}) => {
  const html5QrCode = useRef(null);

  useEffect(() => {
    const config = createConfig({ fps, qrbox, aspectRatio, disableFlip });

    html5QrCode.current = new Html5Qrcode(qrcodeRegionId);

    html5QrCode.current.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback,
      qrCodeErrorCallback
    );

    return () => {
      if (html5QrCode.current) {
        html5QrCode.current.stop().catch((err) => console.error(err));
      }
    };
  }, [
    fps,
    qrbox,
    aspectRatio,
    disableFlip,
    qrCodeSuccessCallback,
    qrCodeErrorCallback,
  ]);

  return (
    <div
      id={qrcodeRegionId}
      style={{ width: width || "100%", height: height || "100%" }}
    />
  );
};

Html5QrcodePlugin.propTypes = {
  fps: PropTypes.number,
  qrbox: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  aspectRatio: PropTypes.number,
  disableFlip: PropTypes.bool,
  verbose: PropTypes.bool,
  qrCodeSuccessCallback: PropTypes.func.isRequired,
  qrCodeErrorCallback: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Html5QrcodePlugin;
