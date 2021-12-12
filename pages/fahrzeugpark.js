import { useEffect } from "react";
export default function Fahrzeugpark() {
  // Works when host file from 127.0.0.1 is set to autokueng.ch for dev enviroment
  // When production, it sould work by default
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.autoscout24.ch/MVC/Content/as24-hci-desktop/js/e.min.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      //document.head.removeChild(script);
    };
  }, []);
  return (
    <div>
      <div id="autoscout24">
        <h2>Autoscout24</h2>
        <div
          data-embedded-src="https://www.autoscout24.ch/de/hci/list?design=846&filter=1276"
          className="embedded-content-area"
          style={{ padding: "0px", zoom: "1", position: "relative" }}
        ></div>
      </div>
    </div>
  );
}