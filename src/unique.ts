export function unique<T>( arr: T[] ): T[] {
	const keySet: { [key: string]: T } = {}
	const acc = []
	for ( let i = 0, len = arr.length; i < len; i++ ) {
		const v = arr[i]
		const k = v.toString()
		if ( !keySet.hasOwnProperty( k )) {
			keySet[k] = v
			acc.push( v )
		}
	}
	return acc
}
