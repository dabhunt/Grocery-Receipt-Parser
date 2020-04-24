    
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