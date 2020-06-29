var playerData = '/scripts/json/playerdata.json';
var players = [];
var activeDashboard = 0;

function getPlayers(xhttp){
	var object = JSON.parse(xhttp.responseText);
	var playerDashboard = object.player_dashboard;
	var newPlayer = object.new_player;
	players = object.players;
	
	for(var i=0;i<players.length;i++){
		var tempPlayerName = players[i].name;
				
		for(var j=0;j<playerDashboard.length;j++){
			var temp = document.createElement(playerDashboard[j].tag);
			var player = playerDashboard[j];
			
			switch(player.new_id){
				case 'PLAYER_NAME':
					temp.id = tempPlayerName + player.new_id_append;
					break;
				case undefined:
					break;
				default:
					temp.id = player.new_id + i;
					break;
			}
			
			if(player.new_class)
				temp.className = player.new_class;
			
			switch(player.new_text){
				case 'PLAYER_NAME':
					temp.innerHTML = tempPlayerName;
					break;
				case undefined:
					break;
				default:
					temp.innerHTML = player.new_text;
					break;
			}
			
			if(player.new_onclick)
				temp.setAttribute('onclick', player.new_onclick);
			
			switch(player.parent){
				case 'PLAYER_CONTAINER':
					document.getElementById(tempPlayerName + 'Container').appendChild(temp);
					break;
				default:
					document.getElementById(player.parent).appendChild(temp);
					break;
			}
		}
		
		if(i==0){
			document.getElementById(tempPlayerName + 'Tab').classList.add('highlighted');
		}
		if(i>0){
			document.getElementById(tempPlayerName + 'Container').classList.add('hidden');
			dashboardCount++;
		}
	}
	
	for(var i=0;i<newPlayer.length;i++){
		var temp = document.createElement(newPlayer[i].tag);
		
		if(newPlayer[i].new_id)
			temp.id = newPlayer[i].new_id;
		if(newPlayer[i].new_class)
			temp.className = newPlayer[i].new_class;
		if(newPlayer[i].new_text)
			temp.innerHTML = newPlayer[i].new_text;
		if(newPlayer[i].new_onclick)
			temp.setAttribute('onclick', newPlayer[i].new_onclick);
		if(newPlayer[i].parent)
			document.getElementById(newPlayer[i].parent).appendChild(temp);
	}
}