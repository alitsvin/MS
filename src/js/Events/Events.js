import arrowClick from "./funcForEvent/arrowClick.js"
import searchSubmit from "./funcForEvent/submit.js"
import resizeFunc from "./funcForEvent/resizeFunc.js"

document.addEventListener('click', () => {
  let item = null;
  if (event.target.closest('img.arrow.Left') != null) {
    item = event.target.closest('img.arrow.Left');
  } else if (event.target.closest('img.arrow.Right') != null) {
    item = event.target.closest('img.arrow.Right');
  } else if (event.target.closest('#deleteButton') != null) {
    item = event.target.closest('#deleteButton');
  } else if (event.target.closest("#keyboardButton") != null) {
    item = event.target.closest("#keyboardButton");
  }
  if (item != null) {
    switch (item.classList[0]) {

      case 'arrow':
        arrowClick(item.classList[1]);
        break;

      case 'deleteButton':
        document.forms[0].elements.searchInput.value = "";
        break;

      case 'keyboardButton':
        const keyboardObj = document.querySelector('#keyboard');

        if (keyboardObj.classList.contains('active')) {
          keyboardObj.classList.remove('active')
        } else {
          keyboardObj.classList.add('active')
        }
        break;
    }
  }
})

document.addEventListener('keydown', () => {
  if (event.key == "Enter") {
    searchSubmit();
  }
  if (event.key.includes('Arrow')) {
    arrowClick(event.key.slice(5));
  }
})

let startTouch = null;
let endTouch = null;

document.addEventListener('touchstart', () => {
  startTouch = event.touches[0].clientX;
})

document.addEventListener('touchend', () => {
  endTouch = event.changedTouches[0].clientX;

  let windowWidth = window.getComputedStyle(document.body).width.slice(0, -2) * 0.2;

  if ((endTouch - startTouch) >= windowWidth) {
    arrowClick('Right');
  } else if ((startTouch - endTouch) >= windowWidth) {
    arrowClick('Left');
  }
})

document.addEventListener('mouseover', () => {
  let item = null;
  if (event.target.closest('.card') != null) {
    item = event.target.closest('.card .cardContent');
  }

  if (item != null) {
    const rating = Number.parseFloat(item.querySelectorAll('.cardInfo span')[1].textContent.slice(12));
    let color = `rgb(158, 157, 153)`;
    if (rating >= 9) {
      color = `rgb(255, 199, 86)`;
    } else if (rating >= 8) {
      color = `rgb(207, 86, 255)`;
    } else if (rating >= 7) {
      color = `rgb(89, 86, 255)`;
    } else if (rating >= 6) {
      color = `rgb(85, 223, 43)`;
    } else {
      color = `rgb(204, 203, 199)`;
    }
    item.style.boxShadow = `0px 0px 20px ${color}`;
  }
})

document.addEventListener('mouseout', () => {
  let item = null;
  if (event.target.closest('.card') != null) {
    item = event.target.closest('.card .cardContent');
  }
  if (item != null) {
    item.style.boxShadow = "0px 0px 10px  rgb(204, 203, 199)";
  }
})


window.onresize = () => {
  resizeFunc();
}

document.forms[0].onsubmit = searchSubmit;