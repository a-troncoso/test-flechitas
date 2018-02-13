'use strict';

class Flechitas {

  constructor() {
    this.firstKeyPress = true;
    this.cursor = {
      current: {
        x: 0,
        y: 0
      },
      previous: {
        x: 0,
        y: 0
      }
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const grid = document.getElementsByClassName('grid')[0];
    let cell = null,
      img = null,
      coordLabel = null,
      coordText = null;

    for (var i = 0; i < letters.length; i++) {
      for (var j = 0; j < numbers.length; j++) {
        cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.x = j;
        cell.dataset.y = i;
        img = document.createElement('img');
        img.src = './img/5.jpg';
        coordLabel = document.createElement('div');
        coordLabel.className = 'coord-label';
        coordText = document.createTextNode(numbers[j] + ', ' + letters[i]);
        coordLabel.appendChild(coordText);
        cell.appendChild(img)
        cell.appendChild(coordLabel);
        grid.appendChild(cell);

        cell.addEventListener('mouseover', this.onOverCell.bind(this));
      }
    }

    document.addEventListener('keydown', this.pressArrow.bind(this));
  }

  // Evento que se ejecuta al pasar el mouse sobre una imagen
  onOverCell(e) {
    if (e.target.classList[0] === 'cell') return
    const parent = e.target.parentElement;
    const x = parseInt(parent.dataset.x);
    const y = parseInt(parent.dataset.y);

    this.cursor.previous.x = this.cursor.current.x;
    this.cursor.previous.y = this.cursor.current.y;

    this.cursor.current.x = x;
    this.cursor.current.y = y;

    this.printArrows(this.cursor.current.x, this.cursor.current.y);
    if (this.firstKeyPress)
      this.firstKeyPress = !this.firstKeyPress;
  }

  // Evento que se ejecuta al presionar una tecla
  pressArrow(e) {
    this.cursor.previous.x = this.cursor.current.x;
    this.cursor.previous.y = this.cursor.current.y;

    // Si no se ha enfocado ninguna celda, y si se ha apretado alguna flecha =>se enfoca la primera celda
    if (this.firstKeyPress) {
      if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        this.printArrows(0, 0)
      }
    } else {
      switch (e.keyCode) {
        case 37: // left arrow
          if (this.cursor.current.x > 0) {
            this.cursor.current.x = this.cursor.current.x - 1
          }
          break;
        case 38: // up arrow
          if (this.cursor.current.y > 0) {
            this.cursor.current.y = this.cursor.current.y - 1
          }
          break;
        case 39: // right arros
          if (this.cursor.current.x < 9) {
            this.cursor.current.x = this.cursor.current.x + 1
          }
          break;
        case 40: // down arrow
          if (this.cursor.current.y < 9) {
            this.cursor.current.y = this.cursor.current.y + 1
          }
          break;
        default:

      }
      this.printArrows(this.cursor.current.x, this.cursor.current.y)
    }
    if (this.firstKeyPress)
      this.firstKeyPress = !this.firstKeyPress
  };

  // Función que pinta las distintas flechas de la grilla
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

  // Función que pinta la celca enfocada
  focusCursor(x, y) {
    const cellFocused = document.querySelectorAll("[data-x='" + x + "'][data-y='" + y + "']")[0];
    const prevCellFocused = document.querySelectorAll("[data-x='" + this.cursor.previous.x + "'][data-y='" + this.cursor.previous.y + "']")[0];

    prevCellFocused.className = 'cell';
    prevCellFocused.childNodes[1].style.display = 'none';

    cellFocused.className += ' focused';
    cellFocused.childNodes[1].style.display = 'block';
  }
}

window.onload = function() {
  const flechitas = new Flechitas();
}
