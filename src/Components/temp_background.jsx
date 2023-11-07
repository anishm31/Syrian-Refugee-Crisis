
import React from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import layer0 from "../CSS/layer0.png";
import layer1 from "../CSS/layer1.png"; 
import layer2 from "../CSS/layer2.png"; 
import layer3 from "../CSS/layer3.png"; 
import layer4 from "../CSS/layer4.png"; 
import layer5 from "../CSS/layer5.png"; 
import layer6 from "../CSS/layer6.png"; 
import layer7 from "../CSS/layer7.png"; 
import layer8 from "../CSS/layer8.png"; 
import layer9 from "../CSS/layer9.png"; 
import layer10 from "../CSS/layer10.png"; 
import layer11 from "../CSS/layer11.png"; 
import layer12 from "../CSS/layer12.png"; 
import layer13 from "../CSS/layer13.png"; 
import layer14 from "../CSS/layer14.png"; 
import layer15 from "../CSS/layer15.png"; 
import layer16 from "../CSS/layer16.png"; 
//import "./timeline.css"; 
import "./TimelineBackground.css"; 
import TimeLine from "./Timeline";

function TimelineBackground() {


  return (

  < div className="scrollable-container">
<div className="parallax-container">
      <Parallax pages={33} offset={0} >

      {/* <ParallaxLayer offset={0} > 
          <TimeLine/>
        </ParallaxLayer> */}


        <ParallaxLayer offset={0} speed={0.5} factor={3}>
        <img src={layer0} alt="Layer 1" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} factor={3}>
        <img src={layer1} alt="Layer 2" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} factor={3}>
        <img src={layer2} alt="Layer 3" className="parallax-image" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5} factor={3}>
        <img src={layer3} alt="Layer 4" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} factor={3}>
        <img src={layer4} alt="Layer 5" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} factor={3}>
        <img src={layer5} alt="Layer 6" className="parallax-image" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }} factor={3}>
        <img src={layer6} alt="Layer 7" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }}factor={3}>
        <img src={layer7} alt="Layer 8" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }}factor={3}>
        <img src={layer8} alt="Layer 9" className="parallax-image" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }}factor={3}>
        <img src={layer9} alt="Layer 10" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }}factor={3}>
        <img src={layer10} alt="Layer 11" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }} factor={3}>
        <img src={layer11} alt="Layer 12" className="parallax-image" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }} factor={3}>
        <img src={layer12} alt="Layer 13" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }} factor={3}>
        <img src={layer13} alt="Layer 14" className="parallax-image" />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5} sticky ={{ start: 0, end: 33 }}factor={3}>
        <img src={layer14} alt="Layer 15" className="parallax-image" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0} sticky ={{ start: 0, end: 33 }} factor={3}>
        <img src={layer15} alt="Layer 16" className="parallax-image" />
        </ParallaxLayer>

       
       
        <ParallaxLayer offset={0} speed={0} sticky ={{ start: 0, end: 50 }}> factor={3}
          <img src={layer16} alt="Layer 17" className="parallax-image" />
        </ParallaxLayer>
       

        <ParallaxLayer offset={0} sticky ={{ start: 0, end: 33 }} factor={3}> 
        <img src={layer16} alt="Layer 17" className="parallax-image" />
        </ParallaxLayer>
      
      
        <ParallaxLayer offset={0}  style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 998 }} s> 
          <TimeLine/>
        </ParallaxLayer>    
        </Parallax>
        </div>
        </div>
  );
}

export default TimelineBackground;
