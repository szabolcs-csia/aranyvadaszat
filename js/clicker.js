let clickingAreaNode = document.querySelector('.js-clicking-area-container');
let skillsContainerNode = document.querySelector('.js-skills-container');
let employeecontainerNode = document.querySelector('.js-employee-container');
let timerAreaNode = document.querySelector('.js-timer-area');
let goldAreaNode = document.querySelector('.js-gold-area');

const CHANGE_TYPE = {
    SKILL: 'SKILL',
    EMPLOYEE: 'EMPLOYEE',
    TIME: 'TIME',
    ALL: 'ALL',
    GOLD: 'GOLD',
};

//állapottér
let {
    seconds,
    gold,
    goldPerClick,
    goldPerSec,
    skillList,
    employeeList,
    startTimestamp,
    skillsChanged,
    employeeChanged,
} = getInitialState();

function getInitialState() {
    //fontos: a skillList és az employeeList tömbök nincsenek alapértelmezésbe hozva

    return {
        intervalId: setInterval(administrateTime, 2000),
        startTimestamp: new Date().getTime(),
        seconds: 0,
        gold: 0,
        goldPerClick: 1,
        goldPerSec: 1,
        skillList: [
            {
                skillName: 'Aranykutatás',
                goldPerClickIncrement: 1,
                description: 'Ahol a víz áramlását akadályok megváltoztatják, aranyat találhatunk. ',
                amount: 0,
                price: 20,
                link: "./images/aranykutatashoz_aranykutatas.png",
            },
            {
                skillName: 'Bagolyidomítás',
                goldPerClickIncrement: 10,
                description: 'Baglyok betanítását készpénzre válthatjuk. Magasabb szinten postabaglyokat nevelhetünk. ',
                amount: 0,
                price: 150,
                link: "./images/bagoly.png",
            },
            {
                skillName: 'Gyógyfőzetkészítés',
                goldPerClickIncrement: 25,
                description: 'Minél jobban kitanuljuk a gyógyfőzetek készítésének tudományát,annál több gyógyfőzetet tudunk értékesíteni aranyért cserébe.',
                amount: 0,
                price: 400,
                link: "./images/gyogyfozet.png",
            },
            {
                skillName: 'Kereskedelem',
                goldPerClickIncrement: 100,
                description: 'Varázstárgyak készítésével és értékesítésével profitot zsebelhetünk be.',
                amount: 0,
                price: 1500,
                link: "./images/kereskedelem2.png",
            },
            {
                skillName: 'Alkímia',
                goldPerClickIncrement: 300,
                description: 'Az aranykészítés tudománya titkos recept alapján.',
                amount: 0,
                price: 4000,
                link: "./images/alkimia.png",
            },
            {
                skillName: 'Varázstudomány',
                goldPerClickIncrement: 1000,
                description: 'Az alkímia hatását tovább erősíti és oktatási tevékenységet végezhetünk.',
                amount: 0,
                price: 12000,
                link: "./images/varazs_tudomany.png",
            },
        ],
        employeeList: [
            {
                employeeName: 'Aranykutató',
                goldPerSecIncrement: 1,
                description: 'Aranyat tartalmazó homokból, iszapból aranyat keres és talál. ',
                amount: 0,
                price: 200,
                link: "./images/aranykutato.png",
            },
            {
                employeeName: 'Bagolyidomár',
                goldPerSecIncrement: 10,
                description: 'Baglyokat betanító személy, aki a baglyokban élő hajlamot és ösztönt előhívva különféle feladatok elvégzésére képezz ki.',
                amount: 0,
                price: 1800,
                link: "./images/bagoly_idomar.png",
            },
            {
                employeeName: 'Gyógyfőzet készítő',
                goldPerSecIncrement: 40,
                description: 'Ősi, hatékony módon gyógyfőzeteket készít és értékesít a piacon.',
                amount: 0,
                price: 7000,
                link: "./images/gyogyfozet_keszito.png",
            },
            {
                employeeName: 'Kereskedő',
                goldPerSecIncrement: 100,
                description: 'A szükségletek kielégítésére varázstárgyakat készít és értékesít.',
                amount: 0,
                price: 15000,
                link: "./images/kereskedo.png",
            },
            {
                employeeName: 'Varázsló Professzor',
                goldPerSecIncrement: 350,
                description: 'Tanulókat képez ki szerződéses munkatársként.Szabadidejében alkímiával foglalkozik.',
                amount: 0,
                price: 48000,
                link: "./images/varazslo_prof.png",
            },
            {
                employeeName: 'Befektető kacsa',
                goldPerSecIncrement: 1000,
                description: 'Dagober bácsihoz hasonló szakértelemmel kezeli és fialtatja a vagyonodat.',
                amount: 0,
                price: 120000,
                link: "./images/arany_kacsa.png",
            },
        ],
    }
};



function administrateTime() {
    let currentTimestamp = new Date().getTime();
    let elapsedTime = Math.floor((currentTimestamp - startTimestamp) / 1000);
    let rewardSeconds = elapsedTime - seconds;
    if (rewardSeconds > 0) {
        gold += rewardSeconds * goldPerSec;
        seconds = elapsedTime;
        render(CHANGE_TYPE.TIME);
    }
}


