import React from 'react';
import StarRatings from "react-star-ratings";
import {useDispatch, useSelector} from "react-redux";

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import {deleteVenue} from "../../store/actions/venuesActions";

const VenueCard = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  return (
    <Card className='col-4 mb-4 p-2'>
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
        {user && user.role === 'admin' ?
          <Button color='danger' onClick={() => dispatch(deleteVenue(props.id))}>Delete</Button> :
          null
        }
      </CardBody>
    </Card>
  );
};

export default VenueCard;