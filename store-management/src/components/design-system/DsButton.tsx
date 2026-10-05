import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import type { ButtonProps } from "@mui/material/Button";

type PropTypes = ButtonProps & {
  tooltip?: string,
}

const DsButton = ({ tooltip, children, ...rest }: PropTypes) => {

  const button = (
    <Button variant="contained" {...rest}>
      {children}
    </Button>
  )

  if (tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>
  }

  return button
}

export default DsButton
