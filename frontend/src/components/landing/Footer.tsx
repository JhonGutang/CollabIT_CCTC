import { Avatar } from "@mui/material";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  return (
    <div
      className="h-[20vh] flex justify-between text-white px-10 gap-15"
      style={{ backgroundColor: "#388DDC" }}
    >
      {/* copyrights */}
      <div className="h-full flex flex-col justify-center items-center">
        <div className="flex items-center h-fit">
          <Avatar src="/logo.png" sx={{ width: "80px", height: "80px" }} />
          <div className="text-xl">CollabIT CCTC</div>
        </div>
        <div className="text-sm">@2025 All Rights Reserved</div>
      </div>

      {/* footer navigation */}
      <div className="flex flex-col gap-2 justify-center">
        <div>Home</div>
        <div>Community</div>
        <div>About Us</div>
      </div>

      {/* contact information */}
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="me-3"
            style={{ width: "20px", height: "20px" }}
          />
          <div>jhonbarrygutang@gmail.com</div>
        </div>
        <div className="flex">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="me-3"
            style={{ width: "20px", height: "20px" }}
            />
            <div>Cabitoonan, Toledo City, Cebu</div>
        </div>
      </div>

      {/* User Interaction */}

      <div className="flex flex-col justify-center gap-2">
        <div className="flex gap-5">
          <FontAwesomeIcon
            icon={faFacebook}
            style={{ width: "30px", height: "30px" }}
          />
          <FontAwesomeIcon
            icon={faGithub}
            style={{ width: "30px", height: "30px" }}
          />
          <FontAwesomeIcon
            icon={faLinkedin}
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
