//import {Promise} from 'es6-promise'
import {JSDOM} from 'jsdom'
import * as request from 'request'

export enum SpysProxyType {
	Any = 0,
	HTTP,
	SOCKS
}

export enum SpysAnonimity {
	Any = 0,
	NOA,
	ANM_HIA,
	HIA
}

export type SpysOptions = {
	country?: number,
	proxyType?: SpysProxyType,
	anonimity?: SpysAnonimity,
	port?: number
}

export function getSpysProxyList( options?: SpysOptions ): Promise<string[]> {
	const url = 'http://spys.ru'
	const form = options ? {
		'anmm': options.anonimity || 0,
		'tldc': options.country || 0,
		'port': options.port || '',
		'vlast': 0,
		'typem': options.proxyType || 0
	} : {}

	return new Promise<string[]>(( resolve:any, reject:any ) => {
		request.post( { url: url, form: form}, (err,_, body) => {
			if ( err ) {
				reject( err )
			} else {
				const document = new JSDOM( body ).window.document
				resolve( [].slice.call( document.getElementsByClassName('spy14'))
					.map( (v: HTMLElement) => (v.textContent||'').match(/^(\d+\.\d+\.\d+\.\d+).+(\:\d+)$/))
					.filter( (v?: string[]) => v )
					.map( (v: string[]) => v[1]+v[2]))
			}
		})
	})
}

