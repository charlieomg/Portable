document.body.insertAdjacentHTML('beforeend', `
<div id="ccModMenu" style="
    position: fixed;
    top: 50px;
    right: 20px;
    width: 280px;
    background: rgba(0,0,0,0.85);
    color: white;
    font-family: Arial, sans-serif;
    padding: 15px;
    border-radius: 8px;
    z-index: 9999;
    cursor: move;
">
    <h3 style="margin-top:0; text-align:center;">Cookie Clicker Mod Menu</h3>
    <div id="ccButtonContainer" style="display:flex; flex-direction:column; gap:8px;"></div>
</div>
`);

(function() {
    const modMenu = document.getElementById('ccModMenu');
    const buttonContainer = document.getElementById('ccButtonContainer');

    function addModButton(label, callback) {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.style.padding = '8px';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.background = '#4CAF50';
        btn.style.color = 'white';
        btn.addEventListener('mouseenter', () => btn.style.background = '#45a049');
        btn.addEventListener('mouseleave', () => btn.style.background = '#4CAF50');
        btn.onclick = callback;
        buttonContainer.appendChild(btn);
    }

    addModButton('Set Cookies…', function() {
        const val = prompt('Enter cookies amount:', Game.cookies);
        if (val !== null) {
            Game.cookies = parseFloat(val) || Game.cookies;
            Game.Earn(0);
        }
    });

    addModButton('Add 1e9 Cookies', function() {
        Game.cookies += 1e9;
        Game.Earn(0);
    });

    addModButton('Infinite Cookies', function() {
        Game.cookies = Infinity;
        Game.Earn(0);
    });

    addModButton('Add Sugar Lumps…', function() {
        const lumps = prompt('How many sugar lumps to add?', 1);
        if (lumps !== null) Game.lumps += parseInt(lumps) || 0;
    });

    addModButton('Spawn Golden Cookie', function() {
        if (typeof Game.shimmerAdd === 'function') {
            Game.shimmerAdd('golden');
            alert('Golden Cookie spawned!');
        } else {
            alert('Cannot spawn Golden Cookie: shimmerAdd function not found.');
        }
    });

    addModButton('Trigger Click Frenzy', function() {
        const golden = Game.shimmers.find(s => s.type == 'golden');
        if (golden) {
            golden.pop();
            alert('Click Frenzy triggered!');
        } else {
            alert('No golden cookie on screen. Spawning one first.');
            if (typeof Game.shimmerAdd === 'function') {
                Game.shimmerAdd('golden');
            }
        }
    });

    addModButton('Unlock All Upgrades', function() {
        Game.UpgradesById.forEach(u => u.unlock());
    });

    addModButton('Unlock All Achievements', function() {
        Game.Achievements.forEach(a => a.win());
    });

    addModButton('Max All Buildings', function() {
        Game.ObjectsById.forEach(o => {
            o.amount = 9999;
            o.refresh();
        });
    });

    addModButton('Show CPS', function() {
        alert('Cookies/sec: ' + Game.cookiesPs);
    });

    let isDragging = false, offsetX = 0, offsetY = 0;
    modMenu.addEventListener('mousedown', e => {
        isDragging = true;
        offsetX = e.clientX - modMenu.offsetLeft;
        offsetY = e.clientY - modMenu.offsetTop;
        modMenu.style.transition = 'none';
    });
    document.addEventListener('mousemove', e => {
        if (isDragging) {
            modMenu.style.left = (e.clientX - offsetX) + 'px';
            modMenu.style.top = (e.clientY - offsetY) + 'px';
        }
    });
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            modMenu.style.transition = 'top 0.1s, left 0.1s';
        }
    });
})();
