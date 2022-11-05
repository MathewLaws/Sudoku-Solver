const table = document.getElementById("board")
const btn = document.getElementById("solve-btn")

const grid = [
    [0, 0, 4, 0, 5, 0, 0, 0, 0],
    [9, 0, 0, 7, 3, 4, 6, 0, 0],
    [0, 0, 3, 0, 2, 1, 0, 4, 9],
    [0, 3, 5, 0, 9, 0, 4, 8, 0],
    [0, 9, 0, 0, 0, 0, 0, 3, 0],
    [0, 7, 6, 0, 1, 0, 9, 2, 0],
    [3, 1, 0, 9, 7, 0, 2, 0, 0],
    [0, 0, 9, 1, 8, 2, 0, 0, 3],
    [0, 0, 0, 0, 6, 0, 1, 0, 0]
]

for (let i=0; i < grid.length; i++) {
    let row = document.createElement("tr")
    table.appendChild(row)
    for (let j=0; j < grid[i].length; j++) {
        let cell = document.createElement("td")
        if (grid[i][j] != 0) cell.innerHTML = grid[i][j]
        cell.id = `${i}-${j}`
        row.appendChild(cell)
    }
}

function solve(r=0, c=0, prev=[0, 0]) {
    //document.getElementById(`${prev[0]}-${prev[1]}`).style.background = ""
    let cell = document.getElementById(`${r}-${c}`)
    //cell.style.background = "green"
    
    if (r === 9) {
        return true
    } else if (c == 9) {
        return solve(r+1, 0, [r, 8])
    } else if (grid[r][c] != 0) {
        return solve(r, c+1, [r, c])
    } else {
        for (let i=1; i < 10; i++) {
            cell.innerHTML = i
            if (is_valid(r, c, i)) {
                grid[r][c] = i
                if (solve(r, c+1, [r, c])) {
                    return true
                }
                grid[r][c] = 0
                cell.innerHTML = 0
            }
        }
        return false
    }
}

function is_valid(r, c, k) {
    for (let i = Math.floor(r/3)*3; i < (Math.floor(r/3)*3)+3; i++) {
        for (let j = Math.floor(c/3)*3; j < (Math.floor(c/3)*3)+3; j++) {
            if (((i != r || j != c) && (i != r || j != c)) && grid[i][j] === k) return false
        }
    }

    for (let i = 0; i < grid[r].length; i++) {
        if (i != c && grid[r][i] === k) {
            return false
        }
    }

    for (let i = 0; i < grid.length; i++) {
        if (i != r && grid[i][c] === k) {
            return false
        }
    }

    return true
}

btn.addEventListener("click" , () => {
    solve()
})