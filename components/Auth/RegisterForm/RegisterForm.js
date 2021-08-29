import { useFormik } from "formik";
import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";

export default function RegisterForm({ showLoginForm }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registerApi(formData);
      setLoading(false);

      if (response?.jwt) {
        toast.success("Registro completado.");
        showLoginForm();
      } else if (response?.error) {
        let msg = response.data[0].messages[0].message;
        toast.error(msg);
      } else {
        console.log(response);
        toast.error("Error al registrar el usuario");
      }
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
        <div className="actions d-flex justify-content-between">
          <Button
            size="sm"
            onClick={showLoginForm}
            type="button"
            variant="light"
          >
            Inciar sesión
          </Button>
          <Button size="sm" type="submit" variant="danger" disabled={loading}>
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
              "Registrarse"
            )}
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
