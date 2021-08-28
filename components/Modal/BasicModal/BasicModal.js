import { Button, Modal } from "react-bootstrap";

export default function BasicModal({
  show,
  setShow,
  title,
  children,
  ...rest
}) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="basic-modal"
        {...rest}
      >
        <Modal.Header className="bg-danger text-light">
          <Modal.Title>
            {title}
          </Modal.Title>
          <button
            type="button"
            className="btn-close text-light"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
