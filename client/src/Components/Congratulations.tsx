import { ReactElement, useState } from "react";

type Props = {
  onClick: Function;
};

const Congratulations = (props: Props): ReactElement => {
  const { onClick } = props;
  const [showBlurredText, setShowBlurredText] = useState(false);

  return (
    <div
      className="congratulationsStyle"
      style={{
        filter: showBlurredText ? "initial" : "blur(.25rem)",
      }}
      onClick={() => {
        setShowBlurredText(true);
        onClick();
      }}
    >
      <h1>Hurray! Congratulations</h1>
    </div>
  );
};

export default Congratulations;
