import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

class PostFeed extends Component {
  render() {
    const { posts, search } = this.props;
    // const { search } = this.props;

    return posts
      .filter(
        p =>
          p.text.toUpperCase().includes(search.toUpperCase()) ||
          p.title.toUpperCase().includes(search.toUpperCase())
      )
      .map(post => <PostItem key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(PostFeed);
// .filter(
//   p =>
//     p.text.toUpperCase().includes(search.toUpperCase()) ||
//     p.title.toUpperCase().includes(search.toUpperCase())
// )

// posts.map(post => <PostItem key={post._id} post={post} />);
