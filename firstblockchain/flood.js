const map = [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '-', '-', '-', '#', '-', '-', '-', '#'],
    ['#', '-', '-', '-', '#', '-', '-', '-', '#'],
    ['#', '-', '-', '#', '-', '-', '-', '-', '#'],
    ['#', '#', '#', '-', '-', '-', '#', '#', '#'],
    ['#', '-', '-', '-', '-', '#', '-', '-', '#'],
    ['#', '-', '-', '-', '#', '-', '-', '-', '#'],
    ['#', '-', '-', '-', '#', '-', '-', '-', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ];
  
  
  function floodFillRec(i, j, oldColor, newColor) {
  
    // Check the boundary condition
    if (i < 0 || i >= map.length || j < 0 || j >= map[i].length) return;
    if (map[i][j] !== oldColor) return;
  
    // set the color of node to newColor
    map[i][j] = newColor;
  
  
    // Look for neighboring cell
    floodFillRec(i + 1, j, oldColor, newColor);
    floodFillRec(i - 1, j, oldColor, newColor);
    floodFillRec(i, j + 1, oldColor, newColor);
    floodFillRec(i, j - 1, oldColor, newColor);
  }
  //chon do o vi tri nao
  floodFillRec(4, 4, '-', 'f');
  console.log(map);