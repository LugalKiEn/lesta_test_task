const renderPropTable = (name = "", data) => {
    // console.log(data)
    const infoContainer = document.querySelector(".detail-description__container");
    infoContainer.innerHTML = '';
    const weaponInfo = document.createElement("div");
    weaponInfo.classList.add("detail-description__weapon-info");
    switch (name) {
        case "canon":
        case "armor":
        case "rally": {
            if (data.hasOwnProperty("header_data")) {
                data.header_data.forEach(elem => {
                    const weaponContainer = document.createElement("div");
                    weaponContainer.classList.add("detail-description__weapon-container");

                    const weaponImg = document.createElement("img");
                    weaponImg.setAttribute("src", elem.header_img);
                    weaponImg.setAttribute("alt", elem.header_text);

                    const weaponText = document.createElement("p");
                    weaponText.innerText = elem.header_text;

                    weaponContainer.appendChild(weaponImg);
                    weaponContainer.appendChild(weaponText);
                    weaponInfo.appendChild(weaponContainer);
                });

                
            }

            
            break;
        }
        default: {
            const tankName = document.createElement("h2");
            tankName.classList.add("detail-description__tank-name")
            tankName.innerText = data.name;
            infoContainer.appendChild(tankName)
            break;
        }
    }
    const weaponTable = document.createElement("table");
    weaponTable.classList.add("detail-description__weapon-props");
    const weaponTableBody = document.createElement("tbody");

    Object.keys(data.data).forEach(line => {
        const tableRow = document.createElement("tr");
        const tableCellHeader = document.createElement("td");
        tableCellHeader.innerText = line;

        const tableCellDesc = document.createElement("td");
        tableCellDesc.innerText = data.data[line];

        tableRow.appendChild(tableCellHeader);
        tableRow.appendChild(tableCellDesc);
        weaponTableBody.appendChild(tableRow)
    })
    weaponTable.appendChild(weaponTableBody);
    
    infoContainer.appendChild(weaponInfo);
    infoContainer.appendChild(weaponTable);


}

export default renderPropTable;