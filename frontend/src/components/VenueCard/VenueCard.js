import React from 'react';
import StarRatings from "react-star-ratings";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {deleteVenue} from "../../store/actions/venuesActions";

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

const VenueCard = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  return (
    <Card className='col-sm-6 col-md-4 mb-4 p-2'>
      <CardImg top width="100%" height="45%" src={`http://localhost:8080/uploads/${props.image}`} alt="Card image cap" />
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardText>{props.description}</CardText>
        <div className='w-100 py-3 flex-grow-1'>
          <StarRatings
            rating={props.rating}
            starRatedColor="#00008B"
            numberOfStars={5}
            name='rating'
            starDimension="20px"
            starSpacing="5px"
          />
          <span className='pl-2'>({props.rating})</span>
        </div>
        <div className='d-flex justify-content-between'>
          <Button tag={NavLink} to={`venues/${props.id}`} color='primary'>
            See more
          </Button>

          {user && user.role === 'admin' ?
            <Button color='danger' onClick={() => dispatch(deleteVenue(props.id))}>
              Delete
            </Button> :
            null
          }
        </div>
      </CardBody>
    </Card>
  );
};

export default VenueCard;