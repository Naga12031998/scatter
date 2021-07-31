import { ReactElement } from "react";
import Modal from "react-modal";
import "../App.css";

type Props = {
  isModalOpen: boolean;
  onRequestClose: Function;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    background: "linear-gradient(10deg, white 70%, #ffeb00 30%)",
  },
};

const ReactModal = (props: Props): ReactElement => {
  const { isModalOpen, onRequestClose } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={(): void => {
        onRequestClose();
      }}
      style={customStyles}
    >
      <div className="modalHeaderStyle">
        <div />
        <div
          className="cursorStyle"
          onClick={(): void => {
            onRequestClose();
          }}
        >
          <span className="material-icons md-50">highlight_off</span>
        </div>
      </div>
      <h2>This asset is a giveaway to you from our side</h2>
    </Modal>
  );
};

export default ReactModal;
