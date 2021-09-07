import DisplayText from "../displayText/DisplayText";
import classNames from "classnames";
import './displayMessage.scss';
const DisplayMessage = (props: {children: any, customClass: string}) => {
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

export default DisplayMessage;