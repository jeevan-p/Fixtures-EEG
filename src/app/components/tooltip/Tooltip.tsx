import classNames from 'classnames';
import './tooltip.scss';

function Tooltip(props: {content: string, iconClass?: string}) {
    const iconClass = classNames('tooltip', props.iconClass);
    return (
        <div className={iconClass}>
            <span className="tooltiptext">{props.content}</span>
        </div>
    )
}

export default Tooltip;