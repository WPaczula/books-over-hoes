import { useMemo, useState } from "react"
import ReactDatepicker from "tailwind-datepicker-react"

const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: false,
    theme: {
        background: "bg-gray-700 dark:bg-gray-800",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "text-transparent dark:text-transparent hover:bg-gray-700 dark:hover:bg-gray-800 pointer-events-none",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>{`<`}</span>,
        next: () => <span>{`>`}</span>,
    },
    datepickerClassNames: "top-12",
    language: "en",
}

type Props = {
    value: Date
    onChange: (date: Date) => void
}

const Datepicker = ({ value, onChange }: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [date, setDate] = useState<Date | null>(value)

    const handleChange = (selectedDate: Date) => {
        setDate(selectedDate)
    }
    const handleClose = (state: boolean) => {
        setShow(state)
        if (!state && date) {
            onChange(date)
        }
    }

    const datepickerOptions = useMemo(() => {
        return { ...options, defaultDate: value }
    }, [value])

    return (
        <div className="relative">
            <ReactDatepicker options={datepickerOptions} onChange={handleChange} show={show} setShow={handleClose} />
        </div>
    )
}

export default Datepicker