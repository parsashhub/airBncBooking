import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import TextField from "../../../component/customTextField.jsx";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(4),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("/api/users", values);
        toast.success("user created successfully");
        navigate("/");
      } catch (e) {
        toast.error(e.message);
      }
    },
  });
  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;

  return (
    <div className="flex items-center justify-around grow">
      <Card
        className="shadow-lg shadow-gray-400 flex flex-col items-center w-[40%] p-4"
        sx={{ borderRadius: "25px" }}
      >
        <Typography variant="h4" className="my-4">
          SignUp
        </Typography>
        <CardContent className="flex flex-col w-[80%] gap-4">
          <TextField
            name="name"
            label="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched["name"] && errors["name"]}
            error={!!(touched["name"] && errors["name"])}
          />
          <TextField
            name="email"
            label="Email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched["email"] && errors["email"]}
            error={!!(touched["email"] && errors["email"])}
          />
          <TextField
            name="password"
            label="Password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched["password"] && errors["password"]}
            error={!!(touched["password"] && errors["password"])}
            type="password"
          />
        </CardContent>
        <CardActions className="w-full flex flex-col justify-center gap-4">
          <Button
            variant="contained"
            className="w-[80%] h-12 bg-primary"
            sx={{ borderRadius: "25px" }}
            onClick={() => handleSubmit()}
          >
            SignUp
          </Button>
          <div className="text-gray-500">
            Already a member?{" "}
            <Link className="underline" to="/auth/login">
              Login
            </Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default SignUp;
