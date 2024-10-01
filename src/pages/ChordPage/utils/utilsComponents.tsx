import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const OverLayNote = ({ note = "", item, theme }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="tooltip-top">{note}</Tooltip>}
    >
      {item}
    </OverlayTrigger>
  );
};
