import { Button, Spinner } from "react-bootstrap";

export default function ButtonLoading({
  children,
  onClick,
  loading,
  ...rest
}) {
  return (
    <Button onClick={onClick} disabled={loading} {...rest}>
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-1"
          />{" "}
          Espere...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
