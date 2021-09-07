import React from 'react';
import classNames from 'classnames';
import './displayText.scss';

const DisplayText =  React.memo(function DisplayText(props: DisplayTextProps) {
    const {children} = props;
    let typeClassNames = classNames('display-text', props.customClass, props.textColor, props.textType);
    return (
      <div className={typeClassNames}>
            {children}
      </div>
    );
  });

  interface DisplayTextProps {
    children: any,
    textColor?: 'primary' | 'secondary' | 'medium' | 'light',
    textType?: 'smallest' | 'small' | 'large' | 'largest',
    customClass?: string
  }
  
  export default DisplayText;