// Synapse Sanctuary - Calm Narrative & Soft Physics Engine

const stages = {
    home: document.getElementById('stage-home'),
    language: document.getElementById('stage-language'),
    precision: document.getElementById('stage-precision')
};
const hudModeBadge = document.getElementById('hud-mode-badge');

function switchStageView(stageKey) {
    Object.values(stages).forEach(stage => stage.classList.remove('active'));
    stages[stageKey].classList.add('active');
    
    if (stageKey === 'language') {
        hudModeBadge.innerText = "Journey: Mindful Text Translation";
        initSanctuaryStory();
    } else if (stageKey === 'precision') {
        hudModeBadge.innerText = "Journey: Gentle Path Tracking";
        initSanctuaryCanvas();
    } else {
        hudModeBadge.innerText = "Calm Mind // Clear Track";
        stopCanvasEngine();
    }
}

// ==========================================
// DECK 1: THE CALMING TEXT NOVEL
// ==========================================
const storyTextContainer = document.getElementById('story-text-container');
const storyChoicesDock = document.getElementById('story-choices-dock');

let storyIndex = 0;
const calmingStoryTree = [
    {
        text: `Take a deep, slow breath. Let the rush of the world fall away for just a moment. As we look at the journal entry layout in front of us, let's bring clarity to the scrambled phrasing patterns: <br><br>"True creative clarity is built upon deep mutual <span class="target-word">REPCET</span> for our inner pacing."`,
        options: [
            { text: "Restore: Respect", value: "respect" },
            { text: "Restore: Receipt", value: "receipt" }
        ]
    },
    {
        text: `Beautifully aligned. The sentence structures settle cleanly into place. Let's look closely at the next thought on the page, and gently guide the word tracking back to center:<br><br>"Once we align our focus to <span class="target-word">TIHS</span> still point, the noise fades away."`,
        options: [
            { text: "Guide: This", value: "this" },
            { text: "Guide: Thus", value: "thus" }
        ]
    },
    {
        text: `The thoughts carry a natural, rhythmic flow now. The final journal entry begins to glow with warm, reassuring light as the translation circles complete:<br><br>"We unlock our genuine potential when we foster a gentle <span class="target-word">FRENSHUP</span> with our own minds."`,
        options: [
            { text: "Awaken: Friendship", value: "friendship" },
            { text: "Awaken: Freshness", value: "freshness" }
        ]
    },
    {
        text: `Your focus is grounded, and your mind is clear. The calibration circuit is perfectly balanced. Welcome back to your serene sanctuary baseline.`,
        options: []
    }
];

function initSanctuaryStory() {
    storyIndex = 0;
    renderCozyStoryNode();
}

function renderCozyStoryNode() {
    storyChoicesDock.innerHTML = '';
    const roundNode = calmingStoryTree[storyIndex];
    storyTextContainer.innerHTML = roundNode.text;
    
    roundNode.options.forEach(opt => {
        const button = document.createElement('button');
        button.className = 'coral-btn';
        button.innerText = opt.text;
        button.onclick = () => validateCozyChoice(opt.value);
        storyChoicesDock.appendChild(button);
    });
}

function validateCozyChoice(answer) {
    if (answer === 'respect' || answer === 'this' || answer === 'friendship') {
        storyIndex++;
        if (storyIndex < calmingStoryTree.length) {
            renderCozyStoryNode();
        }
    }
}

// ==========================================
// DECK 2: GENTLE REMINDERS CANVAS PHYSICS
// ==========================================
const canvas = document.getElementById('precision-canvas');
const ctx = canvas.getContext('2d');

let renderLoopId = null;
let targetFlower = { x: 200, y: 150, r: 18 };
let actualMouse = { x: 150, y: 150 };
let smoothedMouse = { x: 150, y: 150 };
const SMOOTH_FACTOR = 0.06; // Highly dampened, soft LERP drag trajectory

function initSanctuaryCanvas() {
    scaleSanctuaryCanvas();
    window.addEventListener('resize', scaleSanctuaryCanvas);
    canvas.addEventListener('mousemove', handleCanvasPointerMove);
    canvas.addEventListener('click', handleTargetClickTest);
    
    repositionTargetFlower();
    renderLoopId = requestAnimationFrame(loopSanctuaryCanvasFrame);
}

function scaleSanctuaryCanvas() {
    if (!canvas) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

function handleCanvasPointerMove(e) {
    const box = canvas.getBoundingClientRect();
    // Inject gentle organic wave tremors onto the raw tracking indicator
    let waveTremorX = Math.sin(performance.now() * 0.05) * 2.5;
    let waveTremorY = Math.cos(performance.now() * 0.05) * 2.5;

    actualMouse.x = e.clientX - box.left + waveTremorX;
    actualMouse.y = e.clientY - box.top + waveTremorY;
}

function repositionTargetFlower() {
    targetFlower.x = Math.random() * (canvas.width - 120) + 60;
    targetFlower.y = Math.random() * (canvas.height - 120) + 60;
}

function handleTargetClickTest() {
    let dx = smoothedMouse.x - targetFlower.x;
    let dy = smoothedMouse.y - targetFlower.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= targetFlower.r) {
        repositionTargetFlower();
    }
}

function loopSanctuaryCanvasFrame() {
    if (!stages.precision.classList.contains('active')) return;

    // Warm cream background clear
    ctx.fillStyle = '#f4f1ea';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // SYSTEM LERP PATH OVERRIDE CALCULATOR
    smoothedMouse.x += (actualMouse.x - smoothedMouse.x) * SMOOTH_FACTOR;
    smoothedMouse.y += (actualMouse.y - smoothedMouse.y) * SMOOTH_FACTOR;

    // 1. Draw Target Node (Soft Pastel Pink/Coral Flower Ring)
    ctx.beginPath();
    ctx.arc(targetFlower.x, targetFlower.y, targetFlower.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(224, 102, 92, 0.08)';
    ctx.strokeStyle = 'rgba(224, 102, 92, 0.4)';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    // Center seed core node
    ctx.beginPath();
    ctx.arc(targetFlower.x, targetFlower.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#e0665c';
    ctx.fill();

    // 2. Draw Raw Shaky Input Trail (Soft Muted Gray Dot)
    ctx.beginPath();
    ctx.arc(actualMouse.x, actualMouse.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(30, 45, 36, 0.2)';
    ctx.fill();

    // 3. Draw Smoothed Stable Pointer (Beautiful Deep Forest Green Orb)
    ctx.beginPath();
    ctx.arc(smoothedMouse.x, smoothedMouse.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#1e2d24';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();

    renderLoopId = requestAnimationFrame(loopSanctuaryCanvasFrame);
}

function stopCanvasEngine() {
    if (renderLoopId) cancelAnimationFrame(renderLoopId);
    window.removeEventListener('resize', scaleSanctuaryCanvas);
    if (canvas) {
        canvas.removeEventListener('mousemove', handleCanvasPointerMove);
        canvas.removeEventListener('click', handleTargetClickTest);
    }
}