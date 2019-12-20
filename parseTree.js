var tree = [
	{
		name: 'child1',
		childs: [{
			name: 'child1child1',
			childs: []
		}, 
		{
			name: 'child1child2',
			childs:[
				{
				 	name: 'child1child2child1',
					childs: []
				}
			]
		}
		]

	},
	{
		name: 'child2',
		childs: [{
			name: 'child2child1',
			childs: []
		}, 
		{
			name: 'child2child2',
			childs:[
				{
					name: 'child2child2child1',
					childs:[

					]
				}
			]
		}
		]

	}
]



function parseTree(tree) {
	let result = [];
	tree.forEach(el => {
		result.push(el)
		if(el.childs.length > 0) {
			let children = [...el.childs];
			while(children.length > 0) {
				let current = children.pop();
				result.push(current);
				if(current.childs.length > 0) {
					children = children.concat(current.childs);
				}
			}
		} 
	})

	return result;
}



parseTree(tree);
