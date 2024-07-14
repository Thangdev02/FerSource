import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import BASE_URL from '../env';

const Root = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '20px',
});

const StyledCard = styled(Card)({
  width: '300px',
  margin: '10px',
});

const StyledMedia = styled(CardMedia)({
  height: 140,
});

const Home = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/sectionManagement`)
      .then(response => {
        const mainTaskStaffs = response.data.filter(sections => sections.isMainTask === true);
        setSections(mainTaskStaffs);
        console.log("asdasdas");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Section List
      </Typography>
      <Root>
        {sections.map(section => (
          <StyledCard key={section.id}>
            <StyledMedia
              image={section.image}
              title={section.sectionName}
            />
            <CardContent>
            <Link to={`/detail/${section.id}`} style={{ textDecoration: 'none' }}>
              <Typography variant="h5" component="h2">
                {section.sectionName}
              </Typography>
              </Link>


              <Typography variant="body2" color="textSecondary" component="p">
                Duration: {section.duration}
              </Typography>
              
            </CardContent>
          </StyledCard>
        ))}
      </Root>
    </div>
  );
};

export default Home;
