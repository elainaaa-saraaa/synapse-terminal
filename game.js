// Synapse Terminal - Master Logic & Kinematic Physics Core

// VIEW CONTROLLER STATE MACHINE
const views = {
    home: document.getElementById('view-home'),
    language: document.getElementById('view-language'),
    precision: document.getElementById('view-precision')
};
const systemHudStatus = document.getElementById('system-hud-status');

function switchActiveView(viewKey) {
    // Hide all frames
    Object.values(views).forEach(view => view.classList.remove('active'));
    
    // Activate target frame
    views[viewKey].classList.add('active');
    
    // Manage specific module hooks upon transit
    if (viewKey === 'language') {
        systemHudStatus.innerText = "System Vector: Cognitive Sync Mode";
        initLanguageStoryNode();
    } else if (viewKey === 'precision') {
        systemHudStatus.innerText = "System Vector: Kinematic Calibration Active";
        initPrecisionCanvasContext();
    } else {
        systemHudStatus.innerText = "Ecosystem Baseline: Operational";
        stopPrecisionTrackingLoop();
    }
}

// ==========================================
// CORE DECK 1: THE LANGUAGE JOURNEY LOGIC
// ==========================================
const storyLog = document.getElementById('story-terminal-log');
const choicesContainer = document.getElementById('story-choices');

let currentStep = 0;
const visualStoryTree = [
    {
        text: `[DEEP SPACE INTERCEPT // SECTOR 04]<br><br>Long-range telemetry grids are absorbing an erratic subspace communication packet. Deep algorithm noise filters are struggling to stabilize the sequence architecture. The decrypted string block renders on console: <br><br>"WE REQUEST IMMEDIATELY SECURE OVERWATCH AND MUTUAL <span class="interactive-word">REPCET</span>."`,
        options: [
            { label: "DECODE: RESPECT", target: "respect" },
            { label: "DECODE: RECEIPT", target: "receipt" }
        ]
    },
    {
        text: `[TRANSMISSION ENHANCED]<br><br>The sequence maps beautifully. Signal validation vectors confirm alignment parameters. However, local gravitational ripples are threatening the orientation node. The autopilot demands cross-checking structural data lines:<br><br>"SYNCHRONIZE SHIP FLIGHT MATRIX VECTOR TO <span class="interactive-word">TIHS</span> COORDINATES."`,
        options: [
            { label: "ALIGN: THIS", target: "this" },
            { label: "ALIGN: THUS", target: "thus" }
        ]
    },
    {
        text: `[ORBITAL HARMONIZATION SECURED]<br><br>The ship emerges smoothly into the clear sector space of the alpha ring network. A massive monolith floats before the helm, lighting up with welcoming coordinates:<br><br>"ACCESS INTEGRITY CODE GRANTED. WELCOME TO INTELLECTUAL <span class="interactive-word">FRENSHUP</span> CORE."`,
        options: [
            { label: "INITIALIZE: FRIENDSHIP", target: "friendship" },
            { label: "INITIALIZE: FRESHNESS", target: "freshness" }
        ]
    },
    {
        text: `[CALIBRATION TIMELINE SEQUENCE OVER]<br><br>System architecture successfully compiled. Spatial tracking patterns optimized. Cognitive reading flow matrices balanced natively. Ready for deep network transit operations.`,
        options: []
    }
];

function initLanguageStoryNode() {
    currentStep = 0;
    renderStoryStep();
}

function renderStoryStep() {
    choicesContainer.innerHTML = '';
    const node = visualStoryTree[currentStep];
    storyLog.innerHTML = node.text;
    
    node.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'action-button';
        btn.innerText = opt.label;
        btn.onclick = () => verifyLinguisticAnswer(opt.target);
        choicesContainer.appendChild(btn);
    });
}

function verifyLinguisticAnswer(selection) {
    if (selection === 'respect' || selection === 'this' || selection === 'friendship') {
        currentStep++;
        if (currentStep < visualStoryTree.length) {
            renderStoryStep();
        }
    }
}

