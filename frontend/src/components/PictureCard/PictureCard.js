import React, {useState} from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import PictureModal from "../PictureModal/PictureModal";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePicture} from "../../store/actions/picturesActions";

const PictureCard = props => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  let delButton = null;

  if(user && props.showDel && user._id === props.authorId){
    delButton = (
      <Button
        className='ml-2'
        color='danger'
        onClick={() => dispatch(deletePicture(props.id))}
      >
        Delete
      </Button>
    )
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card className='mx-2 my-2'>
      <CardImg
        top
        style={{width: '300px', height: '200px'}}
        src={'http://localhost:8080/uploads/' + props.image}
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle><b>{props.name}</b></CardTitle>
        <CardText>Posted by <NavLink to={'/pictures/' + props.authorId}>{props.author}</NavLink></CardText>
        <Button onClick={toggle} color='info'>Show full image</Button>
        {delButton}
      </CardBody>
      <PictureModal
        isOpen={modal}
        toggle={toggle}
        name={props.name}
        image={'http://localhost:8080/uploads/' + props.image}
      />
    </Card>
  );
};

export default PictureCard;