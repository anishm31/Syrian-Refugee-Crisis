//used code an tutorials found here https://www.react-spring.dev/docs/components/parallax

import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import React, { useRef } from 'react'
import TimeLine from './Timeline';
import "./TimelineBackground.css";


const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

function TimelineBackground() {
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



       

          <ParallaxLayer
          offset={0}
          speed={0}
          factor={0}>
    <TimeLine /> 
        </ParallaxLayer>

  
         
         
         
     
        </Parallax>
      </div>
    )
  }
  


export default TimelineBackground;