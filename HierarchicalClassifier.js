(function( scope ){

	scope.HierarchicalClassifier = function( graph, commandBox ){

//		console.log( graph.search( 'Млекопитающие' ).getChilds( ) );
		update(  graph.root );

		this.add = function( child, parent ){
			if ( !!parent ) {
				graph.addNode( child, parent );
			}
			commandBox.addCommand( {
				name: child,
				description: child
			} );
			update( graph.root );

		};

		this.add( graph.root.name );

		this.delete = function( node ){
			graph.deleteNode( node );
			commandBox.removeCommand( node );
			update( graph.root );

		};

		this.search = function( node ){
			console.log( 'searching' );
			var z = graph.search( node );
			update( graph.root );
			console.log( '"%s" finded', z.name );
		};
	};

})( this );