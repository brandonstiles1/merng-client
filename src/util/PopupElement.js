import React from 'react';
import { Popup } from 'semantic-ui-react';

function PopupElement({content, children}){
  return(
    <Popup 
      inverted 
      content={content}
      trigger={children}
    />
  ) 
}

export default PopupElement;