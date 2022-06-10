import React from 'react';
import { AsideDiv } from '../style/asideStyle.js';


const Aside = () => {
  return (
    <> 
      <AsideDiv>
        <div className="newspage-title">
          <h1>LOGO</h1>
          <p>This website is the most beautiful news fetcher in the world.</p>
        </div>
        <button>
          <div><span>Donate</span></div>
        </button>
      </AsideDiv>
    </>
  );
}

export default Aside;