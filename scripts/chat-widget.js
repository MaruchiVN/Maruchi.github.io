// Chat widget: attach configured URL to the floating action button
(() => {
    function initializeChatButton() {
        const chatButton = document.getElementById('chat-fab');
        const chatWrap = document.getElementById('chat-fab-wrap');
        if (!chatButton) return;

        const configuredUrl = typeof window !== 'undefined' && window.CHAT_URL ? String(window.CHAT_URL) : '';
        // Toggle in-page chat panel instead of opening a new tab
        const chatPanel = document.getElementById('chat-panel');
        const chatClose = document.getElementById('chat-close');
        const chatIframe = document.getElementById('chat-iframe');
        const chatFallback = document.getElementById('chat-fallback');
        const chatOpenNew = document.getElementById('chat-open-new');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const apiUrl = typeof window !== 'undefined' && window.CHAT_API_URL ? String(window.CHAT_API_URL) : '';

        function showFallback() {
            if (chatFallback) chatFallback.classList.remove('hidden');
            if (chatOpenNew) chatOpenNew.href = configuredUrl || '#';
        }

        function openPanel(event) {
            event.preventDefault();
            if (!chatPanel) return;
            chatPanel.classList.remove('hidden');
            // If API URL is configured, use in-page chat; else try iframe URL
            if (apiUrl && chatMessages && chatInput && chatSend) {
                chatMessages.classList.remove('hidden');
                if (chatIframe) chatIframe.classList.add('hidden');
            } else if (chatIframe && configuredUrl) {
                try {
                    chatIframe.src = configuredUrl;
                } catch (e) {
                    showFallback();
                }
            } else {
                showFallback();
            }
            requestAnimationFrame(() => {
                chatPanel.classList.add('open');
            });
            updateFabBottomGap();
        }

        function closePanel() {
            if (!chatPanel) return;
            chatPanel.classList.remove('open');
            setTimeout(() => chatPanel.classList.add('hidden'), 280);
        }

        chatButton.addEventListener('click', openPanel);
        if (chatClose) chatClose.addEventListener('click', closePanel);

        // Simple in-panel chat using backend API
        const conversation = [];
        async function sendMessage() {
            if (!apiUrl) return;
            const text = (chatInput?.value || '').trim();
            if (!text) return;
            chatInput.value = '';

            // Render user message
            appendBubble('user', text);
            conversation.push({ role: 'user', content: text });

            try {
                const res = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: conversation })
                });
                const data = await res.json();
                const reply = data?.reply || 'Xin lỗi, hệ thống đang bận.';
                appendBubble('assistant', reply);
                conversation.push({ role: 'assistant', content: reply });
            } catch (err) {
                appendBubble('assistant', 'Có lỗi kết nối đến máy chủ.');
            }
        }

        function appendBubble(sender, text) {
            if (!chatMessages) return;
            const wrap = document.createElement('div');
            wrap.className = sender === 'user' ? 'text-right' : 'text-left';
            const bubble = document.createElement('div');
            bubble.className = sender === 'user'
                ? 'inline-block bg-slate-900 text-white px-3 py-2 rounded-xl text-sm'
                : 'inline-block bg-slate-100 text-slate-800 px-3 py-2 rounded-xl text-sm';
            bubble.textContent = text;
            wrap.appendChild(bubble);
            chatMessages.appendChild(wrap);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        if (chatSend) chatSend.addEventListener('click', () => { if (apiUrl) sendMessage(); });
        if (chatInput) chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (apiUrl) sendMessage();
            }
        });

        // Keep a consistent gap with viewport edges; avoid overlapping the footer
        const footer = document.querySelector('footer');
        const BASE_GAP_PX = 24; // Tailwind bottom-6/right-6
        const OUTLINE_PX = 4;   // visual halo from -inset-1
        const SIDE_GAP_PX = BASE_GAP_PX + OUTLINE_PX; // keep visual gap incl. halo

        function updateFabBottomGap() {
            const target = chatWrap || chatButton;
            // Always ensure visual right/bottom gap includes halo and lock to right side
            if (target && typeof target.style !== 'undefined') {
                target.style.position = 'fixed';
                target.style.left = 'auto';
                target.style.right = SIDE_GAP_PX + 'px';
                target.style.zIndex = '50';
            }

            if (!footer) {
                target.style.bottom = SIDE_GAP_PX + 'px';
                return;
            }

            const footerRect = footer.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            // Desired bottom so that the gap between button bottom and footer top equals BASE_GAP_PX
            const desiredBottom = SIDE_GAP_PX + (viewportHeight - footerRect.top);

            // If footer is on screen (footerRect.top < viewportHeight), lift the button;
            // else keep the base bottom gap.
            const bottomPx = footerRect.top < viewportHeight
                ? Math.max(SIDE_GAP_PX, desiredBottom)
                : SIDE_GAP_PX;

            target.style.bottom = bottomPx + 'px';
        }

        updateFabBottomGap();
        window.addEventListener('scroll', updateFabBottomGap, { passive: true });
        window.addEventListener('resize', updateFabBottomGap);
        // Also react when the footer enters/leaves the viewport for immediate updates
        if (footer && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(updateFabBottomGap, { threshold: 0.01 });
            observer.observe(footer);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChatButton);
    } else {
        initializeChatButton();
    }
})();


