import DisplayText from "../displayText/DisplayText";
import classNames from "classnames";
import './displayMessage.scss';
const DisplayMessage = (props: propsType) => {
    const classes = classNames( "display-message", props.customClass)
    return (
        <div className={classes}>
            <DisplayText textColor='medium' textType='small' customClass='display-message-text'>
                <div className="display-message-icon"></div>
                {props.children}
            </DisplayText>
        </div>
    );
}

interface propsType {
    children: any,
    customClass?: string
}

export default DisplayMessage;