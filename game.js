// Synapse Terminal - Master Logic & Kinematic Physics Core

const views = {
    home: document.getElementById('view-home'),
    language: document.getElementById('view-language'),
    precision: document.getElementById('view-precision')
};
const systemHudStatus = document.getElementById('system-hud-status');

function switchActiveView(viewKey) {
    Object.values(views).forEach(view => view.classList.remove('active'));
    views[viewKey].classList.add('active');
    
    if (viewKey === 'language') {
        systemHudStatus.innerText = "Language Arena Active";
        initLanguageStoryNode();
    } else if (viewKey === 'precision') {
        systemHudStatus.innerText = "Precision Canvas Active";
        initPrecisionCanvasContext();
    } else {
        systemHudStatus.innerText = "Ecosystem Live";
        stopPrecisionTrackingLoop();
    }
}

// ==========================================
// SYSTEM 1: THE LITERARY NOVEL LOGIC
// ==========================================
const storyLog = document.getElementById('story-terminal-log');
const choicesContainer = document.getElementById('story-choices');

let currentStep = 0;
const visualStoryTree = [
    {
        text: `The telescope arrays locked onto the deep space transmission at midnight. Our signal relays absorbed the wave vector smoothly, but the raw alphanumeric character blocks began to buckle under algorithmic distortion fields. On the screen, the message reads: <br><br>"We request immediate secure overwatch and mutual <span class="word-glow">REPCET</span>."`,
        options: [
            { label: "Decode: Respect", target: "respect" },
            { label: "Decode: Receipt", target: "receipt" }
        ]
    },
    {
        text: `The alignment sequence calibrated beautifully. The incoming telemetry pipeline stabilized. However, local gravitational shifts are threatening our primary orientation deck. The navigation computers flag a cross-check prompt: <br><br>"Synchronize main navigation flight tracking coordinates to <span class="word-glow">TIHS</span> nodes."`,
        options: [
            { label: "Align: This", target: "this" },
            { label: "Align: Thus", target: "thus" }
        ]
    },
    {
        text: `Orbital stabilization completed. The ship cruises effortlessly out of the gravity slipstream into clear deep space. A towering mirror-finish monolith stands silently before the helm, illuminating your dashboard with access indicators:<br><br>"System identity authenticated. Welcome to the intellectual <span class="word-glow">FRENSHUP</span> matrix core."`,
        options: [
            { label: "Initialize: Friendship", target: "friendship" },
            { label: "Initialize: Freshness", target: "freshness" }
        ]
    },
    {
        text: `Ecosystem loops fully calculated. Spatial typography tracking matrices optimized. Fine motor alignment pathways successfully mapped. Synapse Terminal calibration sequence complete.`,
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
        btn.className = 'sleek-btn';
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
// SYSTEM 2: THE ELEGANT PHYSICS CANVAS
// ==========================================
const canvas = document.getElementById('star-map');
const ctx = canvas.getContext('2d');

let trackingLoopId = null;
let targetNode = { x: 200, y: 150, r: 20 };
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
    // Simulate high-frequency tremors as subtle organic mathematical noise
    let syntheticTremorX = Math.sin(performance.now() * 0.08) * 3;
    let syntheticTremorY = Math.cos(performance.now() * 0.08) * 3;

    physicalCursor.x = e.clientX - boundaries.left + syntheticTremorX;
    physicalCursor.y = e.clientY - boundaries.top + syntheticTremorY;
}

function spawnNextTargetCoordinate() {
    targetNode.x = Math.random() * (canvas.width - 100) + 50;
    targetNode.y = Math.random() * (canvas.height - 100) + 50;
}

function processTargetHitCheck() {
    let dx = virtualCursor.x - targetNode.x;
    let dy = virtualCursor.y - targetNode.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= targetNode.r) {
        spawnNextTargetCoordinate();
    }
}

function renderKinematicPhysicsFrame() {
    if (!views.precision.classList.contains('active')) return;

    // Elegant deep monochrome canvas clear
    ctx.fillStyle = '#070709';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render very soft geometric background navigation grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 40) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
    }

    // LINEAR INTERPOLATION (LERP) SIGNAL SMOOTHING LOOP
    virtualCursor.x += (physicalCursor.x - virtualCursor.x) * LERP_SMOOTHING_VECTOR;
    virtualCursor.y += (physicalCursor.y - virtualCursor.y) * LERP_SMOOTHING_VECTOR;

    // A. Minimalist Target Alignment Node (Frosted Cyan Halo)
    ctx.beginPath();
    ctx.arc(targetNode.x, targetNode.y, targetNode.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.02)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();

    // B. Raw Unfiltered Physical Path (Muted Coral Dot - Tremor Representation)
    ctx.beginPath();
    ctx.arc(physicalCursor.x, physicalCursor.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(244, 63, 94, 0.3)';
    ctx.fill();

    // C. Mathematically Stabilized Vector Node (Clean Purple Glow Pointer)
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#bf7fff';
    ctx.beginPath();
    ctx.arc(virtualCursor.x, virtualCursor.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#bf7fff';
    ctx.fill();
    // Reset shadows to protect hardware rendering performance
    ctx.shadowBlur = 0;

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