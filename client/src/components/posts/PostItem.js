import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLike,
  removeLike,
  getPosts,
  addParticpe,
  getCeatedPost
} from "../../actions/postActions";

// import card */
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import GridList from "./slider";
import axios from "axios";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";

/* modal */
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
/* fin modal */

/** fin card  */

const styles = theme => ({
  card: {
    maxWidth: "100%",
    margin: 20,
    backgroundColor: "#fafad27d"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class PostItem extends Component {
  state = { expanded: false, open: false, file: null, image: null };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  onParticperClick(id) {
    this.props.addParticpe(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  /* upload images */
  onChangeImage = e => {
    this.setState({
      file: e.target.files[0],
      image: e.target.files[0].name
    });
  };

  handleAddevent = async () => {
    const { file } = this.state;

    const formData = new FormData();
    formData.append("postImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    if (file !== null) {
      return axios
        .post("/api/image/post/img", formData, config)
        .then(response => {
          // alert("The file is successfullly uploadsd" , formData);
          this.setState(
            {
              image: response.data
            },
            () => {
              axios
                .post(`/api/image/post/${this.props.post._id}`, {
                  image: response.data
                })
                .then(res => {
                  return this.props.getPosts();
                })
                .catch(e => alert("error add event "));
            }
          );
        })
        .catch(error => {
          alert("error image upload");
        });
    }
  };

  /*fin upload */
  test = () => {
    const { auth } = this.props;
    console.log(auth.user.id);
    this.props.getCeatedPost(auth.user.id);
    // axios
    //   .get("/api/posts/userPost")
    //   .then(console.log("ok"))
    //   .catch(console.log("not done"));
  };

  render() {
    const { post, auth, showActions } = this.props;
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <div style={{ display: "flex", justifyContent: " space-Between" }}>
          <Link to={`/profile/${post.name}`}>
            {" "}
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" src={post.avatar}>
                  W
                </Avatar>
              }
              title={post.title}
              subheader={post.date.slice(0, 10)}
            />{" "}
          </Link>
          <div style={{ padding: " 15px 15px 0 0" }}>
            {post.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, post._id)}
                type="button"
                className="btn btn-dang"
              >
                Suprimer le Follow
              </button>
            ) : null}
          </div>
        </div>
        {/* <span className="text-center">{post.name}</span> */}
        <GridList tabImg={post.image} />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {showActions ? (
              <span>
                <button
                  onClick={this.onParticperClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  participer
                </button>{" "}
              </span>
            ) : null}

            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
              </span>
            ) : null}

            {post.user === auth.user.id ? (
              <span>
                <Button onClick={this.handleOpen} style={{ color: " green" }}>
                  Ajouter des images
                </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" id="modal-title">
                      Text in a modal
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      id="simple-modal-description"
                    >
                      <input
                        type="file"
                        name={this.state.image}
                        onChange={this.onChangeImage}
                        className="inputfile"
                      />

                      <button
                        onClick={this.handleAddevent}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          width: "25%"
                        }}
                        variant="contained"
                      >
                        appliquer
                      </button>
                    </Typography>
                  </div>
                </Modal>
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {post.text}
              {/* <button onClick={this.test}>test test test</button> */}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  addParticpe: PropTypes.func.isRequired,
  getCeatedPost: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const Post = withStyles(styles)(PostItem);

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike, getPosts, addParticpe, getCeatedPost }
)(Post);
