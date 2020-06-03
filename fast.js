if (document.head.getElementsByTagName('link')[0].href == "resource://content-accessible/ImageDocument.css") {
	function doit() {
		var style = document.createElement('style');
		style.innerHTML =
			'.downloadBtn { ' +
				'position: fixed; ' +
				'bottom: 10px; ' +
				'right: 10px; ' +
				'background-color: rgba(0, 0, 0, 0.4); ' +
				'color: #FFF; ' +
				'padding: 5px; ' +
				'font-family: Helvetica; ' +
				'cursor: pointer; ' +
			'} ' +
			'\n' +
			'.downloadBtn:hover { ' +
				'background-color: rgb(0, 0, 0); ' +
			'} ';
			
		document.body.appendChild(style);

		var btn = document.createElement("div");
		btn.innerText = "Download";
		btn.className = 'downloadBtn';

		//document.body.innerHTML += "<div style=\"position: fixed; bottom: 10px; right: 10px; background-color: rgba(0, 0, 0, 0.4); color: #FFF; padding: 5px; font-family: Helvetica; cursor: pointer\">Download</div>";
		btn.onclick = function() {
			var img = document.body.getElementsByTagName('img')[0];

			let canvas = document.createElement('canvas');
			canvas.width = img.clientWidth;
			canvas.height = img.clientHeight;

			let context = canvas.getContext('2d');

			// copy image to it (this method allows to cut image)
			context.drawImage(img, 0, 0);
			// we can context.rotate(), and do many other things on canvas

			// toBlob is async opereation, callback is called when done
			canvas.toBlob(function(blob) {
			  // blob ready, download it
			  let link = document.createElement('a');
			  link.download = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

			  link.href = URL.createObjectURL(blob);
			  link.click();

			  // delete the internal blob reference, to let the browser clear memory from it
			  URL.revokeObjectURL(link.href);
			}, 'image/png');
		}

		document.body.appendChild(btn);
	}

	window.addEventListener('load', doit);
}