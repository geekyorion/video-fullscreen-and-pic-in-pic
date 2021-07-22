import { useRef } from 'react';
import './App.css';

const App = () => {
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (videoRef && videoRef.current) {
      const isFullScreened = document.fullscreenElement || document.webkitFullscreenElement;
      if (!isFullScreened) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen();
        } else {
          alert('FullScreen API is not supported');
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else {
          alert('FullScreen API is not supported');
        }
      }
    }
  }

  const handlePicInPic = async () => {
    if (videoRef && videoRef.current) {
      const isPicInPicAvailable = document.pictureInPictureEnabled || !videoRef.current.disablePictureInPicture;
      if (isPicInPicAvailable) {
        const isPicInPic = !document.pictureInPictureElement;
        try {
          if (isPicInPic) {
            await videoRef.current.requestPictureInPicture();
          } else {
            await document.exitPictureInPicture();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('Either Picture in picture is not supported or it is disabled for the video');
      }
    }
  }

  return (
    <div className="wrapper">

      <div className="video-wrapper">
        <video controls preload="auto" ref={videoRef}>
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4"
            type="video/mp4"
          ></source>
          Your browser does not support HTML5 Video. Please try with a different browser
        </video>
      </div >

      <div className="controls">
        Custom Control Implmentation of <br />
        <button onClick={handleFullScreen}>Toggle Full Screen</button>
        <button onClick={handlePicInPic}>Toggle Picure In Picture View</button>
      </div>

      <div className="credit-wrapper">
        <code>Video by:
          <a href="https://mixkit.co/@marcolopez/" target="_blank" rel="noreferrer">Marco Lopez</a>
          and hosted on:
          <a href="https://mixkit.co/free-stock-video/forest-stream-in-the-sunlight-529/" target="_blank" rel="noreferrer">MixKit</a>
        </code>
      </div>

    </div >
  );
}

export default App;
