import React from 'react'
import { Link } from "react-router-dom";
import ThemeContext  from '../contexts/theme'

function formatDate (timestamp) {
  return new Date(timestamp * 1000)
    .toLocaleDateString("en-GB", {
      hour: 'numeric' ,
      minute: 'numeric'
    })
}


export default function PostMetaInfo({by, time, descendants, id}) {
  const theme = React.useContext(ThemeContext)
  return (
    <div className={`meta-info-${theme}`}>
      <span>by <Link to={`/user?id=${by}`}>{by}</Link></span>
      <span> on {formatDate(time)}</span>
      {typeof descendants === 'number' && (
        <span> with <Link to={`/post?id=${id}`}>{descendants}</Link> comments </span>
      )}
    </div>
  )
}