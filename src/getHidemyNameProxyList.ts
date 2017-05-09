import {JSDOM} from 'jsdom'
import {unique} from './unique'

export enum HidemyNameProxyType {
	HTTP = 0,
	HTTPS,
	Socks4,
	Socks5,
}

const ProxyTypes = 'hs45'

export enum HidemyNameAnonimity {
	None = 1,
	Low = 2,
	Average = 3,
	High = 4
}

export type HidemyNameOptions = {
	countries?: string[],
	types?: HidemyNameProxyType[],
	anonimity?: HidemyNameAnonimity[],
	maxTime?: number,
	ports?: number[]
}

export function getHidemyNameProxyList( options?: HidemyNameOptions ): Promise<string[]> {
	let args: string[] = []
	if ( options ) {
		const anonimity = options.anonimity ? unique(options.anonimity)
			.filter( i => i >= 0 && i < ProxyTypes.length )
			.map( i => ProxyTypes[i] )
			.join('') : ''

		args = [
			options.countries ? `country=${options.countries.join('')}` : '',
			options.maxTime ? `maxtime=${options.maxTime}` : '',
			options.types ? `type=${unique(options.types).join('')}` : '',
			options.anonimity ? `anonimity=${anonimity}` : '',
			options.ports ? `ports=${unique(options.ports).join(',')}` : ''
		]
	}

	const url = `https://hidemy.name/ru/proxy-list/?${args.join('&')}#list`

	return JSDOM.fromURL( url ).then(
		(dom) => [].slice.call( dom.window.document.getElementsByClassName('tdl')).map( (v:HTMLElement) => v.textContent ),
		(_:any) => [] )
}
