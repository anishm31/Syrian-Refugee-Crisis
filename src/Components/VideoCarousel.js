import YouTube from 'react-youtube';
import Carousel from 'react-bootstrap/Carousel';
import "../CSS/VideoCarousel.css"

function VideoCarousel(props) {
  return (
    <Carousel controls={true} fade={true}>
      {props.youtubeInfo.relevant_videos.map((video_id) => {
        console.log(video_id);
        return (
          <Carousel.Item style={{ display: 'flex', justifyContent: 'center'}} interval={6000}>
            <div className='youtube-container'>
              <YouTube videoId={video_id} />
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default VideoCarousel;