// Configuration
// REPLACE WITH YOUR ACTUAL CLIENT KEY
const CLIENT_KEY = 'sbawmt8vfjv5gp2g5d';
// REPLACE WITH YOUR GITHUB PAGES URL or LOCALHOST
const REDIRECT_URI = 'https://yamixiu123.github.io/tiktok-uploader-page/auth/callback.html';
// REPLACE WITH YOUR NGROK/BACKEND URL
const BACKEND_URL = 'http://localhost:5000';

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const publishBtn = document.getElementById('publish-btn');
    const videoInput = document.getElementById('video-file');
    const internalRadios = document.getElementsByName('internal-video');

    // Check if we have a stored user
    const storedUser = localStorage.getItem('tiktok_user');
    if (storedUser) {
        showUser(JSON.parse(storedUser));
    }

    loginBtn.addEventListener('click', () => {
        // CSRF State
        const state = Math.random().toString(36).substring(7);
        localStorage.setItem('csrf_state', state);

        let url = 'https://www.tiktok.com/v2/auth/authorize/';
        url += `?client_key=${CLIENT_KEY}`;
        url += `&scope=user.info.basic,video.upload,video.publish`;
        url += `&response_type=code`;
        url += `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
        url += `&state=${state}`;

        window.location.href = url;
    });

    // Enable publish button if file selected or internal video chosen
    videoInput.addEventListener('change', () => {
        publishBtn.disabled = false;
    });

    Array.from(internalRadios).forEach(radio => {
        radio.addEventListener('change', () => {
            publishBtn.disabled = false;
        });
    });

    publishBtn.addEventListener('click', async () => {
        publishBtn.disabled = true;
        publishBtn.innerText = 'Publishing...';
        document.getElementById('status-msg').innerText = '';

        // Determine what we are sending
        let payload = {};
        const selectedInternal = document.querySelector('input[name="internal-video"]:checked');

        if (selectedInternal) {
            payload = { type: 'internal', id: selectedInternal.value };
        } else if (videoInput.files.length > 0) {
            // For demo, we might not actually upload the file to the backend 
            // if the goal is just to show the flow. 
            // But let's pretend we send metadata.
            payload = { type: 'file', name: videoInput.files[0].name };
        }

        try {
            // In a real app, you'd send the access_token too
            const response = await fetch(`${BACKEND_URL}/api/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.success) {
                const statusDiv = document.getElementById('status-msg');
                statusDiv.innerHTML = `
                    <div class="bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-3 rounded-xl inline-flex items-center gap-3 animate-fade-in">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span class="font-bold">Success!</span> Video published to TikTok (Demo)
                    </div>
                `;
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error(error);
            const statusDiv = document.getElementById('status-msg');
            statusDiv.innerHTML = `
                <div class="bg-red-500/20 border border-red-500/50 text-red-400 px-6 py-3 rounded-xl inline-flex items-center gap-3 animate-fade-in">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span class="font-bold">Error:</span> ${error.message || 'Publish Failed'}
                </div>
            `;
        } finally {
            publishBtn.disabled = false;
            publishBtn.innerText = 'Publish to TikTok';
        }
    });
});

function showUser(user) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('user-section').classList.remove('hidden');

    document.getElementById('user-avatar').src = user.avatar_url;
    document.getElementById('user-nickname').innerText = user.display_name;
}
