import { FaAsterisk } from "../../utils/icons";

function RequiredField() {
  return (
    <>
      <div className="centered-container required-wrapper">
        <FaAsterisk className="required-icon" />
        <div className="required-text">Required Field</div>
      </div>
    </>
  );
}

export default RequiredField;
