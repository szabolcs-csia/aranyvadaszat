let clickingAreaNode = document.querySelector('.js-clicking-area-container');

//állapottér
let seconds = 0;
let gold = 0;
let goldPerClick = 1;
let goldPerSec = 0;

function getClikingAreaTemplate(){ 
    return`
        <p><strong>${ seconds } másodperc</strong></p>
        <img 
        src="./images/gold_taller_after.png" 
        alt="arany klikkelo"
        data-enable_click="true"
        class="goldcoin">
        <p><strong>${ gold } arany</strong></p>
        <p>${ goldPerClick } arany / klikk</p>
        <p>${ goldPerSec } arany / mp</p>`;
}
function handleGoldClicked(event) {
if ( event.target.dataset.enable_click === "true") {
        gold +=goldPerClick;
        render();
    }

}

function formatPrice(price) {
    if (price < 1000) return price;
    let kValue = price / 1000;
    return `${kValue}K`;
}

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
        goldPerClickIncrement: 10,
        description:'Baglyok betanítását készpénzre válthatjuk. Magasabb szinten postabaglyokat nevelhetünk. ',
        amount: 0,
        price: 200,
        link: "./images/bagoly.png",
        },
    {
        skillName: 'Gyógyfőzetkészítés',
        goldPerClickIncrement: 25,
        description:'Minél jobban kitanuljuk a gyógyfőzetek készítésének tudományát,annál több gyógyfőzetet tudunk értékesíteni aranyért cserébe.',
        amount: 0,
        price: 750,
        link: "./images/gyogyfozet.png",
        },
    {
        skillName: 'Kereskedelem',
        goldPerClickIncrement: 100,
        description:'Varázstárgyak készítésével és értékesítésével profitot zsebelhetünk be.',
        amount: 0,
        price: 4000,
        link: "./images/kereskedelem2.png",
    },
    {
        skillName: 'Alkímia',
        goldPerClickIncrement: 300,
        description:'Az aranykészítés tudománya titkos recept alapján.',
        amount: 0,
        price: 15000,
        link: "./images/alkimia.png",
    },
    {
        skillName: 'Varázstudomány',
        goldPerClickIncrement: 1000,
        description:'Az alkímia hatását tovább erősíti és oktatási tevékenységet végezhetünk.',
        amount: 0,
        price: 100000,
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
            <p> ár:<strong>${formatPrice(price)}</strong></p>
        </td>
        <td class="upgrade-icon-cell">
            <img class="skill-image" src="${ link }"
                alt="${ skillName }"
                data-enable_click="true">
        </td>
        </tr>
    `
};

let employeeList = [
    {
        employeeName: 'Aranykutató',
        goldPerSecIncrement: 1,
        description:'Aranyat tartalmazó homokból, iszapból aranyat keres és talál. ',
        amount: 0,
        price: 100,
        link: "./images/aranykutato.png",
    },
    {
        employeeName: 'Bagolyidomár',
        goldPerSecIncrement: 5,
        description:'Baglyokat betanító személy, aki a baglyokban élő hajlamot és ösztönt előhívva különféle feladatok elvégzésére képezz ki.',
        amount: 0,
        price: 1000,
        link: "./images/bagoly_idomar.png",
        },
    {
        employeeName: 'Gyógyfőzet készítő',
        goldPerSecIncrement: 10,
        description:'Ősi, hatékony módon gyógyfőzeteket készít és értékesít a piacon.',
        amount: 0,
        price: 3000,
        link: "./images/gyogyfozet_keszito.png",
        },
    {
        employeeName: 'Kereskedő',
        goldPerSecIncrement: 25,
        description:'A szükségletek kielégítésére varázstárgyakat készít és értékesít.',
        amount: 0,
        price: 10000,
        link: "./images/kereskedo.png",
    },
    {
        employeeName: 'Varázsló Professzor',
        goldPerSecIncrement: 100,
        description:'Tanulókat képez ki szerződéses munkatársként.Szabadidejében alkímiával foglalkozik.',
        amount: 0,
        price: 50000,
        link: "./images/varazslo_prof.png",
    },
    {
        employeeName: 'Befektető kacsa',
        goldPerSecIncrement: 250,
        description:'Dagober bácsihoz hasonló szakértelemmel kezeli és fialtatja a vagyonodat.',
        amount: 0,
        price: 200000,
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
            <p> ár: <strong>${formatPrice(price)}</strong></p>
        </td>
        <td class="upgrade-text-cell">
            <p><strong>${employeeName} ( ${goldPerSecIncrement} / mp)</strong></p>
            <p>${description}</p>
        </td>
    </tr>    
    `
};

function render(){
    clickingAreaNode.innerHTML = getClikingAreaTemplate();
    let skillTemplate = '';
for (let i = 0; i < skillList.length; i++) {
skillTemplate += getSkill(skillList[i]);
};
document.querySelector('.js-skills-tbody').innerHTML = skillTemplate;
let bussinesTemplate = '';
for (let i = 0; i < employeeList.length; i++) {
bussinesTemplate += getEmployee(employeeList[i]);
};
document.querySelector('.js-bussines-tbody').innerHTML = bussinesTemplate;
    

}

function initialize () {
seconds = 0;
gold = 0;
goldPerClick = 1;
goldPerSec = 0;

clickingAreaNode.addEventListener('click',handleGoldClicked);
render();
}

initialize();
