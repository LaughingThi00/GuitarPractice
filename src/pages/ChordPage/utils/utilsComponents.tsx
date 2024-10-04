import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const HoverTooltip = ({ note = "", item, styled="" }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="tooltip-top" className={styled}>{note}</Tooltip>}
    >
      {item}
    </OverlayTrigger>
  );
};
