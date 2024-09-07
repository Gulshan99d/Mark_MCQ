let currentQuestion = 1;
let currentMarks = [];
const finalResults = [];
const totalQuestions = 10;
const students = [
	{ name: 'Gulshan Kumar Pathak', id: '1' },
	{ name: 'Prince', id: '2' },
	{ name: 'Ritesh', id: '3' },
	{ name: 'Ekam Jot', id: '4' },
];

let editable = false;

// initializing the app
const finalTable = document
	.getElementById('finalResultsTable')
	.getElementsByTagName('thead')[0];

let row = finalTable.insertRow();
for (let i = 0; i <= totalQuestions; i++) {
	if (i === 0) {
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		cell1.innerText = 'Student Name';
		cell2.innerText = 'Student Id';
	} else {
		let cell = row.insertCell(i + 1);
		cell.innerText = `Que ${i}`;
	}
}

let currentStudent = 0;

const btns = document.querySelector('.buttons');
function markAnswer(result) {
	const effect = document.createElement('audio');
	effect.setAttribute('src', 'wav);
	effect.play();
	currentMarks.push(result);

	if (currentQuestion < totalQuestions) {
		currentQuestion++;
		document.getElementById('questionNumber').innerText =
			'Question ' + currentQuestion;
	} else {
		currentStudent++;
		btns.classList.add('hidden');
		document.getElementById('questionNumber').classList.add('hidden');
		showResultsTable();
		document.getElementById('edit').classList.remove('hidden');
		document.getElementById('continueBtn').classList.remove('hidden');
		document.getElementById('downloadBtn').classList.remove('hidden');
	}
}

function showResultsTable() {
	const table = document
		.getElementById('resultsTable')
		.getElementsByTagName('tbody')[0];
	function renderMarks() {
		table.innerHTML = '';
		currentMarks.forEach((result, index) => {
			let bool = result.toLowerCase() === 'right' ? true : false;
			let row = table.insertRow();
			let cell1 = row.insertCell(0);
			let cell2 = row.insertCell(1);
			cell1.innerText = `Question ${index + 1}`;
			if (bool) {
				cell2.id = 'right';
				cell2.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M18.9 35.1q-.3 0-.55-.1-.25-.1-.5-.35L8.8 25.6q-.45-.45-.45-1.1 0-.65.45-1.1.45-.45 1.05-.45.6 0 1.05.45l8 8 18.15-18.15q.45-.45 1.075-.45t1.075.45q.45.45.45 1.075T39.2 15.4L19.95 34.65q-.25.25-.5.35-.25.1-.55.1Z"/></svg>`;
			} else {
				cell2.id = 'wrong';
				cell2.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M24 26.1 13.5 36.6q-.45.45-1.05.45-.6 0-1.05-.45-.45-.45-.45-1.05 0-.6.45-1.05L21.9 24 11.4 13.5q-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45L24 21.9l10.5-10.5q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05L26.1 24l10.5 10.5q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45Z"/></svg>`;
			}
			cell2.addEventListener('click', function () {
				if (editable) {
					let data = result.toLowerCase() === 'right' ? 'wrong' : 'right';
					currentMarks[index] = data;
					renderMarks();
				}
			});
		});
	}
	renderMarks();
	document.getElementById('resultsTable').style.display = 'table';
	document.getElementById('continueBtn').classList.add('hidden');
	document.getElementById('downloadBtn').classList.add('hidden');
}

function continueMarking() {
	btns.classList.remove('hidden');
        editable = false;
	document.getElementById('resultsTable').style.display = 'none';
	document.getElementById('continueBtn').classList.add('hidden');
	document.getElementById('edit').classList.add('hidden');

	// Add data to the hidden final results table
	const finalTable = document
		.getElementById('finalResultsTable')
		.getElementsByTagName('tbody')[0];
	let row = finalTable.insertRow();
	let nameCell = row.insertCell(0);
	let idCell = row.insertCell(1);
	nameCell.innerText = students[currentStudent - 1].name;
	idCell.innerText = students[currentStudent - 1].id;

	currentMarks.forEach((result, index) => {
		let data = result.toLowerCase() === 'right' ? '1' : `0`;
		let cell = row.insertCell(index + 2);
		cell.innerText = data;
	});

	// Clear inputs for next entry
	document.getElementById('studentName').textContent =
		students[currentStudent].name;
	currentMarks = [];
	currentQuestion = 1;
	document.getElementById('questionNumber').classList.remove('hidden');
	document.getElementById('questionNumber').innerText = 'Question 1';
	document.getElementById('continueBtn').classList.add('hidden');
	document.getElementById('resultsTable').style.display = 'none';
	document.getElementById('questionNumber').innerText = 'Question 1';
}

document.getElementById('studentName').textContent =
	students[currentStudent].name;

function downloadResults() {
	let table = document.getElementById('finalResultsTable');
	let wb = XLSX.utils.table_to_book(table, { sheet: 'Results' });
	XLSX.writeFile(wb, 'CEP_Final_Results.xlsx');
}

function showTable() {
	document.querySelector('.output').classList.toggle('hidden');
}

function ToggleEdit() {
	editable = !editable;
	document.getElementById('edit').classList.toggle('active');
}
