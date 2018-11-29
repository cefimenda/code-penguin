import React, { Component } from 'react';
import RecommendedPosts from './RecommendedPosts';

export default class PostPage extends Component {
  render() {
    const posts = [
      {
        id: 1,
        text: 'A distributed, decentralized marketplace for coding tasks.'
      },
      {
        id: 2,
        text: 'A problem-solving ecosystem built on Holochain.'
      },
      {
        id: 3,
        text: 'A community of enthusiasts dedicated to requesting, building and sharing solutions.'
      },
      {
        id: 4,
        text: 'A closed economy that rewards coders helping coders.'
      },
      {
        id: 5,
        text: 'A network of coders realizing their vision and sharing their diverse expertise.'
      },
      {
        id: 6,
        text: 'A platform to facilitate community-driven coding.'
      },
      {
        id: 7,
        text:
          'A developer community dedicated to requesting, creating, and trading solutions to coding conundrums.'
      }
    ];

    return (
      <div>
        <RecommendedPosts posts={posts} />
      </div>
    );
  }
}
