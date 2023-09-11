type TId = number | string

interface Item {
	id: TId
	parent: TId | 'root'
	type?: string | null
}

class TreeStore {
	list: Item[] = []
	objectDictionary: { [key: TId]: any } = {}
	arrayIds: TId[] = []

	constructor(list: Item[]) {
		this.initialize(list)
	}
	initialize(list: Item[]): void {
		list.forEach(item => {
			this.list = list
			this.objectDictionary[item.id] = item
			if (this.arrayIds.indexOf(item.id) !== -1) return
			this.arrayIds.push(item.id)
		})
	}
	getAll(): Item[] {
		return this.list
	}
	getItem(id: TId): Item {
		return this.objectDictionary[id]
	}
	getChildren(id: TId): Item[] {
		return this.arrayIds
			.filter(itemid => this.objectDictionary[itemid].parent == id)
			.map(itemid => this.objectDictionary[itemid])
	}
	getAllChildren(id: TId): Item[] {
		let nextChildrens = this.getChildren(id)

		nextChildrens.forEach(c => {
			if (!c.id) return
			let arr = this.getAllChildren(c.id)
			nextChildrens = nextChildrens.concat(arr)
		})
		return nextChildrens
	}
	getAllParents(id: TId) {
		let arr: Item[] = []
		let item = this.getItem(id)
		
		if (item) {
			if (!arr.length) arr.push(item)
			let ar = this.getAllParents(item.parent)
			arr = arr.concat(ar)
		}

		return arr
	}
}

const items: Item[] = [
	{ id: 1, parent: 'root' },
	{ id: 2, parent: 1, type: 'test' },
	{ id: 3, parent: 1, type: 'test' },

	{ id: 4, parent: 2, type: 'test' },
	{ id: 5, parent: 2, type: 'test' },
	{ id: 6, parent: 2, type: 'test' },

	{ id: 7, parent: 4, type: null },
	{ id: 8, parent: 4, type: null },
]

const ts = new TreeStore(items)

// console.log(ts)
// console.log(ts.getAll())
// console.log(ts.getItem(3))
// console.log(ts.getChildren(2))
// console.log(ts.getAllChildren(2))
console.log(ts.getAllParents(7))
