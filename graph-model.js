(function( scoupe, undefined ){
	"use strict";

/**********************************************************************************************************************/
	/**
	 * Function-constructor for Node object
	 * @param childName name of created Node
	 * @param [parent] of added Node
	 * @constructor
	 */
	function Node ( childName, parent ){
		this.name = childName;
		this.parent = parent instanceof Node ? parent : undefined;
		this.children = [];
		this.size = 10000;
	}

	Node.prototype.addChilds = function( node ){
		if( node instanceof Array ){
			for( var i in node ){
				this.children.push( node[i] );
			}
		} else {
			this.children.push( node );
		}
	};

	Node.prototype.getChilds = function( ){
		var self = this;

		return (function getChild(){
			var res = [];

			for( var i in self.children ) {

				var node = self.children[i];
				var childs = node.getChilds( );
				for ( var i in childs ) {
					res.push( childs[i] );
				}
				res.push( node );

			}
			return res;
		})();
	};

/**********************************************************************************************************************/
	/**
	 * Function-constructor for Graph object
	 * @constructor
	 */
	scoupe.Graph = function Graph( child ) {
		this.root = new Node( child );
		console.log( this.root );

		this.search = function( nodeName ){

			var rootInstance = this.root;

			// passed nodeName is the root Node?
			if ( rootInstance.name === nodeName ) {
				//return him
				return rootInstance;
			} else {

				for ( var node in rootInstance.children ) {
					if ( rootInstance.children[node].name === nodeName ) {
						return rootInstance.children[node];
					}
				}

			}
		};

		this.addNode = function( childNode, parentNode ){

			var parent = this.search( parentNode );
			var node = new Node( childNode, parent );
			if ( !!parent ) {
				parent.addChilds( node );
			}

		};

		/**
		 * Delete passed node from graph
		 *
		 * TODO create deep recursive deleting
		 * @param deletedNode - name or object reference of deleting node
		 */
		this.deleteNode = function( deletedNode ){
			if ( !(deletedNode instanceof Node) ){
				deletedNode = this.search( deletedNode );
			}
			if ( !!deletedNode ) {
				var parent = deletedNode.parent;
				if ( !!parent ) {
					var indexToDelete = parent.children.indexOf( deletedNode );
					if ( indexToDelete >= 0 ) {
						parent.children.splice(indexToDelete,1);
					}
				}
			}
		};

	};

})( this );
