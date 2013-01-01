
var demoCommandBox = new CommandBox({
	inputSelector: '.simple-command-box',
	dropDownMenuSelector: '.simple-dropdown-menu',
	dropDownMenuItemTemplate: "<span class='name'>{{name}}</span><span class='description'>{{description}}</span>"
},[
	{
		name: 'add',
		//				shortcut: '+',
		description: 'node name to add',
		listener: function( child, parent ){
			console.log( 'add' );
			hc.add( child, parent );
			return true;
		}
	},{
		name: 'delete',
		shortcut: 'del',
		description: 'node name to delete',
		listener: function( node ){
			console.log( 'del' );
			hc.delete( node );
			return true;
		}
	},{
		name: 'search',
		shortcut: 's',
		description: 'node name to search',
		listener: function( node ){
			console.log( 'search' );
			hc.search( node );
			return true;
		}
	}
]);

/*
var argsArray = [{
	name: 'a',
	description:'this is a'
},{
	name: 'b',
	description:'this is b'
}];

demoCommandBox.addCommand(argsArray);
demoCommandBox.addCommand({
	name: 'c',
	description: 'this is c'
});
demoCommandBox.removeCommand( 'c' );
demoCommandBox.removeCommand( 'b' );
 */