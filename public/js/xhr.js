
//utilities
function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else {
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
			try {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) { }
		}
	}
	return null;
}

const xhrGet = (url, callback, errback) => {
	var xhr = new createXHR();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				callback(parseJson(xhr.responseText));
			} else {
				errback('service not available');
			}
		}
	};

	xhr.timeout = 100000;
	xhr.ontimeout = errback;
	xhr.send();
}



const xhrPost = (url, data, callback, errback) => {
	var xhr = new createXHR();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				callback(JSON.parse(xhr.responseText));
			} else {
				errback(JSON.parse(xhr.responseText));
			}
		}
	};
	// xhr.onerror = errback();
	xhr.timeout = 5000;
	xhr.ontimeout = errback;
	xhr.send(JSON.stringify(data));
}

