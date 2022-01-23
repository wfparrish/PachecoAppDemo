const sectors = document.querySelectorAll("[id^='sector__link']");
            
sectors.forEach(sector => {
const sectorNumber = sector.children[0].textContent;

sector.addEventListener('click', () => {
        window.location.href = `http://52.11.87.227:3000/sector.html?sectornumber=${sectorNumber}`;
    });
});

let results = []

const resultLoop = async _ => {
    for (let i = 0; i < sectors.length; i++) {
        let number = i + 1;
        const res =  await axios.get(`http://52.11.87.227:3000/api/sector${number}/panels`);
        res.data.forEach(item => {
            item.sector = number
            results.push(item)
        })
    }
}

resultLoop();

document.querySelector('#control-panel__btn__2').addEventListener('click', async () => {
    let sizePrompt = prompt("Enter the panel size: ");
    let tieStripsPrompt = prompt("Enter the number of tie strips: ");
    let linerTypePrompt = prompt("Enter the liner type");

    sectors.forEach(sector => sector.style.backgroundColor = '#2196f3')
   

    userDataStr = sizePrompt.toUpperCase() + tieStripsPrompt + ' ' + linerTypePrompt.toUpperCase();
    for (let i = 0; i <= results.length - 1; i++) {
          let panelDataStr = results[i].size.toUpperCase() + results[i].tieStrips + ' ' + results[i].linerType.toUpperCase();
    
          if (userDataStr === panelDataStr) {
            const result = results[i].sector;
            const id = `sector__link${result}`
            const sector = document.getElementById(id);
            sector.style.backgroundColor = "f56d6d";

            console.log(sector)

          }
    }
  });
