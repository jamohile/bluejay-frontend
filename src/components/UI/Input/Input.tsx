import React, { Component, ReactNode } from 'react';
import './input.css';


/**
 * This forms the root for all inputs, which will add special components
 * as children of this.
 * 
 * This on its own contains no actual input, and is just the UI boundary.
 */

 interface InputBaseProps{
     children: ReactNode[] | ReactNode;
     error: boolean;
 }
 
 export const InputBase = ({children, error}:InputBaseProps) =>(
     <div className= {'inputBase' + (error ? ' error' : '')} >
        {children}
     </div>
 )