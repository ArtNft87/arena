document.addEventListener('DOMContentLoaded', () => {

    const ns = 'http://www.w3.org/2000/svg';
    const groups = {
        bball: document.getElementById('basketball-group'),
        vball: document.getElementById('volleyball-group'),
        hybrid: document.getElementById('hybrid-group'),
        finals: document.getElementById('finals-group'),
    };
    const modeTitle = document.getElementById('mode-title');

    function createCourt(type, x, y, w, h, parent) {
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);
        rect.setAttribute('class', `${type}-court`);
        parent.appendChild(rect);
        return rect;
    }

    function createBasketballCourt(x, y, w, h, parent) {
        createCourt('basketball', x, y, w, h, parent);
        const hoop1 = document.createElementNS(ns, 'circle');
        hoop1.setAttribute('cx', x + 25);
        hoop1.setAttribute('cy', y + h / 2);
        hoop1.setAttribute('r', 15);
        hoop1.setAttribute('class', 'basketball-hoop');
        parent.appendChild(hoop1);

        const hoop2 = document.createElementNS(ns, 'circle');
        hoop2.setAttribute('cx', x + w - 25);
        hoop2.setAttribute('cy', y + h / 2);
        hoop2.setAttribute('r', 15);
        hoop2.setAttribute('class', 'basketball-hoop');
        parent.appendChild(hoop2);
    }

    function createVolleyballCourt(x, y, w, h, parent) {
        createCourt('volleyball', x, y, w, h, parent);
        const net = document.createElementNS(ns, 'line');
        net.setAttribute('x1', x + w / 2);
        net.setAttribute('y1', y);
        net.setAttribute('x2', x + w / 2);
        net.setAttribute('y2', y + h);
        net.setAttribute('class', 'volleyball-net');
        parent.appendChild(net);
    }
    
    function createFinalsBarrier(x, y, w, h, parent) {
        const barrier = document.createElementNS(ns, 'rect');
        barrier.setAttribute('x', x);
        barrier.setAttribute('y', y);
        barrier.setAttribute('width', w);
        barrier.setAttribute('height', h);
        barrier.setAttribute('rx', 20);
        barrier.setAttribute('class', 'finals-barrier');
        parent.appendChild(barrier);
    }

    // --- Generate All Court Layouts ---

    // 1. Full Basketball Layout
    for (let zone = 0; zone < 2; zone++) {
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                createBasketballCourt(40 + (zone * 770) + (col * 380), 110 + (row * 160), 350, 150, groups.bball);
            }
        }
    }

    // 2. Full Volleyball Layout
    for (let zone = 0; zone < 2; zone++) {
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 4; col++) {
                createVolleyballCourt(40 + (zone * 770) + (col * 185), 110 + (row * 160), 175, 150, groups.vball);
            }
        }
    }

    // 3. Hybrid Layout (Zone A Bball, Zone B Vball)
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
            createBasketballCourt(40 + (col * 380), 110 + (row * 160), 350, 150, groups.hybrid);
        }
    }
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
            createVolleyballCourt(40 + 770 + (col * 185), 110 + (row * 160), 175, 150, groups.hybrid);
        }
    }

    // 4. Finals Layout
    // Outer courts (volleyball)
    for (let row=0; row<2; row++) {
        for (let col=0; col<2; col++){
             createVolleyballCourt(40 + (col * 185), 110 + (row * 160), 175, 150, groups.finals);
             createVolleyballCourt(1200 + (col * 185), 110 + (row * 160), 175, 150, groups.finals);
        }
    }
    // Center stage
    createBasketballCourt(425, 480, 750, 350, groups.finals);
    createFinalsBarrier(405, 470, 790, 370, groups.finals);


    // --- Control Logic ---
    const buttons = document.querySelectorAll('#controls button');

    function setActiveMode(mode) {
        Object.values(groups).forEach(g => g.style.opacity = '0');
        groups[mode].style.opacity = '1';

        buttons.forEach(b => b.classList.remove('active'));
        const activeButton = document.querySelector(`button[data-mode="${mode}"]`);
        activeButton.classList.add('active');
        
        modeTitle.textContent = activeButton.textContent + ' Mode';
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveMode(button.dataset.mode);
        });
    });

    // Set initial state
    setActiveMode('bball');
});
