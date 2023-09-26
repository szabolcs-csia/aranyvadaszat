//állapottér
let seconds = 0;
let gold = 0;
let goldPerClick = 1;
let goldPerSec = 0;

let template = `
<p><strong>${ seconds } másodperc</strong></p>
<img src="./images/gold_taller.png" alt="arany klikkelo">
<p><strong>${ gold } arany</strong></p>
<p>${ goldPerClick } arany / klikk</p>
<p>${ goldPerSec } arany / mp</p>`
;
let clickingAreaNode = document.querySelector(".js-clicking-are-container");

clickingAreaNode.innerHTML = template;

// később ebből objektum lesz
let skillName = 'Aranykutatás'
let goldPerClickIncrement = 1;
let description = 'Ahol a víz áramlását akadályok megváltoztatják, aranyat találhatunk. ';
let amount = 0;
let price = 10;
let link = "./images/aranykutatashoz_aranykutatas.png";



function getSkill(skillName,goldPerClickIncrement, description, amount, price, link) {
    return `
    <tr>
        <td class="upgrade-text-cell">
            <p><strong>${ skillName }(${ goldPerClickIncrement } arany / klikk)</strong></p>
            <p>${ description }</p>
        </td>
        <td class="upgrade-stats-cell">
            <p> db: ${ amount }</p>
            <p> ár: ${ price }</p>
        </td>
        <td class="upgrade-icon-cell">
            <img class="skill-image" src="${ link }"
                alt="${ skillName }">
        </td>
        </tr>
    `
    ;

}

 let skillTemplate =
 getSkill(skillName,goldPerClickIncrement, description, amount, price, link);

 document.querySelector('.js-skills-tbody').innerHTML = skillTemplate

function  getEmployee () {

}

