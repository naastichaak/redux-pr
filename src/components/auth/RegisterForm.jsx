import {
  Stack,
  Button,
  Wrap,
  Alert,
  AlertIcon,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/auth/authActions";
import { registerService } from "../../services/authServices";
import { useState } from "react";
import InputField from "../InputField";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(50, "Username cannot be longer than 50")
    .required("Username is required"),
  password: yup.string().min(8).max(255).required("Password is required"),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

function RegisterForm() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      setError(null);

      registerService(values)
        .then((data) => {
          dispatch(loginAction(data));
        })
        .catch((err) => setError(err.response.data.message))
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <Stack as="form" onSubmit={formik.handleSubmit}>
      <InputField
        label="Username"
        placeholder="Username"
        required
        meta={formik.getFieldMeta("username")}
        {...formik.getFieldProps("username")}
      />

      <InputField
        label="Password"
        placeholder="Password"
        required
        meta={formik.getFieldMeta("password")}
        {...formik.getFieldProps("password")}
        type="password"
      />

      <ButtonGroup>
        <InputField
          label="First Name"
          placeholder="First Name"
          required
          meta={formik.getFieldMeta("firstName")}
          {...formik.getFieldProps("firstName")}
        />

        <InputField
          label="Last Name"
          placeholder="Last Name"
          required
          meta={formik.getFieldMeta("lastName")}
          {...formik.getFieldProps("lastName")}
        />
      </ButtonGroup>

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Wrap>
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          Register
        </Button>
        <Button as={Link} to="/login" variant="ghost">
          Login
        </Button>
      </Wrap>
    </Stack>
  );
}

export default RegisterForm;
