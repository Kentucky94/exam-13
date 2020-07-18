import React from 'react';
import moment from "moment";

import {Button, Card, CardBody, CardText, CardTitle, Table} from "reactstrap";
import StarRatings from "react-star-ratings";
import {useDispatch, useSelector} from "react-redux";
import {deleteReview} from "../../store/actions/reviewsActions";

const ReviewCard = props => {
  const date = moment(props.date).format('MMMM Do YYYY, HH:mm:ss');
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  return (
    <Card>
      <CardBody>
        <CardTitle className='font-weight-bold'>{props.user} posted on {date}:</CardTitle>

        <CardText>{props.comment}</CardText>

        <Table borderless>
          <thead>
          <tr>
            <th>Quality of food:</th>
            <th>Service:</th>
            <th>Interior:</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <StarRatings
                rating={props.foodRating}
                starRatedColor="#00008B"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="5px"
              />
            </td>
            <td>
              <StarRatings
                rating={props.serviceRating}
                starRatedColor="#00008B"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="5px"
              />
            </td>
            <td>
              <StarRatings
                rating={props.interiorRating}
                starRatedColor="#00008B"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="5px"
              />
            </td>
          </tr>
          </tbody>
        </Table>

        {user && user.role === 'admin' ?
          <Button color='danger' onClick={() => dispatch(deleteReview(props.id, props.venueId))}>Delete</Button> :
          null
        }
      </CardBody>
    </Card>
  );
};

export default ReviewCard;