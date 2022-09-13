let Table;
let TableGUI = document.querySelector("#table");
let buttonsDiv = document.querySelector(".buttons");
let currPlayer = "R";

document.querySelector("#setup").addEventListener("click", () => {
	console.log("cliqué");
	rows = parseInt(document.querySelector("#rows").value);
	columns = parseInt(document.querySelector("#columns").value);
	setup(rows, columns);
});

function setup(rows, columns) {
	Table = new Array(rows);
	for (i = 0; i < rows; i++) {
		Table[i] = new Array(columns).fill(0);
	}
	TableGUI.innerHTML = "";
	rowHTML = "";
	buttonsDiv.innerHTML = "";
	for (i = 0; i < columns; i++) {
		rowHTML += "<div class='case'></div>";
		buttonsDiv.innerHTML += "<div class='jeton R'></div>";
	}
	for (i = 0; i < rows; i++) {
		TableGUI.innerHTML += "<div class='row'>" + rowHTML + "</div>";
	}

	document.querySelectorAll(".buttons>div").forEach((button, index) => {
		button.addEventListener("click", () => {
			placeCoin(currPlayer, index);
			nextPlayer();
		});
	});
}
window.onload = setup(6, 7);

function nextPlayer() {
	currPlayer == "R" ? (currPlayer = "Y") : (currPlayer = "R");
	document.querySelectorAll(".buttons>div").forEach((button) => {
		if (currPlayer == "R") {
			button.classList.replace("Y", "R");
		} else {
			button.classList.replace("R", "Y");
		}
	});
}

function placeCoin(coin, column) {
	isPlaced = false;
	for (i = Table.length - 1; i >= 0; i--) {
		if (!isPlaced) {
			if (Table[i][column] == 0) {
				Table[i][column] = coin;
				cellGUI = document
					.querySelectorAll("div.row")
					[i].querySelectorAll("div")[column];
				cellGUI.classList.remove("case");
				cellGUI.classList.add("jeton");
				cellGUI.classList.add(coin);
				isPlaced = true;
			}
		}
	}
	if (!isPlaced) {
		console.log("Plus de Place");
	}
}
