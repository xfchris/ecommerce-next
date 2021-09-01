import { useFormik } from "formik";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { updateNameApi } from "../../../../api/user";
import ButtonLoading from "../../../ButtonLoading/ButtonLoading";

export default function ChangeNameForm({ user, logout, reloadUser }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      lastname: user?.lastname,
    },
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateNameApi(formData, user._id, logout);
      setLoading(false);

      if (response?.statusCode?.toString().startsWith("40")) {
        toast.error("No tienes permisos para hacer esto");
      } else if (!response) {
        toast.error("Error al actualizar datos");
      } else {
        toast.success("Datos actualizados");
        reloadUser()
      }
    },
  });

  return (
    <div className="change-name-form">
        <h4>Cambiar Nombre y apellidos</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col sm={6}>
            <Form.Control
              name="name"
              placeholder="Tu nuevo nombre"
              onChange={formik.handleChange}
              defaultValue={formik.values.name}
              isInvalid={formik.errors.name}
            />
          </Col>
          <Col sm={6}>
            <Form.Control
              name="lastname"
              placeholder="Tu nuevo apellido"
              onChange={formik.handleChange}
              defaultValue={formik.values.lastname}
              isInvalid={formik.errors.lastname}
            />
          </Col>
        </Row>
        <ButtonLoading
          variant="danger"
          type="submit"
          className="mt-4"
          loading={loading}
        >
          Actualizar
        </ButtonLoading>
      </Form>
    </div>
  );
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}
