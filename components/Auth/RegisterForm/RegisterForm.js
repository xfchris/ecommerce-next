import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";

export default function RegisterForm({ showLoginForm }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      registerApi(formData);
    },
  });
  return (
    <>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="validationFormikName">
          <Form.Control
            name="name"
            type="text"
            placeholder="Nombre"
            onChange={formik.handleChange}
            isInvalid={formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Control
          className="mb-3"
          name="lastname"
          type="text"
          placeholder="Apellidos"
          onChange={formik.handleChange}
          isInvalid={formik.errors.lastname}
        />
        <Form.Control
          className="mb-3"
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          onChange={formik.handleChange}
          isInvalid={formik.errors.username}
        />
        <Form.Control
          className="mb-3"
          name="email"
          type="text"
          placeholder="Email"
          onChange={formik.handleChange}
          isInvalid={formik.errors.email}
        />
        <Form.Control
          className="mb-3"
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          isInvalid={formik.errors.password}
        />
        <div className="actions d-flex justify-content-end">
          <Button
            size="sm"
            onClick={showLoginForm}
            type="button"
            variant="light"
          >
            Inciar sesión
          </Button>
          <Button size="sm" type="submit" variant="danger">
            Registrarse
          </Button>
        </div>
      </Form>
    </>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("Nombre es requerido"),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email().required(true),
    password: Yup.string().required(true),
  };
}
