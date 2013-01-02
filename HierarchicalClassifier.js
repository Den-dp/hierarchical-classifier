(function( scope ){

	scope.HierarchicalClassifier = function( graph, commandBox ){

//		console.log( graph.search( 'Млекопитающие' ).getChilds( ) );
//		update( graph.root );

		this.add = function( child, parent ){
			if ( !!parent ) {
				graph.addNode( child, parent );
			}
			commandBox.addCommand( {
				name: child,
				description: ''
			} );
			update( graph.graphRootNode );

		};

		this.add( graph.graphRootNode.name );

		this.delete = function( node ){
			graph.deleteNode( node );
			commandBox.removeCommand( node );
			update( graph.graphRootNode );

		};

		this.search = function( node ){
			try {
				var z = graph.search( node );
			} catch (e) {
				console.log( 'Нода с именем "' + node.name + '" не сущесвтует' );
				return;
			}
			console.log( 'Найден ' + z.name );
			update( graph.graphRootNode );
		};
	};

})( this );