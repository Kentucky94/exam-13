import React, {Component} from 'react';
import {connect} from "react-redux";

import {getAllVenues} from "../../store/actions/venuesActions";
import VenueCard from "../../components/VenueCard/VenueCard";
import {Container} from "reactstrap";

class VenueListPage extends Component {
  async componentDidMount() {
    await this.props.getVenues()
  }

  render() {
    const venues = this.props.venues.map(venue => {
      return <VenueCard
        key={venue._id}
        id={venue._id}
        image={venue.mainImage}
        title={venue.title}
        description={venue.description}
        rating={venue.overallRating}
      />
    });

    return (
      <Container>
        <div className='row flex-wrap justify-content-start'>
          {venues}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  venues: state.venues.venues,
});

const mapDispatchToProps = dispatch => ({
  getVenues: () => dispatch(getAllVenues()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueListPage);