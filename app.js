let currentQuestion = 1;
const totalQuestions = 20;
let currentMarks = [];
const finalResults = [];
const students = [
	{ name: 'Gulshan Kumar Pathak', id: '1' },
	{ name: 'Prince', id: '2' },
	{ name: 'Ritesh', id: '3' },
	{ name: 'Ekam Jot', id: '4' }
];

let currentStudent = 0;

const btns = document.querySelector('.buttons');
function markAnswer(result) {
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
		document.getElementById('continueBtn').classList.remove('hidden');
		document.getElementById('downloadBtn').classList.remove('hidden');
	}
}

function showResultsTable() {
	const table = document
		.getElementById('resultsTable')
		.getElementsByTagName('tbody')[0];
	table.innerHTML = ''; // Clear previous entries
	currentMarks.forEach((result, index) => {
		let row = table.insertRow();
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		cell1.innerText = `Question ${index + 1}`;
		cell2.innerText = result;
	});
	document.getElementById('resultsTable').style.display = 'table';
	document.getElementById('continueBtn').classList.add('hidden');
	document.getElementById('downloadBtn').classList.add('hidden');
}

function continueMarking() {
	btns.classList.remove('hidden');
	document.getElementById('resultsTable').style.display = 'none';
	document.getElementById('continueBtn').classList.add('hidden');

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
	document.getElementById('nameInput').classList.add('hidden');
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
