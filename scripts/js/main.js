var admins = '/scripts/json/admins.json';

window.onload = function(){
	getRequest(playerData, getPlayers);
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

function toggleDrawer(){
	var menuPane = document.getElementById('menuPane');
	var content = document.getElementById('content');
	
	if(menuPane.classList.contains('opened')){
		menuPane.classList.remove('opened');
		content.classList.remove('opened');
	}
	else{
		menuPane.classList.add('opened');
		content.classList.add('opened');
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