'use strict';

class Flechitas {

  constructor() {
    this.firstKeyPress = true;
    this.cursor = {
      x: 0,
      y: 0
    };
    const cells = JSON.parse(cellsModel)
    let cell = null,
      img = null,
      coordLabel = null,
      coordText = null;
    const grid = document.getElementsByClassName('grid')[0]
    for (let i = 0; i < cells.length; i++) {
      cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = cells[i].coords.x;
      cell.dataset.y = cells[i].coords.y;
      img = document.createElement('img');
      img.src = './img/5.jpg';
      coordLabel = document.createElement('div');
      coordLabel.className = 'coord-label';
      coordText = document.createTextNode(cells[i].label);
      coordLabel.appendChild(coordText);
      cell.appendChild(img)
      cell.appendChild(coordLabel);
      grid.appendChild(cell);
    }

    const cellElems = document.getElementsByClassName('cell');
    for (let cell of cellElems) {
      cell.addEventListener("mouseover", this.onOverCell.bind(this));
    }
    document.addEventListener("keydown", this.pressArrow.bind(this));

  }

  onOverCell(e) {
    const parent = e.target.parentElement
    const x = parseInt(parent.dataset.x)
    const y = parseInt(parent.dataset.y)

    this.cursor.x = x
    this.cursor.y = y

    this.printArrows(this.cursor.x, this.cursor.y)
    if (this.firstKeyPress)
      this.firstKeyPress = !this.firstKeyPress
  }

  printArrows(x, y) {
    for (let ySup = y; ySup >= 0; ySup--) {
      document.querySelectorAll("[data-x='" + x + "'][data-y='" + ySup + "']")[0].childNodes[0].src = './img/8.jpg'
    }
    for (let yDown = y; yDown < 10; yDown++) {
      document.querySelectorAll("[data-x='" + x + "'][data-y='" + yDown + "']")[0].childNodes[0].src = './img/2.jpg'
    }

    for (let xLeft = x; xLeft >= 0; xLeft--) {
      document.querySelectorAll("[data-x='" + xLeft + "'][data-y='" + y + "']")[0].childNodes[0].src = './img/6.jpg'
    }
    for (let xRight = x; xRight < 10; xRight++) {
      document.querySelectorAll("[data-x='" + xRight + "'][data-y='" + y + "']")[0].childNodes[0].src = './img/4.jpg'
    }

    for (let xObliTopLeft = 0; xObliTopLeft < x; xObliTopLeft++) {
      for (let yObliTopLeft = 0; yObliTopLeft < y; yObliTopLeft++) {
        document.querySelectorAll("[data-x='" + xObliTopLeft + "'][data-y='" + yObliTopLeft + "']")[0].childNodes[0].src = './img/9.jpg'
      }
    }
    for (let xObliTopRight = 9; xObliTopRight > x; xObliTopRight--) {
      for (let yObliTopRight = 0; yObliTopRight < y; yObliTopRight++) {
        document.querySelectorAll("[data-x='" + xObliTopRight + "'][data-y='" + yObliTopRight + "']")[0].childNodes[0].src = './img/7.jpg'
      }
    }

    for (let xObliDownLeft = 0; xObliDownLeft < x; xObliDownLeft++) {
      for (let yObliLeft = 9; yObliLeft > y; yObliLeft--) {
        document.querySelectorAll("[data-x='" + xObliDownLeft + "'][data-y='" + yObliLeft + "']")[0].childNodes[0].src = './img/3.jpg'
      }
    }
    for (let xObliDownRight = 9; xObliDownRight > x; xObliDownRight--) {
      for (let yObliDownRight = 9; yObliDownRight > y; yObliDownRight--) {
        document.querySelectorAll("[data-x='" + xObliDownRight + "'][data-y='" + yObliDownRight + "']")[0].childNodes[0].src = './img/1.jpg'
      }
    }
    document.querySelectorAll("[data-x='" + x + "'][data-y='" + y + "']")[0].childNodes[0].src = './img/5.jpg'
    this.focusCursor(x, y)
  };

  pressArrow(e) {
    if (this.firstKeyPress) {
      if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        this.printArrows(0, 0)
      }
    } else {
      switch (e.keyCode) {
        case 37:
          if (this.cursor.x > 0) {
            this.cursor.x = this.cursor.x - 1
          }
          break;
        case 38:
          if (this.cursor.y > 0) {
            this.cursor.y = this.cursor.y - 1
          }
          break;
        case 39:
          if (this.cursor.x < 9) {
            this.cursor.x = this.cursor.x + 1
          }
          break;
        case 40:
          if (this.cursor.y < 9) {
            this.cursor.y = this.cursor.y + 1
          }
          break;
        default:

      }
      this.printArrows(this.cursor.x, this.cursor.y)
    }
    if (this.firstKeyPress)
      this.firstKeyPress = !this.firstKeyPress
  }

  focusCursor(x, y) {
    document.querySelectorAll("[data-x='" + x + "'][data-y='" + y + "']")[0].className += ' focused'
    document.querySelectorAll("[data-x='" + x + "'][data-y='" + y + "']")[0].childNodes[1].style.display = 'block'
  }
}
window.onload = function() {
  const flechitas = new Flechitas();
}
