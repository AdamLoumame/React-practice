import { useContext } from "react"
import alphabet from "../assets/letters.json"
import words from "../assets/words.json"
import { langContext, messageContext } from "../app"

export default function Restart({ setLetters, setWord, setConfetti }) {
	let { setDeadLangs } = useContext(langContext)
	let { setMessage } = useContext(messageContext)
	let reset = _ => {
		setLetters(alphabet)
		setDeadLangs([])
		setWord(words[Math.floor(words.length * Math.random())])
		setMessage({ color: "", text: "" })
		setConfetti(false)
	}
	return (
		<span onClick={reset} className='cursor-pointer hover:opacity-50 duration-150 active:opacity-70 mt-20 inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold rounded-md px-4 py-1 text-white'>
			RESTART
		</span>
	)
}
