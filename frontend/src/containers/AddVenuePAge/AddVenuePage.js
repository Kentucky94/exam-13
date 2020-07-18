import React, {Component, Fragment} from 'react';
import FormElement from "../../components/UI/FormElement/FormElement";
import {Button, Form} from "reactstrap";
import {connect} from "react-redux";
import {postVenue} from "../../store/actions/venuesActions";

class AddVenuePage extends Component {
  state = {
    title: '',
    description: '',
    mainImage: '',
    isAgreed: false,
  };

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  checkBoxChangeHandler = event => {
    this.setState({isAgreed: !this.state.isAgreed})
  };

  fileChangeHandler = event => {
    this.setState({[event.target.name]: event.target.files[0]})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      const value = this.state[key];

      formData.append(key, value)
    });

    this.props.postVenue(formData);
  };

  render() {
    return (
      <Fragment>
        <Form onSubmit={this.onSubmitHandler}>
          <FormElement
            propertyName="title"
            title="Venue title"
            type="text"
            value={this.state.title}
            onChange={this.inputChangeHandler}
            required
          />
          <FormElement
            propertyName="description"
            title="Venue description"
            type="text"
            value={this.state.description}
            onChange={this.inputChangeHandler}
            required
          />
          <FormElement
            propertyName="mainImage"
            title="Venue image"
            type="file"
            onChange={this.fileChangeHandler}
            required
          />
          <div className='d-flex justify-content-start align-items-center'>
            <span className='mr-2'>I have read and understood the Terms and Conditions</span>

            <FormElement
              propertyName="isAgreed"
              type="checkbox"
              value={this.state.isAgreed}
              onChange={this.checkBoxChangeHandler}
              required={!this.state.isAgreed}
            />
          </div>

          <Button type="success" color="primary">
            Create
          </Button>
        </Form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postVenue: venueData => dispatch(postVenue(venueData)),
});

export default connect(null, mapDispatchToProps)(AddVenuePage);