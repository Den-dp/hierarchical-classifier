(function( scope ){

	scope.HierarchicalClassifier = function( graph, commandBox ){

		this.add = function( child, parent ){
			if ( !!child ) {
				graph.addNode( child, parent );

				commandBox.addCommand( {
					name: child,
					description: ''
				} );
			}
			update( graph.graphRootNode );

		};

		//this.add( graph.graphRootNode.name );

		this.delete = function( node ){
			graph.deleteNode( node );
			commandBox.removeCommand( node );
			update( graph.graphRootNode );

		};

		this.search = function( node ){
			try {
				var findedNode = graph.search( node );
			} catch (e) {
				console.log( 'Нода с именем "' + node.name + '" не сущесвтует' );
				return;
			}
			var searchedRoot = undefined;
			if (!!findedNode.parent){
				searchedRoot = {
					name: findedNode.parent.name,
					parent: undefined,
					children: null
				};
				searchedRoot.children = [findedNode];
			} else {
				searchedRoot = findedNode;
			}
			console.log( 'Найден ' + findedNode.name );
			update( searchedRoot, findedNode.name );
			// update( graph.graphRootNode, findedNode.name );
		};

		this.repaint = function( ){
			update( graph.graphRootNode );
		};
	};

})( this );