import { useContext } from "react"
import { langContext } from "../app"

export default function Languages() {
	let { langs, deadLangs } = useContext(langContext)

	return (
		<div className='flex gap-2 flex-wrap justify-center'>
			{langs.map(lng => (
				<span key={lng} className={`${lng.toLowerCase()} rounded-2xl text-sm px-2 py-1 ${deadLangs.includes(lng) && "dead"}`}>
					{lng}
				</span>
			))}
		</div>
	)
}
