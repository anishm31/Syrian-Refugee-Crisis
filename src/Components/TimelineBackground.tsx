import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import React, { useRef } from 'react'
import TimeLine from './Timeline';
import "./TimelineBackground.css";
import moon from "../images/moon.png";

const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

function TimelineBackground() {
  const numLayers = 33; // Number of layers
  const backgroundColor = '#805E73'; // Background color
  const parallax = useRef<IParallax>(null!)
  

    
    return (
      <div className = 'gradient-div'>
        <Parallax ref={parallax} pages={33}>
        <div className = 'gradient-div'>
          </div>
          <ParallaxLayer
            offset={0}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />
<ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              pointerEvents: 'none',
            }}>
            <img src={moon} style={{ width: '40%' }} />
          </ParallaxLayer>
<ParallaxLayer
            offset={1}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={2}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            
            }}
          />
            <ParallaxLayer
            offset={3}
            speed={2}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={4}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={5}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={6}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={7}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={8}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={9}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={10}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={11}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={12}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={13}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={14}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={15}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={16}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={17}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={18}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={19}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={20}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={21}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={22}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={23}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={24}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={25}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={26}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={27}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={28}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={29}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={30}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

<ParallaxLayer
            offset={31}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={32}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={33}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />


<ParallaxLayer
            offset={33}
            speed={1}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />



        {/* <ParallaxLayer offset={0} speed={0} style={{ backgroundColor: '#41322E' }} />
<ParallaxLayer offset={0} speed={0.05} style={{ backgroundColor: '#41322E' }} />
<ParallaxLayer offset={1} speed={0.05} style={{ backgroundColor: '#41322E' }} />
<ParallaxLayer offset={2} speed={0.05} style={{ backgroundColor: '#41322E' }} />
<ParallaxLayer offset={2} speed={0} style={{ backgroundColor: '#41322E' }} />

<ParallaxLayer offset={3} speed={0} style={{ backgroundColor: '#563E3F' }} />
<ParallaxLayer offset={4} speed={0.05} style={{ backgroundColor: '#563E3F' }} />
<ParallaxLayer offset={5} speed={0} style={{ backgroundColor: '#563E3F' }} />

<ParallaxLayer offset={6} speed={0.05} style={{ backgroundColor: '#6B4E58' }} />
<ParallaxLayer offset={7} speed={0.05} style={{ backgroundColor: '#6B4E58' }} />
<ParallaxLayer offset={8} speed={0.05} style= {{ backgroundColor: '#6B4E58' }} />

<ParallaxLayer offset={9} speed={0.05} style={{ backgroundColor: '#805E73' }} />
<ParallaxLayer offset={10} speed={0.05} style={{ backgroundColor: '#805E73' }} />
<ParallaxLayer offset={11} speed={0.05} style={{ backgroundColor: '#805E73' }} />

<ParallaxLayer offset={12} speed={0.05} style={{ backgroundColor: '#8D6E86' }} />
<ParallaxLayer offset={13} speed={0.05} style={{ backgroundColor: '#8D6E86' }} />
<ParallaxLayer offset={14} speed={0.05} style={{ backgroundColor: '#8D6E86' }} />

<ParallaxLayer offset={15} speed={0.05} style={{ backgroundColor: '#9A7E97' }} />
<ParallaxLayer offset={16} speed={0.05} style={{ backgroundColor: '#9A7E97' }} />
<ParallaxLayer offset={17} speed={0.05} style={{ backgroundColor: '#9A7E97' }} />

<ParallaxLayer offset={18} speed={0.05} style={{ backgroundColor: '#A68DA7' }} />
<ParallaxLayer offset={19} speed={0.05} style={{ backgroundColor: '#A68DA7' }} />
<ParallaxLayer offset={20} speed={0.05} style={{ backgroundColor: '#A68DA7' }} />

<ParallaxLayer offset={21} speed={0.05} style={{ backgroundColor: '#B09DB4' }} />
<ParallaxLayer offset={22} speed={0.05} style={{ backgroundColor: '#B09DB4' }} />
<ParallaxLayer offset={23} speed={0.05} style={{ backgroundColor: '#B09DB4' }} />

<ParallaxLayer offset={24} speed={0.05} style={{ backgroundColor: '#BBADC1' }} />
<ParallaxLayer offset={24} speed={0.05} style={{ backgroundColor: '#BBADC1' }} />
<ParallaxLayer offset={25} speed={0.05} style={{ backgroundColor: '#BBADC1' }} />
<ParallaxLayer offset={26} speed={0.05} style={{ backgroundColor: '#BBADC1' }} />
<ParallaxLayer offset={24} speed={0.05} style={{ backgroundColor: '#BBADC1' }} />

<ParallaxLayer offset={27} speed={0.05} style={{ backgroundColor: '#C6BECD' }} />
<ParallaxLayer offset={28} speed={0.05} style={{ backgroundColor: '#C6BECD' }} />
<ParallaxLayer offset={29} speed={0.05} style={{ backgroundColor: '#C6BECD' }} />

<ParallaxLayer offset={30} speed={0.05} style={{ backgroundColor: '#D3CEDA' }} />
<ParallaxLayer offset={31} speed={0.05} style={{ backgroundColor: '#D3CEDA' }} />
<ParallaxLayer offset={32} speed={0.05} style={{ backgroundColor: '#D3CEDA' }} />

<ParallaxLayer offset={33} speed={0.05} style={{ backgroundColor: '#E0DEE6' }} /> */}


          <ParallaxLayer
          offset={0}
          speed={0}
          factor={0}>
    <TimeLine /> 
        </ParallaxLayer>

  
          {/* <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          /> */}
          {/* <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
            <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
          </ParallaxLayer>
   */}
          {/* <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
          </ParallaxLayer>
   */}
          {/* <ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}>
            <img src={url('earth')} style={{ width: '60%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer
            offset={2}
            speed={-0.3}
            style={{
              backgroundSize: '80%',
              backgroundPosition: 'center',
              backgroundImage: url('clients', true),
            }}
          /> */}
  
          {/* <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={url('server')} style={{ width: '20%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer
            offset={1}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={url('bash')} style={{ width: '40%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer
            offset={2}
            speed={-0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => parallax.current.scrollTo(0)}>
            <img src={url('clients-main')} style={{ width: '40%' }} />
          </ParallaxLayer> */}
          

        

            {/*background colors */}
          {/* <ParallaxLayer offset={3} speed={1} style={{ backgroundColor: '#805E73' }} />
          <ParallaxLayer offset={4} speed={1} style={{ backgroundColor: '#87BCDE' }} /> */}
  
            {/* stars */}
          {/* <ParallaxLayer
            offset={3}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          /> */}

          
          {/* <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
            <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
          </ParallaxLayer>
   */}
          {/* <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
          </ParallaxLayer>
   */}
          {/* <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
            <img src={`https://cdn2.iconfinder.com/data/icons/Sketchy_icons_by_ma/128/cloud.png`} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
          </ParallaxLayer> */}
  
          {/* <ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}>
            <img src={url('earth')} style={{ width: '60%' }} />
          </ParallaxLayer>
  
          */}

        </Parallax>
      </div>
    )
  }
  


export default TimelineBackground;