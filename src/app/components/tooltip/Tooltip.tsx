import classNames from 'classnames';
import './tooltip.scss';

function Tooltip(props: {content: string, iconClass?: string}) {
    const {
        iconClass,
        content
    } = props;
    const iconClassList = classNames('tooltip', iconClass);
    return (
        <div className={iconClassList}>
            <span className="tooltiptext">{content}</span>
        </div>
    )
}

export default Tooltip;