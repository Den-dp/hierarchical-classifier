(function( scope, undefined ){
	"use strict";
	function NodeNotFoundException(){
		this.name = "NodeNotFoundException";
	}
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
		this.childrens = [];
	}

	Node.prototype.addChilds = function( addedNode ){
		if( addedNode instanceof Array ){
			for( var i in addedNode ){
				this.childrens.push( addedNode[i] );
			}
		} else {
			this.childrens.push( addedNode );
		}
	};

	Node.prototype.getNodeChilds = function(){
		return this.childrens;
	};

	Node.prototype.getAllChilds = function( ){
		var self = this,
			allChilds = [];

		(function recursiveGetChilds( node ){

			var childs = node.getNodeChilds();
			for( var i in childs ) {
				allChilds.push( childs[i] );
				if( childs[i].getNodeChilds().length ){
					recursiveGetChilds( childs[i] );
				}
			}

		})(this);

		return allChilds;

	};

/**********************************************************************************************************************/
	/**
	 * Function-constructor for Graph object
	 * @constructor
	 */
	scope.Graph = function Graph( child ) {
		this.graphRootNode = !child ? null : new Node( child );

		this.search = function( searchedNodeName, customRootNode ){
			var rootInstance = arguments.length === 2 ? customRootNode : this.graphRootNode;

			var result = (function (searchedNodeName, rootInstance ){
				var searchedNodes = [];
				if ( rootInstance.name === searchedNodeName ) {
					searchedNodes.push(rootInstance);
				} else {
					var allChilds = rootInstance.getAllChilds()
					for ( var i in allChilds ){
						if ( allChilds[i].name === searchedNodeName ){
							searchedNodes.push( allChilds[i] );
						}
					}
				}
				return searchedNodes;
			})(searchedNodeName, rootInstance);

			if (result.length === 0) {
				console.log( '[! Graph.search] При поиске в корневом элементе "'+rootInstance.name+'" и его наследниках не найдено ни одного нода с именем "'+searchedNodeName+'"');
				throw new NodeNotFoundException();
			} else if(result.length > 1) {
				console.log( '[! Graph.search] Каким-то чудом функция поиска нашла более одного элемента, НО будет использован только первый результат!' );
			}
			return result[0];
		};



		this.addNode = function( childNode, parentNode ){
			if ( !this.graphRootNode ){
				this.graphRootNode = new Node(childNode, parentNode)
			}else{
				//search for passed node in current graph
				try {
					parentNode = this.search( parentNode );
				} catch(e) {
					console.log( '[! Graph.addNode] При добавлении нода "' + childNode + '" не удалось найти указанного родителя "'+parentNode+'"');
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
			var cached = deletedNode;
			if ( !(deletedNode instanceof Node) ){
				//search for passed node in current graph
				try {
					deletedNode = this.search( deletedNode );
				} catch(e) {
					deletedNode = null;
				}
			}
			if ( !!deletedNode ) {
				var parent = deletedNode.parent;
				if ( !!parent ) {
					var indexToDelete = parent.childrens.indexOf( deletedNode );
					if ( indexToDelete >= 0 ) {
						parent.childrens.splice(indexToDelete,1);
					}
				}
			} else {
				console.log( '[! Graph.deleteNode] Не вышло удалить "', cached, '" т.к. его не существет.' );
			}
		};
	};
})( this );
