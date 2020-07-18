import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Button, Container, Form, FormGroup, Input, Label, Table} from "reactstrap";
import StarRatings from "react-star-ratings";

import {getVenue} from "../../store/actions/venuesActions";
import {getVenueReviews, postReview} from "../../store/actions/reviewsActions";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

class VenuePage extends Component {
  state = {
    comment: '',
    foodRating: 0,
    serviceRating: 0,
    interiorRating: 0,
  };

  async componentDidMount() {
    await this.props.getVenue(this.props.match.params.venueId);
    await this.props.getReviews(this.props.match.params.venueId);
  }

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  ratingChangeHandler = event => {
    this.setState({[event.target.name]: parseInt(event.target.value)})
  };

  fileChangeHandler = event => {
    this.setState({[event.target.name]: event.target.files[0]})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.postReview(this.props.match.params.venueId, {...this.state});
  };

  render() {
    let title = null;
    let description = null;
    let image = null;
    let overallRating = 0;
    let foodRating = 0;
    let serviceRating = 0;
    let interiorRating = 0;

    let galleryImages = null;
    let reviews = this.props.reviews.map(rew => {
      return <ReviewCard
        key={rew._id}
        id={rew._id}
        venueId={this.props.match.params.venueId}
        comment={rew.comment}
        foodRating={rew.foodRating}
        serviceRating={rew.serviceRating}
        interiorRating={rew.interiorRating}
        user={rew.user.displayName}
        date={rew.createdOn}
      />
    });

    if(this.props.venue){
      title = this.props.venue.title;
      description = this.props.venue.description;
      image = this.props.venue.mainImage;
      overallRating = this.props.venue.overallRating;
      foodRating = this.props.venue.foodRating;
      serviceRating = this.props.venue.serviceRating;
      interiorRating = this.props.venue.interiorRating;
    }

    return (
      <Container>
        <div className='head d-flex justify-content-between border border-dark rounded p-4 my-4'>
          <div className='w-50 p-4'>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className='w-50 p-4'>
            <img className='w-100' src={`http://localhost:8080/uploads/${image}`} alt=""/>
          </div>
        </div>

        <div className='gallery border border-dark rounded p-4 my-4'>
          <h4>Gallery:</h4>
          <div className='d-flex flex-wrap'>
            {galleryImages}
          </div>
        </div>

        <div className='ratings border border-dark rounded p-4 my-4'>
          <h4>Ratings:</h4>

          <Table borderless>
            <thead>
            <tr>
              <th>Overall:</th>
              <th>Quality of food:</th>
              <th>Service:</th>
              <th>Interior:</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <StarRatings
                  rating={overallRating}
                  starRatedColor="#00008B"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                  starSpacing="5px"
                />
                <span className='pl-2'>({overallRating})</span>
              </td>
              <td>
                <StarRatings
                  rating={foodRating}
                  starRatedColor="#00008B"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                  starSpacing="5px"
                />
                <span className='pl-2'>({foodRating})</span>
              </td>
              <td>
                <StarRatings
                  rating={serviceRating}
                  starRatedColor="#00008B"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                  starSpacing="5px"
                />
                <span className='pl-2'>({serviceRating})</span>
              </td>
              <td>
                <StarRatings
                  rating={interiorRating}
                  starRatedColor="#00008B"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                  starSpacing="5px"
                />
                <span className='pl-2'>({interiorRating})</span>
              </td>
            </tr>
            </tbody>
          </Table>
        </div>

        <div className='reviews border border-dark rounded p-4 my-4'>
          <h4>Reviews:</h4>
          <div className='d-flex flex-wrap'>
            {reviews}
          </div>
        </div>

        <div className='reviews_add border border-dark rounded p-4 my-4'>
          <Form>
            <FormGroup>
              <Label for="exampleText">Leave a comment</Label>
              <Input
                type="textarea"
                name="comment"
                id="exampleText"
                value={this.state.comment}
                onChange={this.inputChangeHandler}
              />
            </FormGroup>

            <div className='row'>
              <FormGroup className='col-sm-4'>
                <Label for="exampleSelect">Food Quality</Label>
                <Input
                  type="select"
                  name="foodRating"
                  id="exampleSelect"
                  value={this.state.foodRating}
                  onChange={this.ratingChangeHandler}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>

              <FormGroup className='col-sm-4'>
                <Label for="exampleSelect">Service</Label>
                <Input
                  type="select"
                  name="serviceRating"
                  id="exampleSelect"
                  value={this.state.serviceRating}
                  onChange={this.ratingChangeHandler}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>

              <FormGroup className='col-sm-4'>
                <Label for="exampleSelect">Interior</Label>
                <Input
                  type="select"
                  name="interiorRating"
                  id="exampleSelect"
                  value={this.state.interiorRating}
                  onChange={this.ratingChangeHandler}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </div>

            <Button color='success' onClick={this.onSubmitHandler}>Submit review</Button>
          </Form>

        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  venue: state.venues.venue,
  reviews: state.reviews.venueReviews,
});

const mapDispatchToProps = dispatch => ({
  getVenue: venueId => dispatch(getVenue(venueId)),
  getReviews: venueId => dispatch(getVenueReviews(venueId)),
  postReview: (venueId, reviewData) => dispatch(postReview(venueId, reviewData)),
});

VenuePage.propTypes = {
  comment: PropTypes.string,
  foodRating: PropTypes.number,
  serviceRating: PropTypes.number,
  interiorRating: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(VenuePage);