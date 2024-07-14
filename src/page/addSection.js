import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import BASE_URL from "../env";

const validationSchema = Yup.object({
  sectionName: Yup.string()
    .min(3, "Must be more than 2 characters")
    .required("Required"),
  duration: Yup.number("Number of minutes").required("Required"),
  isMainTask: Yup.boolean(),
  image: Yup.string().url("Must be a valid URL").required("Required"),
});

const AddSection = () => {
  const formik = useFormik({
    initialValues: {
      sectionName: "",
      duration: "",
      isMainTask: true,
      sectionDescription: "",
      image: "",

      // createdAt: new Date().toISOString().split("T")[0], // Set current date as initial value
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          `${BASE_URL}/sectionManagement`,
          { ...values }

          // { ...values, createdAt: new Date().toISOString() } // Ensure createdAt is the current date-time
        )
        .then((response) => {
          console.log("Section added:", response.data);
          alert("Created Successfully!");
          // Redirect or clear form after submission
          formik.resetForm();
        })
        .catch((error) => {
          console.error("Error adding Section:", error);
          alert("Creation failed!");
        });
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Section
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="sectionName"
          name="sectionName"
          label="sectionName"
          value={formik.values.sectionName}
          onChange={formik.handleChange}
          error={
            formik.touched.sectionName && Boolean(formik.errors.sectionName)
          }
          helperText={formik.touched.sectionName && formik.errors.sectionName}
          margin="normal"
        />

        <TextField
          fullWidth
          id="duration"
          name="duration"
          label="duration"
          value={formik.values.duration}
          onChange={formik.handleChange}
          error={formik.touched.duration && Boolean(formik.errors.duration)}
          helperText={formik.touched.duration && formik.errors.duration}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              id="isMainTask"
              name="isMainTask"
              checked={formik.values.isMainTask}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label="Is Main Task"
        />

        <TextField
          fullWidth
          id="sectionDescription"
          name="sectionDescription"
          label="sectionDescription"
          value={formik.values.sectionDescription}
          onChange={formik.handleChange}
          error={formik.touched.sectionDescription && Boolean(formik.errors.sectionDescription)}
          helperText={formik.touched.sectionDescription && formik.errors.sectionDescription}
          margin="normal"
        />

        <TextField
          fullWidth
          id="image"
          name="image"
          label="image URL"
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
          margin="normal"
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddSection;
