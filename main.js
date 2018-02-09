'use strict';

class Flechitas {

  constructor() {
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
      cell.addEventListener("mouseover", this.onOverCell.bind(this));
    }
  }

  onOverCell(e) {
    const parent = e.target.parentElement
    const yElements = document.querySelectorAll("[data-y='" + parent.dataset.y + "']")
    const x = parseInt(parent.dataset.x)
    const y = parseInt(parent.dataset.y)

    for (let ySup = y; ySup >= 0; ySup--) {
      console.log(ySup)
      document.querySelectorAll("[data-x='" + x + "'][data-y='" + ySup + "']")[0].childNodes[0].src = './img/8.jpg'
    }
    console.log('---')
    for (let yDown = y; yDown < 10; yDown++) {
      console.log(yDown)
      document.querySelectorAll("[data-x='" + x + "'][data-y='" + yDown + "']")[0].childNodes[0].src = './img/2.jpg'
    }
    console.log('---')

    for (let xLeft = x; xLeft >= 0; xLeft--) {
      console.log(xLeft)
      document.querySelectorAll("[data-x='" + xLeft + "'][data-y='" + y + "']")[0].childNodes[0].src = './img/6.jpg'
    }
    console.log('---')
    for (let xRight = x; xRight < 10; xRight++) {
      console.log(xRight)
      document.querySelectorAll("[data-x='" + xRight + "'][data-y='" + y + "']")[0].childNodes[0].src = './img/4.jpg'
    }

    e.target.src = './img/5.jpg'

    if (e.target.className !== 'cell') return
  }

}
window.onload = function() {
  const flechitas = new Flechitas();
}
