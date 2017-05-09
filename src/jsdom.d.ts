declare class JSDOM {
	static fromURL: (url: string) => Promise<JSDOM>
	window: Window
	constructor( body: string )
}

export {JSDOM}
