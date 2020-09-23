import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../Actions/postAction';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';
import PostItem from '../Posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match, getPost, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, loading, match.params.id]);
  return loading || post == null ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn btn-light'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
