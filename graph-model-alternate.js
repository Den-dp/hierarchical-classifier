(function( scope, undefined ){
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
		this.level
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

	Node.prototype.getAllChilds = function( ){
		var self = this;

		return (function getChild(){
			var allChilds = [];

			for( var i in self.children ) {

				var childNode = self.children[i];
				var childsOfChild = childNode.getAllChilds( );
				for ( var i in childsOfChild ) {
					allChilds.push( childsOfChild[i] );
				}
				allChilds.push( childNode );
			}
			return allChilds;
		})();
	};

/**********************************************************************************************************************/
	/**
	 * Function-constructor for Graph object
	 * @constructor
	 */
	scope.Graph = function Graph( child ) {
		this.graphRootNode = !child ? null : new Node( child );


		function recursion( childs, nodeName ){

			//console.log( "childs", childs );
			for ( var i = 0, l = childs.length; i < l; i++ ) {
				//console.log( childs[i].name, i, nodeName );
				if ( childs[i].name === nodeName ) {
					return childs[i];
				}
			}
			for( var i= 0, l=childs.length; i < l; i++ ){
//				for( var j in childs[i].children){
					recursion( childs[i].children, nodeName );
//				}
			}
//			//console.log( 'gabella!' );
//			return null;
			
		}


		this.search = function( nodeName ){

			var rootInstance = this.graphRootNode;

			// passed nodeName is the root Node?
			if ( rootInstance.name === nodeName ) {
				//return him
				return rootInstance;
			} else {
				return recursion( rootInstance.children, nodeName );
			}
		};

		this.addNode = function( childNode, parentNode ){
			if ( !this.graphRootNode ){
				this.graphRootNode = new Node(childNode, parentNode)
			}else{
				try {
					//search for passed node in current graph
					parentNode = this.search( parentNode );
				} catch (NotFoundNodeException){
					console.log( 'NotFoundNodeException in Graph.addNode(), Graph.search dont found "' + parentNode + '"' );
					return;
				}
				//create new node
				var node = new Node( childNode, parentNode );
				//setup childs
				parentNode.addChilds( node );
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
