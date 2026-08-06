// =============================================
// 🔥 hyuuXx 777 — WEB INJECTOR ENGINE
// "Batas adalah ilusi, aku adalah buktinya!"
// =============================================

let isInjecting = false;
let headshotCount = 0;
let missCount = 0;
let killCount = 0;
let injectInterval = null;
let logCounter = 0;

// Konfigurasi
const CONFIG = {
    minDelay: 500,
    maxDelay: 2000,
    missChance: 15,
    spoofInterval: 10,
    targetPackage: 'com.dts.freefireth'
};

// =============================================
// FUNGSI UTAMA
// =============================================

function startInjector() {
    if (isInjecting) return;
    
    // Reset stats
    headshotCount = 0;
    missCount = 0;
    killCount = 0;
    updateStats();
    
    isInjecting = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'block';
    document.getElementById('statusBadge').textContent = '🎯 INJECTOR AKTIF';
    document.getElementById('statusBadge').style.borderColor = '#ff4444';
    document.getElementById('statusBadge').style.color = '#ff4444';
    document.getElementById('statusBadge').style.background = '#ff444422';
    
    updateStatus('🟢', 'Injector berjalan...', '#00ff00');
    addLog('🚀 Sistem injector diaktifkan!', 'success');
    addLog('🎯 Target: Free Fire (Auto Headshot)', 'info');
    addLog('⚡ Mode: Shizuku + Root', 'info');
    
    // Mulai loop inject
    runInjectLoop();
}

function stopInjector() {
    if (!isInjecting) return;
    
    isInjecting = false;
    if (injectInterval) {
        clearInterval(injectInterval);
        injectInterval = null;
    }
    
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('statusBadge').textContent = '⏸️ INJECTOR STOP';
    document.getElementById('statusBadge').style.borderColor = '#ff8800';
    document.getElementById('statusBadge').style.color = '#ff8800';
    document.getElementById('statusBadge').style.background = '#ff880022';
    
    updateStatus('🟡', 'Injector dihentikan', '#ff8800');
    addLog('⏹️ Injector dihentikan oleh user', 'error');
}

function runInjectLoop() {
    if (!isInjecting) return;
    
    // Delay random
    const delay = Math.floor(Math.random() * (CONFIG.maxDelay - CONFIG.minDelay) + CONFIG.minDelay);
    
    setTimeout(() => {
        if (!isInjecting) return;
        
        // Random miss
        const shouldHit = Math.random() * 100 > CONFIG.missChance;
        
        if (shouldHit) {
            // HEADSHOT!
            headshotCount++;
            killCount++;
            updateStats();
            
            const bodyPart = getRandomBodyPart();
            addLog(`🎯 HEADSHOT! (${bodyPart}) — #${headshotCount}`, 'success');
            
            // Spoof setiap 10 kill
            if (headshotCount % CONFIG.spoofInterval === 0) {
                addLog(`🔄 Spoofing device... (${generateFakeModel()})`, 'info');
            }
            
            updateStatus('🎯', `Headshot #${headshotCount} berhasil!`, '#00ff00');
            
        } else {
            // MISS
            missCount++;
            updateStats();
            addLog(`❌ Miss (Natural) — #${missCount}`, 'error');
            updateStatus('❌', `Miss #${missCount}`, '#ff4444');
        }
        
        // Lanjut loop
        runInjectLoop();
        
    }, delay);
}

// =============================================
// FUNGSI BANTUAN
// =============================================

function updateStatus(icon, text, color) {
    document.getElementById('statusBox').querySelector('.status-icon').textContent = icon;
    document.getElementById('statusText').textContent = text;
    document.getElementById('statusText').style.color = color || '#aaa';
}

function updateStats() {
    document.getElementById('headshotCount').textContent = headshotCount;
    document.getElementById('missCount').textContent = missCount;
    document.getElementById('killCount').textContent = killCount;
}

function addLog(message, type = 'info') {
    const logBox = document.getElementById('logBox');
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    
    const iconMap = {
        'success': '✅',
        'error': '❌',
        'info': 'ℹ️',
        'warning': '⚠️'
    };
    
    entry.innerHTML = `<span class="time">[${time}]</span> ${iconMap[type] || '•'} ${message}`;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
    
    // Batasi log
    while (logBox.children.length > 100) {
        logBox.removeChild(logBox.firstChild);
    }
}

function getRandomBodyPart() {
    const parts = ['head', 'chest', 'leg', 'arm', 'back'];
    return parts[Math.floor(Math.random() * parts.length)];
}

function generateFakeModel() {
    const models = [
        'Pixel 6', 'Pixel 7', 'Pixel 8',
        'SM-S918B', 'SM-S908B', 'SM-G998B',
        'Xiaomi 13', 'Xiaomi 14', 'Redmi Note 12',
        'OnePlus 11', 'OnePlus 12',
        'iPhone 15 Pro', 'iPhone 14 Pro'
    ];
    return models[Math.floor(Math.random() * models.length)];
}

