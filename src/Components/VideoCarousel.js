import YouTube from 'react-youtube';
import Carousel from 'react-bootstrap/Carousel';

function VideoCarousel(props) {
  return (
    <Carousel controls={true} fade={true}>
      {props.youtubeInfo.relevant_videos.map((video_id) => {
        console.log(video_id);
        return (
          <Carousel.Item interval={6000}>
            <YouTube videoId={video_id} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default VideoCarousel;