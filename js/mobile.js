const iconMenu = document.querySelector('.icon-menu');
const menu = document.querySelector('.function_menu');
const iconClose = document.querySelector('.icon-close');
const applyBtn = document.querySelector('.apply_btn');

const addMenu = () =>{
    menu.classList.add('active_menu')
};

const removeMenu = () =>{
    menu.classList.remove('active_menu')
};

iconMenu.addEventListener('click', addMenu);
iconClose.addEventListener('click', removeMenu);
applyBtn.addEventListener('click', e => {
    e.preventDefault();
    removeMenu();
});


export default removeMenu;
