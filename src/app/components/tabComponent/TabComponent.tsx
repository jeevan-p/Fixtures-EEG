import { useRef, useEffect, useState } from 'react';
import DisplayText from '../displayText/DisplayText';
import classNames from 'classnames';
import './tabComponent.scss';

function TabComponent(props: Props) {
    const [difference, setDifference] = useState(0);
    const {
        preHeader,
        header,
        onTabSelect,
        selected,
        disabledTab
    } = props;
    const previousHeaderValue =  useRef<number>(header);
    const arrowClass = classNames(
        'arrow',
        difference > 0 ? 'positive' : difference < 0 ? 'negative' : ''
    );

    const tabClasses = `tab-component
        ${disabledTab ? ' disabled' : ''}
        ${selected ? ' selected' : ''}`;

    const tabClickHandler = () => {
        !disabledTab && onTabSelect && onTabSelect();
    }

    useEffect(() => {
        setDifference(header - previousHeaderValue.current);
        setTimeout(() => setDifference(0), 3000);
        previousHeaderValue.current = header;
    }, [header]);
    
    return (
      <button className={tabClasses} onClick={tabClickHandler}>
            <div className={arrowClass}></div>
            {preHeader &&
                <DisplayText
                    customClass='tab-pre-header'
                    textType='smallest'
                    textColor='secondary'>
                        {preHeader}
                </DisplayText>}
            <DisplayText
                customClass='tab-header'
                textType='largest'
                textColor='primary'>
                    {header}
            </DisplayText>
      </button>
    );
}

interface Props {
    header: number,
    preHeader?: string,
    onTabSelect?: () => any,
    selected?: boolean,
    disabledTab?: boolean
}

export default TabComponent;