import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

const VenueCard = props => {
  return (
    <Card className='col-4 mb-4'>
      <CardImg top width="100%" src={`http://localhost:8080/uploads/${props.image}`} alt="Card image cap" />
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardText>{props.description}</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};

export default VenueCard;