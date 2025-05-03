let tugas = []
let tugasFromStorage = localStorage.getItem("save");

const countDone = document.getElementById("countDone");
const barDone = document.getElementById("barDone");

let jumlahSelesai = 0;

if (tugasFromStorage) {
    tugas = JSON.parse(tugasFromStorage);
    console.log(tugas);
    updateTugas();
}

const addPage = document.getElementById("addPage");

const addTugas = ()=> {
    const inputTugas = document.getElementById("inputTugas");
    const text = inputTugas.value.trim();
    if(addPage.checkValidity()){
        tugas.push({
            text: text,
            selesai: false
        })
        localStorage.setItem("save", JSON.stringify(tugas))
        updateTugas()
    } else {
        addPage.reportValidity()
    }
}

function updateTugas() {
    console.log(tugas)
    const listPage = document.getElementById("listPage");
    listPage.innerHTML = "";
    tugas.forEach((tugas, index) =>{
    const listTugas = document.createElement("li");
    listTugas.innerHTML = `
    <div class="w-full flex shadow-2xl">
        <h1 class="text-white text-[12px] poppins-medium w-full">${tugas.text}</h1>
        <button class="compBut text-white cursor-pointer hover:brightness-110"><i class=" text-lg fa-solid fa-circle-check"></i></button>
    </div>
    `;
    listPage.appendChild(listTugas);
    })
    const compBut = document.querySelectorAll(".compBut");
    jumlahSelesai = 0;
    compBut.forEach((comp, index)=>{
    comp.addEventListener('click', function(){
        tugas[index].selesai = true;
        localStorage.setItem("save", JSON.stringify(tugas))
        updateTugas();
        console.log(tugas[index].selesai);
    })
    if(tugas[index].selesai){
        comp.style.color = "#38bdf8"
        jumlahSelesai += 1;
    }
    countDone.innerHTML = `${jumlahSelesai}/${tugas.length}`
    barDone.style.background = `linear-gradient(to right, #38bdf8 ${jumlahSelesai/tugas.length*100}%, white 0%)`
})
}


addPage.addEventListener("submit", function(e){
    e.preventDefault();
    addTugas();
})

const clearDekstop = document.getElementById("clearDekstop")
clearDekstop.onclick = function(){
    tugas = [];
    localStorage.removeItem("save")
    updateTugas();
}
const clearMobile = document.getElementById("clearMobile")
clearMobile.onclick = function(){
    tugas = [];
    localStorage.removeItem("save")
    updateTugas();
}
