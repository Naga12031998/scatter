import { ReactElement, useState } from "react";
import ImageComponent from "./Components/ImageComponent";
import Congratulations from "./Components/Congratulations";

const App = (): ReactElement => {
  const [showImageComponent, setShowImageComponent] = useState(false);

  if (showImageComponent) {
    return <ImageComponent />;
  }
  return (
    <Congratulations
      onClick={() => {
        setTimeout(() => {
          setShowImageComponent(true);
        }, 1000);
      }}
    />
  );
};

export default App;
