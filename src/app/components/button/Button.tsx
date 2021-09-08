import classNames from 'classnames';
import './button.scss';

function Button(props: buttonProps) {
    const {
        children,
        buttonClass,
        disabled,
        onClick
    } = props;
    const iconClass = classNames(
        'app-button',
        buttonClass,
        disabled ? 'disabled' : ''
    );
    const clickHandle = () => {
        if(!disabled) {
            onClick && onClick();
        }
    }
    return (
        <button className={iconClass} onClick={clickHandle}>
            {children}
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