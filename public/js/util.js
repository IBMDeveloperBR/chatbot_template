
const setStorage = (name,value) => {
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem(name, JSON.stringify(value));
	}
	else {
		// Sorry! No Web Storage support.. use cookie instead..
		setCookie(name, JSON.stringify(value));
	}
}

const setSession = (name, value) => {
	if (typeof(Storage) !== "undefined") {
		sessionStorage.setItem(name, JSON.stringify(value));
	}
	else {
		setCookie(name, JSON.stringify(value));
	}
}


const setCookie = (cname, cvalue) => {
	var d = new Date();
	d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


const  getSession = (name) => {
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		return JSON.parse(sessionStorage.getItem(name));
	}
	else {
		// Sorry! No Web Storage support.. use cookie instead..
		return JSON.parse(getCookie(name));
	}
}

const getStorage = (name) => {
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		return JSON.parse(localStorage.getItem(name));
	}
	else {
		// Sorry! No Web Storage support.. use cookie instead..
		return JSON.parse(getCookie(name));
	}
}

const sessionCheck = (name) => {
	
	if (typeof(Storage) !== "undefined") {
		if(sessionStorage.getItem(name)){
			return true;
		}
		return false;
		// return sessionStorage.user != null && sessionStorage.user != '' && sessionStorage.user !== "undefined";
	}
	else {
		//No storage , use cookie..
		return checkCookie(name);
	}
}

const getCookie = (cname) => {
	name = name + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";

}

const checkCookie = (cname) => {
	var username = getCookie(cname);

	if (username != "" && username != null) {
		return true;
	}
	else {
		return false;
	}
}

const deleteSession = (name) => {
	if (typeof(Storage) !== "undefined") {
		sessionStorage.removeItem(name);
	}
	else {
		deleteCookie(name);
	}
}

const deleteStorage = (name) => {
	if (typeof(Storage) !== "undefined") {
		localStorage.removeItem(name);
	}
	else {
		deleteCookie(name);
	}
}

const deleteCookie = (cname) => {
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



const removeClass = (id, name) => {
    var element = document.getElementById(id);
    if (element.className.indexOf(name) != -1) element.className = element.className.replace(new RegExp(name, 'g'), '');
}

const addClass = (id, name) => {
    var element = document.getElementById(id);
    if (element.className.indexOf(name) == -1) element.className = element.className + ' ' + name;
}


