import { useContext } from "react"
import { messageContext } from "../app"

export default function MessageArea() {
	let { message } = useContext(messageContext)

	let msgClass = `${message.color} h-14 md:h-16 mt-4 mb-6 text-zinc-100 text-2xl italic flex-center mx-auto w-1/2`
	return <div className={msgClass}>{message.text}</div>
}
