import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import BASE_URL from '../env';

const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: '20px auto',
  padding: '20px',
  position: 'relative',
});

const StyledMedia = styled(CardMedia)({
  height: 200,
});

const Ribbon = styled('div')({
  position: 'absolute',
  top: '10px',
  right: '-10px',
  backgroundColor: '#ff6347',
  color: 'white',
  padding: '5px 15px',
  transform: 'rotate(45deg)',
  zIndex: 1,
});

const Detail = () => {
  const { id } = useParams();
  const [section, setSection] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/sectionManagement/${id}`)
      .then(response => {
        setSection(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!section) {
    return <div>Loading...</div>;
  }

  return (
    <StyledCard>
      {section.isMainTask && <Ribbon>Main Task</Ribbon>}
      <StyledMedia
        image={section.image}
        title={section.sectionName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {section.sectionName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Description: {section.sectionDescription}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Duration: {section.duration}
        </Typography>
        
        {/* <Typography variant="body2" color="textSecondary" component="p">
          Created Date: {new Date(section.createdAt).toLocaleDateString()}
        </Typography> */}
        
      </CardContent>
    </StyledCard>
  );
};

export default Detail;