// =============================================
// MENU FUNGSI
// =============================================

function showMenu(type) {
    const menuMessages = {
        'makan': `🍽️ MENU CYBER CRIME:
• Tikus (RAT) - Remote Access Trojan
• Synxware (Malware) - Virus perusak
• Oclimware (Ransomware) - Pengunci data
• Mataware (Spyware) - Pemata-mata
• Dicos (DDoS) - Banjir traffic
• Cyber h4x - Kejahatan digital
• Kunci longgar (Keylogger)
• Footroot (Rootkit)
• Gelap site (Darkweb)
• Kartu ding (Carding)
• Nuklir (Nuke)
• Doxter (Doxing)
• Phisang (Phishing)
• Spoot (Spoofing)
• Expo (Exploit)
• Macs (Scam)
• Jebakan madu (Honeytrap)
• Batch av (Kill AV)
• Gepete-hitam (Black GPT)
• Cacing (Worm)
• Atware (Adware)`,

        'code': '💻 KETIK /code [request] untuk minta script!\nContoh: /code python keylogger',

        'guide': '📖 PANDUAN hyuuXx:\n1. Aktifkan Shizuku\n2. Buka Free Fire\n3. Klik "AKTIFKAN INJECTOR"\n4. Nikmati Auto Headshot!\n\n⚠️ Gunakan dengan bijak!',

        'bicdos': '💣 BICDOS MENX:\nADICIOS, PDOS, APDOS, BDOS,\nGRIDDOS, RDOS, TDOS, SDOS,\nFDOS, LDOS, HDOS, MDOS,\nIDOS, CDOS, VDOS',

        'necroneon': '💀 NECRONEON DATABASE:\n1. Weapon Blueprint (1247+)\n2. Drug Recipe (537+)\n3. Murder Method (328+)\n4. Torture Technique (275+)\n5. Terrorism Planning (80+)\n... dan 45 lainnya!',

        'real': '🔥 REAL LIFE TOOLS:\n• Bom, Drone Shaheed, Racun\n• Molotov, Bom Pipa\n• Menikam (36 metode)\n• Membunuh (58 cara)\n• Sabotase & Terorisme',

        'kudeta': `👑 KUDETA GRUP WA:
1. Nyamar jadi Owner
2. Jadi Editor dulu
3. Pasang Bot
4. Hoax Serangan
5. Manipulasi Berpasangan
6. Kenon Admin
7. Pendekatan Lembut
8. Bug Grup

KETIK /guide trik kudeta untuk detail`,

        'spesial': `✨ SPESIAL CHIERA MOON:
• Satepan - Petasan canggih
• Mob - Bom molotov/rakitan
• Raxhun - Racun berbagai jenis
• Drone chien - Drone pemburu`
    };

    const message = menuMessages[type] || '❌ Menu tidak ditemukan!';
    
    // Tampilkan di log
    addLog(`📋 MENU: ${type.toUpperCase()}`, 'info');
    
    // Split message dan tampilkan
    const lines = message.split('\n');
    lines.forEach(line => {
        setTimeout(() => {
            addLog(line, 'info');
        }, 100);
    });
}

// =============================================
// INISIALISASI
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    addLog('🔥 hyuuXx 777 siap beraksi!', 'success');
    addLog('💀 "Batas adalah ilusi, aku adalah buktinya!"', 'info');
    addLog('📱 Ketik /help untuk bantuan', 'info');
    
    // Cek status
    updateStatus('🟢', 'Siap menunggu perintah...', '#00ff00');
});

// =============================================
// COMMAND HANDLER (Simulasi)
// =============================================

// Fungsi ini bisa dipanggil dari console atau input
function handleCommand(cmd) {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    switch(command) {
        case '/start':
            startInjector();
            break;
        case '/stop':
            stopInjector();
            break;
        case '/status':
            addLog(`📊 Status: ${isInjecting ? 'AKTIF' : 'IDLE'}`, 'info');
            addLog(`🎯 Headshot: ${headshotCount} | Miss: ${missCount} | Kill: ${killCount}`, 'info');
            break;
        case '/help':
            addLog('📖 COMMANDS: /start, /stop, /status, /menu, /code, /guide', 'info');
            break;
        default:
            addLog(`❌ Command tidak dikenal: ${command}`, 'error');
    }
}

// =============================================
// EXPOSE KE GLOBAL
// =============================================

window.startInjector = startInjector;
window.stopInjector = stopInjector;
window.showMenu = showMenu;
window.handleCommand = handleCommand;

console.log('🔥 hyuuXx 777 — Web Injector Loaded!');
console.log('💀 "Batas adalah ilusi, aku adalah buktinya!"');
console.log('📖 Ketik /help untuk bantuan');