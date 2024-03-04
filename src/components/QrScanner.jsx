import { QrReader } from "react-qr-reader";

const QrScanner = ({ onResult }) => {
  return (
    <QrReader
      videoId="video"
      scanDelay={500}
      delay={300}
      onResult={onResult}
      style={{ width: "100%", background: "black" }}
    />
  );
};

export default QrScanner;
