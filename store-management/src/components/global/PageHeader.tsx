import { LucideArrowLeft } from "lucide-react"
import type { ElementType, FC } from "react"
import { useNavigate } from "react-router"
import DsButton from "../design-system/DsButton"
import DsTypography from "../design-system/DsTypography"

type PropTypes = {
  text: string
  element?: ElementType
  backRoute?: string
  showBack?: boolean
}

const PageHeader: FC<PropTypes> = ({ text, element, backRoute, showBack = false }) => {

  const navigate = useNavigate();

  const back = () => {
    if (backRoute) {
      navigate(backRoute)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="flex justify-between items-center">
      <DsTypography element={element ? element : 'h1'} className="text-3xl font-bold mb-4">{text}</DsTypography>
      {
        showBack &&
        <DsButton color="primary" startIcon={<LucideArrowLeft size={18} />} onClick={back}>Back</DsButton>
      }
    </div>
  )
}

export default PageHeader
