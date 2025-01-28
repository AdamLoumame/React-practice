import { createContext, useEffect, useState } from "react"
import Header from "./components/header"
import Languages from "./components/languages"
import Game from "./components/game"
import Confetti from "react-confetti"

export let langContext = createContext(null)
export let messageContext = createContext(null)

export default function App() {
	let [langs, setLangs] = useState(["HTML", "CSS", "Python", "Ruby", "PHP", "JavaScript", "Go", "Java", "Rust", "Assembly"])
	let [deadLangs, setDeadLangs] = useState([])
	let [message, setMessage] = useState({})
	let loseCondition = deadLangs[deadLangs.length - 1] === "Assembly"
	let [confetti, setConfetti] = useState(false)

	useEffect(
		_ => {
			deadLangs.length > 0 && setMessage({ color: "bg-purple-500", text: `R.I.P ${deadLangs[deadLangs.length - 1]}` })
			loseCondition && setMessage({ color: "bg-red-500", text: "GAME OVER ! you lost 😭" })
		},
		[deadLangs]
	)

	return (
		<div className='bg-zinc-900 h-full rounded-3xl p-8 text-center'>
			<input type='text' />
			{confetti && <Confetti />}
			<messageContext.Provider value={{ message, setMessage }}>
				<Header />
				<langContext.Provider value={{ langs, setLangs, deadLangs, setDeadLangs }}>
					<Languages />
					<Game loseCondition={loseCondition} setConfetti={setConfetti} />
				</langContext.Provider>
			</messageContext.Provider>
		</div>
	)
}
