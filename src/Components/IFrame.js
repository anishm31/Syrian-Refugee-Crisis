import React from 'react';

const IFrame = (props) => {
  const {src} = props;

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        title="IFRAME"
        src={src}
        allowFullScreen
        width = "100%"
        height = "500"
      ></iframe>
    </div>
  );
}

export default IFrame;
