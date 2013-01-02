var w = 600,
	h = 800,
	node,
	link,
	root;

var force = d3.layout.force()
	.on("tick", tick)
	.charge(function(d) { return d._children ? -d.size / 100 : -250; })
	.linkDistance(function(d) {	return d.target._children ? 160 : 80; })
	.size([w, h - 160]);

var vis = d3.select("body").append("svg")
	.attr("width", w)
	.attr("height", h);

function update( json ) {
	root = json;
	root.fixed = true;
	root.x = w / 2;
	root.y = 20;
	var nodes = flatten(root),
		links = d3.layout.tree().links(nodes);

	// Restart the force layout.
	force
		.nodes(nodes)
		.links(links)
		.start();

	// Update the links…
	link = vis.selectAll("line.link")
		.data(links);//, function(d) { return d.target.id; });

	// Enter any new links.
	link.enter().insert("line", ".node")
		.attr("class", "link");

	// Exit any old links.
	link.exit().remove();

	node = vis.selectAll("g.node")
		.data( nodes , function(d) { return d.id; });

	// Enter any new nodes.
	node.enter().insert("g",".node")
		.attr("class", "node")
		.call(force.drag);

	// Update the nodes…
	node.insert("circle")
		.attr("r",10);

	node.insert("text")
		.attr("dx", 15)
		.attr("dy", 3)
		.text(function(d){ return d.name; });

	node.transition()
		.attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(d.size) / 10; });

	node.exit().remove();
	$('.node > * + * + * + *').parent().find('text').first().remove()
}

function tick() {
	link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });

	node.attr("transform", function(d) {
		return "translate(" + d.x + "," + d.y + ")";
	});
}

// Returns a list of all nodes under the root.
function flatten(root) {
	var nodes = [], i = 0;

	function recurse(node) {
		if (node.children){
			node.size = node.children.reduce(function(p, v) { return p + recurse(v); }, 0);
		}
		if (!node.id) {
			node.id = ++i;
		}
		nodes.push(node);
		return node.size;
	}

	root.size = recurse(root);
	return nodes;
}