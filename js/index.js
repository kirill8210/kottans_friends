import getUsers from './getData.js';
import removeMenu from './mobile.js';
import preparePhoneNumber from './preparePhoneNumber.js';

const app = document.querySelector('.main');
const functionForm = document.querySelector('#function_menu');
const countFriends = document.querySelector('.count_friends');

const resetBtn = document.querySelector('.reset_btn');

let selectSortsUser = 'default';
let sortOnGender = 'all';
let response = [];
let users = [];

const createCard = ({ name, gender, email, phone, picture, dob }) => {
    const card = document.createElement('article');
    card.classList.add('card');

    let phones = Number(phone.replace(/\D+/g,''));
    let result = preparePhoneNumber(phones);

    if(gender === 'female') {
        card.classList.add('female');
    }

    card.insertAdjacentHTML('afterbegin', ` 
        <h2 class="card_name">${name.first} ${name.last}</h2>
        <div>
            <div class="card_block_img"><img class="card_img" src="${picture.large}" alt="${name.first}"></div>
            <p class="card_age">I am ${dob.age} years old</p>
            <p class="card_email">${email}</p>
            <p class="card_phone"><a href="tel:${phones}">${result}</a></p>
        </div>
        <p class="card_human" id="card_human">${gender}</p>       
    `);

    return card;
};

const sortsUsers = (users) => {
    switch (selectSortsUser) {
        case "age_up":
            return users.sort((a, b) => a.dob.age > b.dob.age ? 1 : -1);
            break;
        case "age_down":
            return users.sort((a, b) => b.dob.age > a.dob.age ? 1 : -1);
            break;
        case "name_fromA":
            return users.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
            break;
        case "name_fromZ":
            return users.sort((a, b) => b.name.first > a.name.first ? 1 : -1);
            break;
        default:
            return users;
    }
};

const filterByGender = (users) => {
    sortOnGender = functionForm.gender.value;
    switch (sortOnGender) {
        case 'male':
            return users.filter(data => data.gender === 'male');
            break;
        case 'female':
            return users.filter(data => data.gender === 'female');
            break;
        default:
            return users
    }
};

const searchName = (users) => {
    const inputSearch = document.querySelector('#search_friends');
    let searchInputFr = inputSearch.value;
    if (searchInputFr.length !== 0) {
        return users.filter(users =>
            (users.name.first).toLowerCase().includes(searchInputFr.toLowerCase())
            || (users.name.last).toLowerCase().includes(searchInputFr.toLowerCase()));
    } else {
        return users;
    }
};

const renderUsers = () => {
    const searchFriends = searchName(users);
    const filterGender = filterByGender(searchFriends);
    const sortUsers = sortsUsers(filterGender);

    renderCards(sortUsers);
};

const renderCards = (users) => {
    const countAllUsers = users.map(e => e.name.first).length;
    countFriends.textContent = `${countAllUsers}`;

    app.textContent = '';
    const cards = users.map(createCard);
    app.append(...cards);
};

functionForm.addEventListener('input', () => {
    selectSortsUser = functionForm.sorts_users.value;
    renderUsers();
});

resetBtn.addEventListener('click', () => {
    renderCards([...response.results]);
});

const init = async () => {
    response = await getUsers();
    users = [...response.results];
    renderUsers();
    removeMenu();
};

init();
