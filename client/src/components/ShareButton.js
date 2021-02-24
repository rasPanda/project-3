import React from 'react'
// import FaFacebook from 'react-icons/lib/fa/facebook'
import {FacebookShareButton, FacebookIcon} from "react-share";

export default function ShareButtonFacebook({ eventId }) {
  const shareButtonProps = {
    url: `https:/localhost:8001/event/${eventId}`,
    // url: `www.wikipedia.org`,
    network: "Facebook",
    text: "Check out this ping pong event!",
    longtext:
      ""
  }

  return <FacebookShareButton {...shareButtonProps}>
    <FacebookIcon></FacebookIcon>
  </FacebookShareButton>

}