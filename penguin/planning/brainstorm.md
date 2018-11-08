Main Zome:
	task:
		{
		title:
		description:
		timestamp:
		},
		Link1:{
		base:agentHash,
		link:taskHash,
		tag:tasks
		},
		Link2:{
		base:DNA,
		link:taskHash,
		tag:tasks
		}
	transaction:
		{
		origin:hash
		destination:hash
		pebbles:
		timestamp:
		},
		Link1:{
		base:origin,
		link: transaction hash,
		tag: withdrawals
		},
		link2:{
		base:destination,
		link: transaction hash,
		tag: deposits
		}
	solution:
		{
		link: OPTIONAL
		text: OPTIONAL
		timestamp:
		},
		Link1:{
		base:Agent,
		link:solution hash,
		tag: solutions
		},
		Link2:{
		base:task,
		link:solution hash,
		tag:solutions
		}
	comment:
		{
		text:
		timestamp:
		},
		Link1:{
		base:Agent,
		link:comment hash,
		tag: comments
		},
		Link2:{
		base:task,
		link:comment hash,
		tag:comments
		}t

functions
	reward:
	//only executed by the creater
	//creates transaction from the task to the winner

	tabulate:
	//get all links to transactions and calculate net pebbles

