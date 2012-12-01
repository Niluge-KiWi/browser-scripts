// ==UserScript==
// @name          Last.fm titles with Google
// @namespace     http://www.niluge-kiwi.info
// @description   Shows a link to Google next to an artist's name on artists/albums/tracks pages on last.fm. Version 0.4.
// @include       http://*.last.fm/music/*
// @include       http://last.fm/music/*
// ==/UserScript==

/// changelog
// v0.4
// - fixed for new last.fm (NK)
// - changed icon for google favicon (NK)
// v0.3
// - initial release (http://mll2.free.fr)

(function() 
{

	var localeTLD = ".com"; //set your tld here, example ".fr". Default is ".com"

  function insertAfter(this, newNode) {
    var parent = this.parentNode;
	  if (parent.lastChild == this)
    {
		  parent.appendChild(newNode);
		}
    else
    {
		  parent.insertBefore(newNode, this.nextSibling);
		}
  }

	function getNodeText(node, goDeep)
	{
		var nodeText = node.nodeValue;
		
		if (goDeep && nodeText == null && node.childNodes != null && node.childNodes.length > 0)
		{
			nodeText= "";
			
			for (var i=0; i < node.childNodes.length; ++i)
			{
				nodeText += getNodeText(node.childNodes.item(i), goDeep);	
			}
		}
		return(nodeText == null ? "" : nodeText);
	}
	
	function makeLink(artistName)
	{
		if (artistName != null && artistName.length > 0 && artistName != "Overview" && artistName != "Music")
		{
			var newLink = document.createElement("a");
			newLink.setAttribute("href", "http://www.google" + localeTLD + "/search?q=" + artistName + "");

			var newImg = document.createElement("img");
			newImg.setAttribute("src", "https://www.google.com/favicon.ico");
			newImg.setAttribute("style", "display: inline-block; vertical-align: middle; margin-left: 0.5em;");
//      newImg.setAttribute("onmouseover", "-webkit-filter: grayscale(0.5);");
      newImg.setAttribute("alt", "Google");
			newLink.appendChild(newImg);

			return(newLink);
		}
		
		return(null);
	}
		
	function insertLinks()
	{
		
		var titles = document.getElementsByTagName("h1");
		var node;
		var class_;
		var link_;
		
		//for the artist's name when on an artist page
		for (var i = 0; i < titles.length; ++i)
		{
			node = titles[i];
			class_ = node.getAttribute("itemprop");
			if (class_.indexOf("name") >= 0)
			{
				link_ = makeLink(getNodeText(node, true));
				if (link_ != null)
				{
					insertAfter(node, link_);
				}
			}
		}

		//for the artist's name when on an album / track page
		titles = document.getElementsByTagName("a");
		for (i = 0; i < titles.length; ++i)
		{
			node = titles[i];
			class_ = node.getAttribute("class");
			if ( class_ != null)
			{
				if (class_.indexOf("miniartist") >= 0)
				{
					link_ = makeLink(getNodeText(node, true));
					if (link_ != null)
					{
            insertAfter(node, link_);
					}
				}
			}
		}

	}
	
	insertLinks();
	
})();