// ==========================================
// CORE DECK 2: THE PRECISION CANVAS PHYSICS
// ==========================================
const canvas = document.getElementById('star-map');
const ctx = canvas.getContext('2d');

let trackingLoopId = null;
let targetNode = { x: 200, y: 150, r: 24 };
let physicalCursor = { x: 150, y: 150 };
let virtualCursor = { x: 150, y: 150 };
const LERP_SMOOTHING_VECTOR = 0.07; 

function initPrecisionCanvasContext() {
    resizePrecisionCanvas();
    window.addEventListener('resize', resizePrecisionCanvas);
    canvas.addEventListener('mousemove', cacheCanvasCoordinates);
    canvas.addEventListener('click', processTargetHitCheck);
    
    spawnNextTargetCoordinate();
    trackingLoopId = requestAnimationFrame(renderKinematicPhysicsFrame);
}

function resizePrecisionCanvas() {
    if (!canvas) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

function cacheCanvasCoordinates(e) {
    const boundaries = canvas.getBoundingClientRect();
    // Simulate high-frequency neural physical tremor oscillation waveforms on the raw path
    let syntheticTremorX = Math.sin(performance.now() * 0.07) * 3.5;
    let syntheticTremorY = Math.cos(performance.now() * 0.07) * 3.5;

    physicalCursor.x = e.clientX - boundaries.left + syntheticTremorX;
    physicalCursor.y = e.clientY - boundaries.top + syntheticTremorY;
}

function spawnNextTargetCoordinate() {
    targetNode.x = Math.random() * (canvas.width - 80) + 40;
    targetNode.y = Math.random() * (canvas.height - 80) + 40;
}

function processTargetHitCheck() {
    let dx = virtualCursor.x - targetNode.x;
    let dy = virtualCursor.y - targetNode.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // If the smoothed cursor successfully triggers the hitbox target bubble
    if (distance <= targetNode.r) {
        spawnNextTargetCoordinate();
    }
}

function renderKinematicPhysicsFrame() {
    if (!views.precision.classList.contains('active')) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // LINEAR INTERPOLATION (LERP) SIGNAL SMOOTHING LOOP
    virtualCursor.x += (physicalCursor.x - virtualCursor.x) * LERP_SMOOTHING_VECTOR;
    virtualCursor.y += (physicalCursor.y - virtualCursor.y) * LERP_SMOOTHING_VECTOR;

    // A. Render Target Warp Grid Circle
    ctx.beginPath();
    ctx.arc(targetNode.x, targetNode.y, targetNode.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 255, 255, 0.03)';
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();
    
    // Draw internal tracking alignment target lines
    ctx.beginPath();
    ctx.moveTo(targetNode.x - 6, targetNode.y); ctx.lineTo(targetNode.x + 6, targetNode.y);
    ctx.moveTo(targetNode.x, targetNode.y - 6); ctx.lineTo(targetNode.x, targetNode.y + 6);
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.stroke();

    // B. Render Shaky Plasma Tail (Faint Red - Raw physical path with tremor)
    ctx.beginPath();
    ctx.arc(physicalCursor.x, physicalCursor.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.fill();

    // C. Render Stabilized Gravity Tractor Cursor (Neon Purple - Processed vector)
    ctx.beginPath();
    ctx.arc(virtualCursor.x, virtualCursor.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#a855f7';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();

    trackingLoopId = requestAnimationFrame(renderKinematicPhysicsFrame);
}

function stopPrecisionTrackingLoop() {
    if (trackingLoopId) cancelAnimationFrame(trackingLoopId);
    window.removeEventListener('resize', resizePrecisionCanvas);
    if (canvas) {
        canvas.removeEventListener('mousemove', cacheCanvasCoordinates);
        canvas.removeEventListener('click', processTargetHitCheck);
    }
}