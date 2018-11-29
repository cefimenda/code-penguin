import React, { Component } from 'react';

export default class RecommendedPosts extends Component {
  render() {
    const posts = this.props.posts;
    return (
      <div>
        <p > {posts[Math.floor(Math.random() * posts.length)].text} </p>
      </div>
    );
  }
}