/**********************************Click event listeneres************************************/
function handleGoldClicked(event) {
    if (event.target.dataset.enable_click === 'true') {
        gold += goldPerClick;
        render(CHANGE_TYPE.GOLD);
    }
}

function handleSkillsClicked(event) {
    let clickIndex = event.target.dataset.index;
    if (typeof clickIndex !== 'undefined') {
        let clickedSkill = skillList[clickIndex];
        if (gold < clickedSkill.price) {
            alert("Nincs elég aranyad!");
            return;
        }
        gold -= clickedSkill.price;
        goldPerClick += clickedSkill.goldPerClickIncrement;
        clickedSkill.amount += 1;
        render(CHANGE_TYPE.SKILL);
    }
}

function handleEmployeeClicked(event) {
    let clickIndex = event.target.dataset.index;
    if (typeof clickIndex !== 'undefined') {
        let clickedEmployee = employeeList[clickIndex];
        if (gold < clickedEmployee.price) {
            alert("Nincs elég aranyad!");
            return;
        }
        gold -= clickedEmployee.price;
        goldPerSec += clickedEmployee.goldPerSecIncrement;
        clickedEmployee.amount += 1;
        render(CHANGE_TYPE.EMPLOYEE);
    }
}

/************************************templates*****************************************/
/*****PRE: 0 <= PRICE <= 999999*/
function formatPrice(price) {
    if (price < 1000) return price;
    let kValue = price / 1000;
    return `${kValue}K`;
};

function getTimerAreaTemplate() {
    return `
        <p><strong>${seconds} másodperc</strong></p>
        `;
};
function getGoldAreaTemplate() {
    return `
        <p><strong>${gold} arany</strong></p>
        <p>${goldPerClick} arany / klikk</p>
        <p>${goldPerSec} arany / mp</p>`;
};


function getSkill({ skillName, goldPerClickIncrement, description, amount, price, link }, index) {
    return `
    <tr>
        <td class="upgrade-text-cell">
            <p><strong>${skillName}(${goldPerClickIncrement} arany / klikk)</strong></p>
            <p>${description}</p>
        </td>
        <td class="upgrade-stats-cell">
            <p> db: ${amount}</p>
            <p> ár:<strong>${formatPrice(price)}</strong></p>
        </td></span>
        <td class="upgrade-icon-cell">
            <img class="skill-image" src="${link}"
                alt="${skillName}"
                data-enable_click="true" data-index="${index}"/>
        </td>
        </tr>
    `
};

function getEmployee({ employeeName, goldPerSecIncrement, description, amount, price, link }, index) {
    return `
    <tr>
        <td class="upgrade-icon-cell">
            <img class="skill-image" src="${link}" alt="${employeeName}" data-index="${index}">
        </td>
        <td class="upgrade-stats-cell">
            <p> db: ${amount}</p>
            <p> ár: <strong>${formatPrice(price)}</strong></p>
        </td>
        <td class="upgrade-text-cell">
            <p><strong>${employeeName} ( ${goldPerSecIncrement} / mp)</strong></p>
            <p>${description}</p>
        </td>
    </tr>    
    `
};
function getSkillsTemplate() {
    let html = '';

    let i = 0;
    let hideRemainingSkills = false;
    do {
        let skill = skillList[i];
        html += getSkill(skill, i);
        if (skill.amount === 0) {
            hideRemainingSkills = true;
        }
        i += 1;
    }
    while (i < skillList.length && !hideRemainingSkills)

    return html;
}

function getEmployeesTemplate() {
    let html = '';
    let i = 0;
    let hideRemainingEmployees = false;

    do {
        let employee = employeeList[i];
        html += getEmployee(employee, i);
        if (employee.amount === 0) {
            hideRemainingEmployees = true;

        }
        i += 1;
    }
    while (i < employeeList.length && !hideRemainingEmployees);
    return html;

}



function render(changeType = CHANGE_TYPE.ALL) {
    if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.TIME) {
        timerAreaNode.innerHTML = getTimerAreaTemplate();
    }
    if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.SKILL) {
        document.querySelector(".js-skills-tbody").innerHTML = getSkillsTemplate();
    }
    if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.EMPLOYEE) {
        document.querySelector(".js-bussines-tbody").innerHTML = getEmployeesTemplate();
    }

    goldAreaNode.innerHTML = getGoldAreaTemplate();

    disableImgDragDrop();
};

function disableImgDragDrop() {
    const imgList = document.querySelectorAll("img");

    for (let img of imgList) {
        img.ondragstart = () => false;
    }
}

function initialize() {
    let data = getInitialState();
    seconds = data.seconds;
    gold = data.gold;
    goldPerClick = data.goldPerClick;
    goldPerSec = data.goldPerSec;

    clickingAreaNode.addEventListener('click', handleGoldClicked);
    skillsContainerNode.addEventListener('click', handleSkillsClicked);
    employeecontainerNode.addEventListener('click', handleEmployeeClicked);
    render();
};


initialize();