//állapottér
let seconds = 0;
let gold = 0;
let goldPerClick = 1;
let goldPerSec = 0;

function getTemplate(){ 
    return`
        <p><strong>${ seconds } másodperc</strong></p>
        <img src="./images/gold_taller.png" alt="arany klikkelo">
        <p><strong>${ gold } arany</strong></p>
        <p>${ goldPerClick } arany / klikk</p>
        <p>${ goldPerSec } arany / mp</p>`
;
}
let clickingAreaNode = document.querySelector('.js-clicking-area-container');

clickingAreaNode.innerHTML = getTemplate();

let skillList = [
    {
        skillName: 'Aranykutatás',
        goldPerClickIncrement: 1,
        description:'Ahol a víz áramlását akadályok megváltoztatják, aranyat találhatunk. ',
        amount: 0,
        price: 10,
        link: "./images/aranykutatashoz_aranykutatas.png",
    },
    {
        skillName: 'Bagolyidomítás',
        goldPerClickIncrement: 1,
        description:'Baglyok betanítását készpénzre válthatjuk. Magasabb szinten postabaglyokat nevelhetünk. ',
        amount: 0,
        price: '125K',
        link: "./images/bagoly.png",
        },
    {
        skillName: 'Gyógyfőzetkészítés',
        goldPerClickIncrement: 1,
        description:'Minél jobban kitanuljuk a gyógyfőzetek készítésének tudományát,annál több gyógyfőzetet tudunk értékesíteni aranyért cserébe.',
        amount: 0,
        price: '125k',
        link: "./images/gyogyfozet.png",
        },
    {
        skillName: 'Kereskedelem',
        goldPerClickIncrement: 1,
        description:'Varázstárgyak készítésével és értékesítésével profitot zsebelhetünk be.',
        amount: 0,
        price: '125',
        link: "./images/kereskedelem2.png",
    },
    {
        skillName: 'Alkímia',
        goldPerClickIncrement: 1,
        description:'Az aranykészítés tudománya titkos recept alapján.',
        amount: 0,
        price: '125K',
        link: "./images/alkimia.png",
    },
    {
        skillName: 'Varázstudomány',
        goldPerClickIncrement: 1,
        description:'Az alkímia hatását tovább erősíti és oktatási tevékenységet végezhetünk.',
        amount: 0,
        price: '125K',
        link: "./images/varazs_tudomany.png",
    },
];

function getSkill({ skillName, goldPerClickIncrement, description, amount, price, link }) {
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
   };

 let skillTemplate = '';

for (let i = 0; i < skillList.length; i++) {
  skillTemplate += getSkill(skillList[i]);
}
;

document.querySelector('.js-skills-tbody').innerHTML = skillTemplate

let employeeList = [
    {
        employeeName: 'Aranykutató',
        goldPerSecIncrement: 1,
        description:'Aranyat keres és talál. ',
        amount: 0,
        price: 100,
        link: "./images/aranykutato.png",
    },
    {
        employeeName: 'Bagolyidomár',
        goldPerSecIncrement: 1,
        description:'Szerződéses munkatársként baglyokat tanít.',
        amount: 0,
        price: '125K',
        link: "./images/bagoly_idomar.png",
        },
    {
        employeeName: 'Gyógyfőzet készítő',
        goldPerSecIncrement: 1,
        description:'Gyógyfőzeteket készít és értékesít a piacon.',
        amount: 0,
        price: '125k',
        link: "./images/gyogyfozet_keszito.png",
        },
    {
        employeeName: 'Kereskedő',
        goldPerSecIncrement: 1,
        description:'Varázstárgyakat készít és értékesít.',
        amount: 0,
        price: '125',
        link: "./images/kereskedo.png",
    },
    {
        employeeName: 'Varázsló Professzor',
        goldPerSecIncrement: 1,
        description:'Tanulókat képez ki szerződéses munkatársként.Szabadidejében alkímiával foglalkozik.',
        amount: 0,
        price: '125K',
        link: "./images/varazslo_prof.png",
    },
    {
        employeeName: 'Befektető kacsa',
        goldPerSecIncrement: 1,
        description:'Dagober bácsihoz hasonló szakértelemmel kezeli és fialtatja a vagyonodat.',
        amount: 0,
        price: '125K',
        link: "./images/arany_kacsa.png",
    },
];



function getEmployee({ employeeName, goldPerSecIncrement, description, amount, price, link }) {
    return`
    <tr>
        <td class="upgrade-icon-cell">
            <img class="skill-image" src="${ link }" alt="${ employeeName }">
        </td>
        <td class="upgrade-stats-cell">
            <p> db: ${ amount }</p>
            <p> ár: ${ price }</p>
        </td>
        <td class="upgrade-text-cell">
            <p><strong>${employeeName} ( ${goldPerSecIncrement} / mp)</strong></p>
            <p>${description}</p>
        </td>
    </tr>    
    `
}
let bussinesTemplate = '';

for (let i = 0; i < employeeList.length; i++) {
  bussinesTemplate += getEmployee(employeeList[i]);
}
;

document.querySelector('.js-bussines-tbody').innerHTML = bussinesTemplate;
