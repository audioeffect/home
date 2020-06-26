var admins = '/scripts/json/admins.json';
var playerData = '/scripts/json/playerdata.json';

window.onload = function(){
	
};

function getRequest(url, callback){
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			callback(this);
		}
	};
	xhttp.open('GET', url, true);
	xhttp.send();
}

function validateLogin(xhttp){
	var object = JSON.parse(xhttp.responseText);
	var loginHint = document.getElementById('login-hint');
	var userLogin = document.getElementById('userLogin').value;
	var passLogin = document.getElementById('passLogin').value;
	var login = document.getElementById('login');
	var unlockIcon = document.getElementById('unlockIcon');
	var userArray = object.users;
	var success = false;
		
	for(var i=0; i<userArray.length; i++){
		if(userLogin == userArray[i].username && passLogin == userArray[i].password){
			success = true;
		}
	}
	
	if(success){
		loginHint.innerHTML = 'Login successful';
		toggleLogin();
		unlockIcon.innerHTML = 'lock_open';
	}
	else{
		loginHint.innerHTML = 'Login failed';
	}
}

function validateRegistration(xhttp){
	var object = JSON.parse(xhttp.responseText);
	var registerHint = document.getElementById('register-hint');
	var userRegister = document.getElementById('userRegister').value;
	var passRegister = document.getElementById('passRegister').value;
	var passRegisterConfirm = document.getElementById('passRegisterConfirm').value;
	var userArray = object.users;
	var success = true;
	
	if(passRegister !== passRegisterConfirm){
		success = false;
	}
	
	for(var i=0; i<userArray.length; i++){
		if(userRegister == userArray[i].username || passRegister == userArray[i].password){
			success = false;
		}
	}
	
	if(success){
		registerHint.innerHTML = 'Registration successful';
	}
	else{
		registerHint.innerHTML = 'Registration failed';
	}
}

function getPlayers(xhttp){
	var object = JSON.parse(xhttp.responseText);
	
	if(object.new_elements){
		var newElem = object.new_elements;
		
		for(var i=0;i<newElem.length;i++){
			var temp = document.createElement(newElem[i].tag);
			
			if(newElem[i].new_id)
				temp.id = newElem[i].new_id;
			if(newElem[i].new_class)
				temp.className = newElem[i].new_class;
			if(newElem[i].new_text)
				temp.innerHTML = newElem[i].new_text;
			if(newElem[i].new_onclick)
				temp.setAttribute('onclick', newElem[i].new_onclick);
			
			content.appendChild(temp);
		}
	}
}

function toggleDrawer(){
	var menuPane = document.getElementById('menuPane');
	var content = document.getElementById('content');
	
	if(menuPane.classList.contains('collapsed')){
		menuPane.classList.remove('collapsed');
		content.classList.remove('collapsed');
	}
	else{
		menuPane.classList.add('collapsed');
		content.classList.add('collapsed');
	}
}

function toggleLogin(){
	var unlock = document.getElementById('unlock');
	var loginMenu = document.getElementById('loginMenu');
	
	if(loginMenu.classList.contains('hidden')){
		loginMenu.classList.remove('hidden');
		unlock.classList.add('highlighted');
	}
	else{
		loginMenu.classList.add('hidden');
		unlock.classList.remove('highlighted');
	}
}