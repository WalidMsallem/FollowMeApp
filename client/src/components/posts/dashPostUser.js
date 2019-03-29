import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, getCeatedPost } from "../../actions/postActions";

// import card */
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  card: {
    maxWidth: "100%",
    margin: 20,
    backgroundColor: "#fafad27d",
    textAlign: " left"
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

class DashPostUser extends Component {
  state = { expanded: false, open: false, file: null, image: null };

  componentDidMount() {
    const { auth, post } = this.props;
    this.props.getCeatedPost(auth.user.id);
    console.log(post.createdPosts);
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post, auth } = this.props;
    const { classes } = this.props;

    return (
      <span>
        {post.createdPosts.map(el => (
          <Card className={classes.card}>
            {/* style={{ display: "flex", justifyContent: " space-Between" }} */}
            <div className="post-box-dash">
              <div
                style={{ display: " flex", justifyContent: "space-between" }}
              >
                <h4>{el.title}</h4>
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-dang"
                >
                  Suprimer le Follow
                </button>
              </div>
              <p> {el.text}</p>
              liste des Participants :
              {el.participer.length === 0 ? (
                <span> aucun participant </span>
              ) : (
                el.participer.map(par => (
                  <ul>
                    <li> Nom : {par.handle}</li>
                    <li> numero : {par.numero}</li>
                  </ul>
                ))
              )}
            </div>
          </Card>
        ))}
      </span>
    );
  }
}

DashPostUser.defaultProps = {
  showActions: true
};

DashPostUser.propTypes = {
  deletePost: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

const PostUser = withStyles(styles)(DashPostUser);

export default connect(
  mapStateToProps,
  { deletePost, getCeatedPost }
)(PostUser);
