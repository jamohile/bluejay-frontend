import * as React from 'react';
import './logo.css';

/** Is this a little overcomplicated for a Logo?
 * Yes.
 * But if it was *just* a logo...it would end after the first div.
 * Hover in browser to see why.
 */
const Logo = () => (
    <div className='logo'>
      <div className='name'>
        bluejay
      </div>
  
      <div className='hidden'>
        This page is blue.
      </div>
      <div className='hidden'>
         I'm Jay.
      </div>
      <div className='hidden'>
         You're Birdie.
      </div>
      <div className='hidden'>
        This is bluejay.
      </div>
    </div>
  )

  export default Logo;