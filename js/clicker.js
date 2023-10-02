let clickingAreaNode = document.querySelector('.js-clicking-area-container');
let inventoryContainerNode =document.querySelector('.js-inventory-container');

//állapottér
let { seconds, gold, goldPerClick, goldPerSec, skillList, employeeList } = getInitialState();

function getInitialState(){
    //fontos: a skillList és az employeeList tömbök nincsenek alapértelmezéásbe hozva
    return {
        seconds: 0,
        gold: 1e7,
        goldPerClick: 1,
        goldPerSec: 1,
        skillList: [
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
        ],
        employeeList: [
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
        ],
    }
};

function getClickingAreaTemplate(){ 
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
};

/***************Click event listeneres*******/
function handleGoldClicked(event){
    if(event.target.dataset.enable_click === 'true'){
        gold += goldPerClick;
        render();
}
}

function handleInventoryClicked(event) {
    let clickIndex = event.target.dataset.index;
    if(typeof clickIndex !=='undefined' ){
    let clickedSkill = skillList[clickIndex];
    if ( gold < clickedSkill.price ) {
        alert("nincs elég arany!");
        return;
    }
    gold -=   clickedSkill.price;
    goldPerClick += clickedSkill.goldPerClickIncrement;
    clickedSkill.amount += 1;
    render();
    }
}

/*****PRE: 0 <= PRICE <= 999999*/
function formatPrice(price){
    if( price < 1000) return price;
   let kValue = price / 1000;
   return `${kValue}K`;
};


function getSkill({ skillName, goldPerClickIncrement, description, amount, price, link }, index) {
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
                data-enable_click="true" data-index="${index}"/>
        </td>
        </tr>
    `
};

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

function  render() {
    clickingAreaNode.innerHTML = getClickingAreaTemplate();
    document.querySelector(".js-skills-tbody").innerHTML = skillList.map(getSkill).join("");
    document.querySelector(".js-bussines-tbody").innerHTML = employeeList.map(getEmployee).join("");

}

function initialize() {
    let data = getInitialState();
    seconds = data.seconds;
    gold = data.gold;
    goldPerClick = data.goldPerClick;
    goldPerSec = data.goldPerSec;

    clickingAreaNode.addEventListener('click',handleGoldClicked);
    inventoryContainerNode.addEventListener('click',handleInventoryClicked);
    render();
};


initialize();