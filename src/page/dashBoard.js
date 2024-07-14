import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, TextField, FormControlLabel, Switch } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BASE_URL from '../env';

const validationSchema = Yup.object({
  sectionName: Yup.string()
    .min(3, "Must be more than 2 characters")
    .required("Required"),
  duration: Yup.number("Number of minutes").required("Required"),
  isMainTask: Yup.boolean(),
  sectionDescription: Yup.string().required("Required"),

  image: Yup.string().url("Must be a valid URL").required("Required"),
});

const Dashboard = () => {
  const [section, setSection] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    axios.get(`${BASE_URL}/sectionManagement`)
      .then(response => {
        setSection(response.data);
        setLoading(false); // Update loading state after data fetch
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data'); // Set error state for error handling
        setLoading(false); // Update loading state in case of error
      });
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      axios.delete(`${BASE_URL}/sectionManagement/${deleteId}`)
        .then(() => {
          // Update state after successful delete
          setSection(prevSection => prevSection.filter(member => member.id !== deleteId));
          setDeleteDialogOpen(false);
        })
        .catch(error => {
          console.error('Error deleting staff:', error);
        });
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  // const handleEdit = (member) => {
  //   setCurrentSection(member);
  //   setEditDialogOpen(true);
  // };

  // const handleCloseEdit = () => {
  //   setCurrentSection(null);
  //   setEditDialogOpen(false);
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     sectionName: currentSection ? currentSection.sectionName : '',
  //     duration: currentSection ? currentSection.duration : '',
  //     isMainTask: currentSection ? currentSection.isMainTask : '',
  //     sectionDescription: currentSection ? currentSection.sectionDescription : '',
  //     image: currentSection ? currentSection.image : '',
  //     // createdAt: currentStaff ? currentStaff.createdAt : '',
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     if (currentSection) {
  //       axios.put(`${BASE_URL}/sectionManagement/${currentSection.id}`, values)
  //         .then(response => {
  //           // Update staff state after successful edit
  //           setSection(prevSection => prevSection.map(member => member.id === currentSection.id ? response.data : member));
  //           handleCloseEdit();
  //         })
  //         .catch(error => {
  //           console.error('Error updating section:', error);
  //         });
  //     }
  //   },
  //   enableReinitialize: true, // Reinitialize form when currentStaff changes
  // });

  return (
    <div>
      <Typography variant="h6" style={{ marginLeft: '20px' }}>
        <Link to="/add" style={{ color: 'inherit', textDecoration: 'none' }}>Create Section</Link>
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Section Name</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>sectionDescription</TableCell>
                <TableCell>Image</TableCell>
                {/* <TableCell>Created At</TableCell> */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {section.map(sectio => (
                <TableRow key={sectio.id}>
                  <TableCell>{sectio.sectionName}</TableCell>
                  <TableCell>{sectio.duration}</TableCell>
                  <TableCell>{sectio.sectionDescription}</TableCell>
                  <TableCell>
                    <img src={sectio.image} alt={sectio.name} style={{ width: '100px', height: 'auto' }} />
                  </TableCell>
                  {/* <TableCell>{new Date(sectio.createdAt).toLocaleDateString()}</TableCell> */}
                  <TableCell>
                    <IconButton component={Link} to={`/detail/${sectio.id}`}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(sectio)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(sectio.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this Staff?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog open={editDialogOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Staff</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="sectionName"
              name="sectionName"
              label="sectionName"
              value={formik.values.sectionName}
              onChange={formik.handleChange}
              error={formik.touched.sectionName && Boolean(formik.errors.sectionName)}
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
              type="sectionDescription"
              value={formik.values.sectionDescription}
              onChange={formik.handleChange}
              error={formik.touched.sectionDescription && Boolean(formik.errors.sectionDescription)}
              helperText={formik.touched.sectionDescription && formik.errors.sectionDescription}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default Dashboard;
