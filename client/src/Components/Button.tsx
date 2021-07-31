import { ReactElement } from "react";
import "../App.css";

type Props = {
  text: string;
  onClick: Function;
};

const Button = (props: Props): ReactElement => {
  const { text, onClick } = props;

  return (
    <div
      className="buttonBackgroundStyle"
      onClick={(): void => {
        onClick();
      }}
    >
      <p className="buttonTextStyle">{text}</p>
    </div>
  );
};

export default Button;
