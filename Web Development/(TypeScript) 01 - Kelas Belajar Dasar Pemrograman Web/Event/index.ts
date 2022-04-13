document.addEventListener('DOMContentLoaded', function (){
  const inputMaxLengthOnLoad = document.getElementById("inputNamaPanggilan").maxLength;
  document.getElementById("sisaKarakter").innerText = inputMaxLengthOnLoad;
  document.getElementById('notifikasiSisaKarakter').style.visibility = 'hidden';
});

const nickname = document.getElementById('inputNamaPanggilan');

nickname.addEventListener('input', function () {
const jumlahKarakterDiKetik = document.getElementById('inputNamaPanggilan').value.length;
const jumlahKarakterMaksimal = document.getElementById('inputNamaPanggilan').maxLength;
const notifikasiSisaKarakter = document.getElementById('notifikasiSisaKarakter');
const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiKetik;
const sisaKarakter = document.getElementById('sisaKarakter');
sisaKarakter.innerText = sisaKarakterUpdate;

if (sisaKarakterUpdate == 0) {
  sisaKarakter.innerText = 'Batas Maksimal Tercapai!';
} else if (sisaKarakterUpdate <= 5) {
  notifikasiSisaKarakter.style.color = 'red';
} else {
  notifikasiSisaKarakter.style.color = 'black';
}
}); 

nickname.addEventListener('focus', function () {
notifikasiSisaKarakter.style.visibility = null;
});

nickname.addEventListener('blur', function () {
notifikasiSisaKarakter.style.visibility = 'hidden';
});