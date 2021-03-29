import React, { useReducer } from 'react'
import {fetchMainPosts} from '../utils/api'

function formatDate (timestamp) {
  return new Date(timestamp * 1000)
    .toLocaleDateString("en-GB", {
      hour: 'numeric' ,
      minute: 'numeric'
    })
}

function fetchReducer(state, action) {
  if(action.type === 'loading') {
    return {
      posts: null,
      loading: true,
      error: null
    }
  } else if (action.type === 'success') {
    return {
      posts: action.posts,
      loading: false,
      error: null,
    }
  } else if (action.type === 'error') {
    return {
      posts: state.posts,
      loading: false,
      error: action.error,
    }
  } else {
    throw new Error('This action type is not supported.')
  }
}
const initialState = {
  posts: null,
  error: null,
  loading: true
}

export default function Posts ({type}) {
  const [state, dispatch] = useReducer(
    fetchReducer,
    initialState
  )

  React.useEffect(() => {
    dispatch({type: 'loading'})

    fetchMainPosts(type)
      .then((posts) => dispatch({type: 'success', posts}))
      .catch((error) => dispatch({type: 'error', error: error}))
  }, [type])

  if (state.loading === true) {
    return <p>Loading...</p>
  }

  if (state.error === true) {
    return <p>{state.error}</p>
  }

  return (
    <ul>
      {state.posts.map((post) => {
        return (
          <li key={post.id} className='post'>
            <a className='postLink' href={post.url}>{post.title}</a>
            <div className='meta-info-light'>
              <span>by <a href={post.by}>{post.by}</a></span>
              <span> on {formatDate(post.time)}</span>
              {typeof post.descendants === 'number' && (
                <span> with {post.descendants} comments </span>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}