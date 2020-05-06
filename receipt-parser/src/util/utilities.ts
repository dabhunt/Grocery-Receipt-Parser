    
    //take a string and return a modified version of that string without any numbers in it
    export function removeNumbers (str)
    {
        var newStr = str;
        //gets all the digits in the string, and splits them into chars, then searches for them with replaceAll
        var strArray = str.replace(/\D/g, '').split('');
        return replaceAll(newStr,strArray,'');
    }
	//takes a string, an array of strings that you want to find, and a string that you want them all replaced with
    //returns the modified passed in string with replacements made
    export function replaceAll(str, findStrings, replace)
	{
		for (var i = 0; i < findStrings.length; i ++){
			str = str.replace(new RegExp(findStrings[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
		}
		return str;
    }
    export function MakeSearchable(str)
    {
        str = removeNumbers(str);
        //strings that should be replaced with '' Use space at the end
		var removeStrings = [' OZ','ORGANIC', ' ORG', 'ORG ', ' CT'];
		//strings that should be replaced with %20 to indicate a space for the query
		var replaceEmptyStrings = ['\r','&','  ', ' ',];
		//replace these characters in the string with empty strings
		str = replaceAll(str,removeStrings, '');
		//replace all space characters with %20
		str = replaceAll(str,replaceEmptyStrings, '%20');
        //str = this.removeNumbers(str);
        return str;
    }
    /*takes a virtual dom node as an argument and turns it into a real dom node
    */
    export function renderNode(vnode) {  
        // Strings just convert to #text Nodes:
        if (vnode.split) return document.createTextNode(vnode);
        // create a DOM element with the nodeName of our VDOM element:
        let n = document.createElement(vnode.nodeName);
        // copy attributes onto the new node:
        let a = vnode.props || {};
        Object.keys(a).forEach( k => n.setAttribute(k, a[k]) );
        // render (build) and then append child nodes:
        (vnode.children || []).forEach( c => n.appendChild(renderNode(c)) );
        return n;
    }