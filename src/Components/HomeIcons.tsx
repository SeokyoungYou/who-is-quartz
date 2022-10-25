import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";
import { useState } from "react";

const Icons = styled.div`
  font-size: 72px;
  width: 150px;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
`;
// Fontawsome icons
const BLANK_FACE_ICON = regular("face-meh-blank");
const SMILE_FACE_ICON = solid("face-smile");
const DIZZY_FACE_ICON = solid("face-dizzy");
// types
interface IconInterface {
  color: string;
  iconName: IconDefinition;
}

function HomeIcons() {
  // Icon states
  const [firstIconState, setFirstIconState] = useState<boolean>(false);
  const [secondIconState, setSecondIconState] = useState<boolean>(false);

  // Create Icons
  let firstIcon: IconInterface = {
    color: "black",
    iconName: BLANK_FACE_ICON,
  };
  let secondIcon: IconInterface = {
    color: "black",
    iconName: BLANK_FACE_ICON,
  };
  // Toggle icons by clicking event
  if (firstIconState) {
    firstIcon.color = "#6BCB77";
    firstIcon.iconName = SMILE_FACE_ICON;
  }
  if (secondIconState) {
    secondIcon.color = "#FF6B6B";
    secondIcon.iconName = DIZZY_FACE_ICON;
  }
  const toggleIcon = (icon: "first" | "second") => {
    if (icon === "first") {
      setFirstIconState((prev) => !prev);
    } else {
      setSecondIconState((prev) => !prev);
    }
  };
  return (
    <Icons>
      <FontAwesomeIcon
        icon={firstIcon.iconName}
        onClick={toggleIcon.bind(null, "first")}
        style={{ color: firstIcon.color, cursor: "pointer" }}
      />
      <FontAwesomeIcon
        icon={secondIcon.iconName}
        onClick={toggleIcon.bind(null, "second")}
        style={{ color: secondIcon.color, cursor: "pointer" }}
      />
    </Icons>
  );
}
export default HomeIcons;
