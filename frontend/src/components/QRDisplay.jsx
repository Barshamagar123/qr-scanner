import { QRCode } from "react-qr-code";

const QRDisplay = ({ value }) => {
  if (!value) {
    return <div className="p-4 bg-white inline-block">No QR value provided</div>;
  }
  return (
    <div className="p-4 bg-white inline-block">
      <QRCode value={encodeURIComponent(value)} />
    </div>
  );
};

export default QRDisplay;
