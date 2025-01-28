import { useContext, useEffect, useRef, useState } from "react"
import words from "../assets/words.json"
import Restart from "./restart"
import alphabet from "../assets/letters.json"
import { langContext, messageContext } from "../app"

export default function Game({ loseCondition, setConfetti }) {
	let { langs, setDeadLangs } = useContext(langContext)
	let { setMessage } = useContext(messageContext)
	let [word, setWord] = useState(words[Math.floor(words.length * Math.random())])
	let [letters, setLetters] = useState(alphabet)
	let winCondition = useMemo(_ => word.split("").every(ch => !letters.includes(ch)), [letters])

	useEffect(
		_ => {
			// biome-ignore lint/style/noCommaOperator: <explanation>
			if (winCondition) setMessage({ color: "bg-green-500", text: "You Won ! 🎉" }), setConfetti(true)
		},
		[winCondition]
	)

	let checkLetter = l => {
		let nLetters = [...letters]
		nLetters.splice(nLetters.indexOf(l), 1, l + (word.includes(l) ? "r" : "w"))
		!word.includes(l) ? setDeadLangs(dL => dL.concat(langs[dL.length])) : setMessage({ text: "", color: "" })
		setLetters(nLetters)
	}

	useEffect(
		_ => {
			if (!loseCondition && !winCondition) {
				let handleKey = e => letters.includes(e.key) && checkLetter(e.key)
				document.addEventListener("keyup", handleKey)

				return _ => document.removeEventListener("keyup", handleKey)
			}
		},
		[letters]
	)

	return (
		<div className='mt-6'>
			<div className='flex-center mt-8 gap-1'>
				{word.split("").map((ch, i) => (
					<span key={word + ch + i} className='bg-zinc-800 rounded-sm border-b-2 border-gray-400 size-8 text-white flex-center font-medium'>
						{(!letters.includes(ch) || loseCondition) && ch.toUpperCase()}
					</span>
				))}
			</div>
			{!winCondition && !loseCondition && (
				<div className='mt-8 mx-auto max-w-80 flex-center flex-wrap flex gap-1 '>
					{letters.map(l => (
						<span key={l} onClick={_ => !loseCondition && l.length == 1 && checkLetter(l)} className={`cursor-pointer bg-yellow-500 duration-150 ${l[1] == "r" ? "right-letter" : l[1] == "w" ? "wrong-letter" : ""} hover:bg-yellow-200 rounded-md size-7 md:size-8 inline-block text-md md:text-lg`}>
							{l[0].toUpperCase()}
						</span>
					))}
				</div>
			)}
			{(winCondition || loseCondition) && <Restart setLetters={setLetters} setWord={setWord} setConfetti={setConfetti} />}
		</div>
	)
}
