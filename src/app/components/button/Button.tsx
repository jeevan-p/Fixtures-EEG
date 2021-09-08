import classNames from 'classnames';
import './button.scss';

function Button(props: buttonProps) {
    const iconClass = classNames('app-button', props.buttonClass, props.disabled ? 'disabled' : '');
    const clickHandle = () => {
        if(!props.disabled) {
            props.onClick && props.onClick();
        }
    }
    return (
        <button className={iconClass} onClick={clickHandle}>
            {props.children}
        </button>
    )
}

interface buttonProps {
    children: string,
    buttonClass?: string,
    disabled?: boolean,
    onClick?: () => any
}

export default Button;