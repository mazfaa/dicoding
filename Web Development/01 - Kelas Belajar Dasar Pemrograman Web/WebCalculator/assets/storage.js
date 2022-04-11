const HISTORY_KEY = 'calculation_history';

function checkForStorage () {
  return typeof(Storage) !== 'undefined';
}

function putHistory (data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(HISTORY_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    }

    historyData.unshift(data);
    
    if (historyData.length > 5) {
      historyData.pop();
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
  }
}

function showHistory () {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } else {
    return [];
  }
}

function renderHistory () {
  const historyData = showHistory();
  const historyList = document.getElementById('historyList');

  /* Selalu hapus konten HTML pada history list agar tidak menampilkan data ganda  */
  historyList.innerHTML = '';

  for (let history of historyData) {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${history.firstNumber}</td>
      <td>${history.operator}</td>
      <td>${history.secondNumber}</td>
      <td>${history.result}</td>
    `;

    historyList.append(row);
  }
}

renderHistory();