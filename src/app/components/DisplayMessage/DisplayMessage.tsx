import DisplayText from "../displayText/DisplayText";
import classNames from "classnames";
import './displayMessage.scss';
const DisplayMessage = (props: propsType) => {
    const {
        children,
        customClass
    } = props;
    const classes = classNames( "display-message", customClass)

    return (
        <div className={classes}>
            <DisplayText
                textColor='medium'
                textType='small'
                customClass='display-message-text'
            >
                <div className="display-message-icon"></div>
                {children}
            </DisplayText>
        </div>
    );
}

interface propsType {
    children: any,
    customClass?: string
}

export default DisplayMessage;