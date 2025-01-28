import MessageArea from "./MessageArea"

export default function Header() {
	return (
		<>
			<h1 className='text-white text-lg font-semibold mb-3'>Assembly : EndGame</h1>
			<p className='text-zinc-600 text-sm'>Guess The Word To Keep The Promramming Safe From Assembly</p>
			<MessageArea />
		</>
	)
}
