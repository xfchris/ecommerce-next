import { useFormik } from "formik";
import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { loginApi, resetPasswordApi } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm({ showRegisterForm, setShowModal }) {
  const [loading, setLoading] = useState(false);
  const [loadingRP, setLoadingRP] = useState(false);

  const { login, auth } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      setLoading(false);

      if (response?.jwt) {
        login(response.jwt);
        setShowModal(false);
      } else if (response?.error) {
        let msg = response.data[0].messages[0].message;
        toast.error(msg);
      } else {
        console.log(response);
        toast.error("Error al registrar el usuario");
      }
    },
  });

  const resetPassword = async () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      setLoadingRP(true);
      const response = await resetPasswordApi(formik.values.identifier);
      setLoadingRP(false);

      if (response?.error) {
        toast.error("Error al intentar recuperar contraseña");
      } else {
        //toast.success("Siguiente paso...");
      }
    }
  };

  return (
    <>
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Control
          className="mb-3"
          name="identifier"
          type="text"
          placeholder="Email"
          onChange={formik.handleChange}
          isInvalid={formik.errors.identifier}
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
            onClick={showRegisterForm}
            type="button"
            variant="light"
          >
            Registrarse
          </Button>

          <div>
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
                "Iniciar sesión"
              )}
            </Button>

            <Button
              size="sm"
              onClick={resetPassword}
              type="button"
              variant="info"
              disabled={loadingRP}
            >
              {loadingRP ? (
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
                "¿Has olvidado la contraseña?"
              )}
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().email().required(true),
    password: Yup.string().required(true),
  };
}
