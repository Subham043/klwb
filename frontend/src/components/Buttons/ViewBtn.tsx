import { Link } from "react-router-dom";
import { IconButton, Tooltip, Whisper } from "rsuite";
import VisibleIcon from "@rsuite/icons/Visible";

type ViewLinkProps = {
  to: string;
};
export function ViewLink({ to }: ViewLinkProps) {
  return (
    <Whisper
      placement="bottomEnd"
      controlId="control-id-click"
      trigger="hover"
      speaker={<Tooltip>View</Tooltip>}
    >
      <IconButton
        as={Link}
        appearance="primary"
        color="orange"
        size="sm"
        icon={<VisibleIcon />}
        to={to}
      />
    </Whisper>
  );
}
