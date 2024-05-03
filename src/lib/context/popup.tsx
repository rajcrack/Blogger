import { createContext } from "react";
interface Props {
    setter: (value: boolean) => void
    popup: boolean
}
const updater = (value: boolean) => {

}

export const PopupContext = createContext<Props>({ popup: false, setter: updater })


