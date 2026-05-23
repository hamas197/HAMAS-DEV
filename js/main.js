/* ============================================================
   HAMASDev Portfolio - Complete JavaScript Application
   Architecture: Modular ES6+ with localStorage persistence
   ============================================================ */

/* ======== UTILS MODULE ======== */
const Utils = {
    formatCurrency(amount) {
        return `$${amount}`;
    },

    formatDate(date) {
        const d = new Date(date);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return d.toLocaleDateString('en-US', options);
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showNotification(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');

        const icon = document.createElement('span');
        icon.className = 'toast-icon';
        if (type === 'success') {
            icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        } else if (type === 'error') {
            icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
        } else {
            icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
        }

        const msgSpan = document.createElement('span');
        msgSpan.className = 'toast-message';
        msgSpan.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close notification');
        closeBtn.addEventListener('click', () => removeToast(toast));

        toast.appendChild(icon);
        toast.appendChild(msgSpan);
        toast.appendChild(closeBtn);
        container.appendChild(toast);

        setTimeout(() => removeToast(toast), 4000);

        function removeToast(el) {
            el.classList.add('removing');
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 300);
        }
    },

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    },

    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

/* ======== AUTH MODULE ======== */
const Auth = {
    isLoggedIn() {
        return localStorage.getItem('hamzaAuth') === 'true';
    },

    getUser() {
        return { email: 'shahhamas197@gmail.com', name: 'HAMAS' };
    },

    login(email, password) {
        if (email === 'shahhamas197@gmail.com' && password === 'admin123') {
            localStorage.setItem('hamzaAuth', 'true');
            localStorage.setItem('hamzaUser', JSON.stringify({ email, name: 'HAMAS' }));
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password. Please try again.' };
    },

    logout() {
        localStorage.removeItem('hamzaAuth');
        localStorage.removeItem('hamzaUser');
        window.location.href = 'login.html';
    },

    protect() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
        }
    }
};

/* ======== DEMO DATA MODULE ======== */
const DemoData = {
    init() {
        const existing = localStorage.getItem('hamzaMessages');
        if (existing) return;

        const demos = [
            {
                id: 'demo1',
                name: 'Sarah Johnson',
                email: 'sarah@example.com',
                phone: '+1 (555) 123-4567',
                service: 'ecommerce',
                budget: '200-500',
                message: 'Hi HAMAS, I need a full e-commerce platform for my clothing brand. I need product management, shopping cart, and payment integration. Looking forward to discussing this project with you.',
                date: new Date(Date.now() - 86400000 * 2).toISOString(),
                read: false
            },
            {
                id: 'demo2',
                name: 'Michael Chen',
                email: 'michael@techstartup.io',
                phone: '+1 (555) 987-6543',
                service: 'admin',
                budget: '500+',
                message: 'We are a growing SaaS startup looking for a comprehensive admin dashboard with analytics, user management, and real-time data visualization. This would be an ongoing collaboration.',
                date: new Date(Date.now() - 86400000 * 5).toISOString(),
                read: false
            }
        ];

        localStorage.setItem('hamzaMessages', JSON.stringify(demos));

        const projects = [
            { id: 'p1', name: 'E-commerce Platform', type: 'E-commerce', stack: 'React, Node.js, MongoDB', status: 'Start', year: '2026' },
            { id: 'p2', name: 'Business Website', type: 'Corporate', stack: 'HTML5, CSS3, PHP', status: 'Start', year: '2026' },
            { id: 'p3', name: 'SaaS Dashboard', type: 'Dashboard', stack: 'React, Node.js, PostgreSQL', status: 'Start', year: '2026' }
        ];
        localStorage.setItem('hamzaProjects', JSON.stringify(projects));
    }
};

/* ======== NAVBAR MODULE ======== */
const Navbar = {
    init() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const onScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', Utils.debounce(onScroll, 10), { passive: true });
        onScroll();
    }
};

/* ======== MOBILE MENU MODULE ======== */
const MobileMenu = {
    init() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
            hamburger.setAttribute('aria-expanded', expanded);
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
};

/* ======== SCROLL ANIMATIONS MODULE ======== */
const ScrollAnimations = {
    init() {
        const elements = document.querySelectorAll('.fade-in');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }
};

/* ======== TYPED TEXT MODULE ======== */
const TypedText = {
    init() {
        const element = document.getElementById('typedText');
        if (!element) return;

        const cursor = document.getElementById('typedCursor');
        const originalText = element.textContent;
        element.textContent = '';

        let charIndex = 0;
        const typeSpeed = 80;

        function type() {
            if (charIndex < originalText.length) {
                element.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed + Math.random() * 40);
            } else {
                if (cursor) cursor.classList.add('typing-complete');
            }
        }

        setTimeout(type, 500);
    }
};

/* ======== CARD TILT MODULE ======== */
const CardTilt = {
    init() {
        const cards = document.querySelectorAll('[data-tilt]');
        if (!cards.length) return;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }
};

/* ======== SCROLL PROGRESS MODULE ======== */
const ScrollProgress = {
    init() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = `${Math.min(progress, 100)}%`;
        };

        window.addEventListener('scroll', Utils.debounce(updateProgress, 10), { passive: true });
        updateProgress();
    }
};

/* ======== BACK TO TOP MODULE ======== */
const BackToTop = {
    init() {
        const button = document.getElementById('backToTop');
        if (!button) return;

        const checkScroll = () => {
            if (window.scrollY > 400) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', Utils.debounce(checkScroll, 50), { passive: true });
        checkScroll();

        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

/* ======== PARTICLES MODULE (Code Rain) ======== */
const Particles = {
    init() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        let width, height;

        const codeFragments = ['<html>', '</div>', 'const', 'let', '=>', '{}', '()', '[]', '&&', '||', '==', '!=', 'true', 'null', 'async', 'await', 'import', 'export', 'class', 'this'];

        function resize() {
            const rect = container.getBoundingClientRect();
            width = canvas.width = rect.width;
            height = canvas.height = rect.height;
        }

        function createParticles() {
            particles = [];
            const count = Math.min(Math.floor(width / 15), 60);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    speed: 0.3 + Math.random() * 0.7,
                    opacity: 0.1 + Math.random() * 0.3,
                    text: codeFragments[Math.floor(Math.random() * codeFragments.length)],
                    size: 10 + Math.random() * 4,
                    color: Math.random() > 0.3 ? '#2563eb' : '#06b6d4'
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.font = `${p.size}px 'Cascadia Code', 'Fira Code', monospace`;
                ctx.fillText(p.text, p.x, p.y);

                p.y -= p.speed;

                if (p.y < -20) {
                    p.y = height + 20;
                    p.x = Math.random() * width;
                    p.text = codeFragments[Math.floor(Math.random() * codeFragments.length)];
                }
            });

            animationId = requestAnimationFrame(animate);
        }

        resize();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        this.destroy = () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }
};

/* ======== CONTACT FORM MODULE ======== */
/* NOTE: For production, replace localStorage with real SMTP.
   SMTP credentials available: shahhamas197@gmail.com / App Password
   (App Password stored separately - never commit to version control) */
const ContactForm = {
    form: null,

    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.setupValidation();
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    },

    validateField(field) {
        const errorEl = document.getElementById(`${field.id}Error`);
        if (!errorEl) return true;

        let valid = true;
        let message = '';

        if (field.hasAttribute('required') && !field.value.trim()) {
            valid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && field.value.trim()) {
            valid = Utils.isValidEmail(field.value);
            message = 'Please enter a valid email';
        } else if (field.minLength && field.value.trim().length < field.minLength) {
            valid = false;
            message = `Minimum ${field.minLength} characters required`;
        }

        if (valid) {
            field.classList.remove('error');
            errorEl.textContent = '';
        } else {
            field.classList.add('error');
            errorEl.textContent = message;
        }

        return valid;
    },

    handleSubmit(e) {
        e.preventDefault();

        const fields = ['name', 'email', 'phone', 'service', 'budget', 'message'];
        let allValid = true;

        fields.forEach(id => {
            const field = document.getElementById(id);
            if (field && !this.validateField(field)) {
                allValid = false;
            }
        });

        if (!allValid) return;

        const submitBtn = this.form.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formSuccess = document.getElementById('formSuccess');

        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        submitBtn.disabled = true;

        const formData = {
            name: Utils.sanitize(document.getElementById('name').value.trim()),
            email: Utils.sanitize(document.getElementById('email').value.trim()),
            phone: Utils.sanitize(document.getElementById('phone').value.trim()),
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: Utils.sanitize(document.getElementById('message').value.trim()),
        };

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const messages = JSON.parse(localStorage.getItem('hamzaMessages') || '[]');
                    messages.unshift({ ...formData, id: Utils.generateId(), date: new Date().toISOString(), read: false });
                    localStorage.setItem('hamzaMessages', JSON.stringify(messages));

                    this.form.reset();
                    this.form.style.display = 'none';
                    formSuccess.style.display = 'block';
                    Utils.showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                } else {
                    Utils.showNotification(data.error || 'Failed to send message. Please try again.', 'error');
                }
            })
            .catch(() => {
                Utils.showNotification('Network error. Please try again later.', 'error');
            })
            .finally(() => {
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            });
    }
};

/* ======== LOGIN FORM MODULE ======== */
const LoginForm = {
    init() {
        const form = document.getElementById('loginForm');
        if (!form) return;

        form.addEventListener('submit', (e) => this.handleSubmit(e));

        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    },

    validateField(field) {
        const errorEl = document.getElementById(`${field.id}Error`);
        if (!errorEl) return true;

        let valid = true;
        let message = '';

        if (field.hasAttribute('required') && !field.value.trim()) {
            valid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && field.value.trim()) {
            valid = Utils.isValidEmail(field.value);
            message = 'Please enter a valid email';
        }

        if (valid) {
            field.classList.remove('error');
            errorEl.textContent = '';
        } else {
            field.classList.add('error');
            errorEl.textContent = message;
        }

        return valid;
    },

    handleSubmit(e) {
        e.preventDefault();

        const emailField = document.getElementById('loginEmail');
        const passwordField = document.getElementById('loginPassword');
        const errorEl = document.getElementById('loginError');

        const emailValid = this.validateField(emailField);
        const passValid = this.validateField(passwordField);

        if (!emailValid || !passValid) return;

        const btn = document.querySelector('.btn-login');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');

        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        btn.disabled = true;
        errorEl.style.display = 'none';

        setTimeout(() => {
            const result = Auth.login(emailField.value.trim(), passwordField.value);

            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            btn.disabled = false;

            if (result.success) {
                Utils.showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 500);
            } else {
                errorEl.textContent = result.message;
                errorEl.style.display = 'block';
                passwordField.value = '';
                passwordField.focus();
            }
        }, 1000);
    }
};

/* ======== ADMIN MODULE ======== */
const Admin = {
    refreshInterval: null,
    refreshCount: 30,

    init() {
        Auth.protect();

        const sidebar = document.getElementById('adminSidebar');
        if (!sidebar) return;

        this.renderUserInfo();
        this.renderStats();
        this.renderMessages();
        this.renderProjects();
        this.setupEventListeners();
        this.startAutoRefresh();

        const activeSection = window.location.hash ? window.location.hash.slice(1) : 'dashboard';
        this.switchSection(activeSection);
    },

    renderUserInfo() {
        const user = Auth.getUser();
        const userEl = document.getElementById('adminUser');
        if (userEl) {
            const avatar = userEl.querySelector('.admin-avatar');
            const name = userEl.querySelector('.admin-name');
            if (avatar) avatar.textContent = user.name.charAt(0).toUpperCase();
            if (name) name.textContent = user.name;
        }
    },

    renderStats() {
        const messages = JSON.parse(localStorage.getItem('hamzaMessages') || '[]');
        const projects = JSON.parse(localStorage.getItem('hamzaProjects') || '[]');

        const total = messages.length;
        const unread = messages.filter(m => !m.read).length;
        const responded = messages.filter(m => m.read).length;
        const projectCount = projects.length;

        this.animateNumber('statTotal', total);
        this.animateNumber('statUnread', unread);
        this.animateNumber('statProjects', projectCount);
        this.animateNumber('statResponded', responded);

        const badge = document.getElementById('unreadBadge');
        if (badge) {
            badge.textContent = unread;
            badge.style.display = unread > 0 ? 'inline' : 'none';
        }
    },

    animateNumber(elementId, target) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const current = parseInt(el.textContent) || 0;
        if (current === target) return;

        const duration = 1000;
        const steps = 30;
        const increment = (target - current) / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const value = Math.round(current + increment * step);
            el.textContent = value;
            if (step >= steps) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, duration / steps);
    },

    renderMessages(filter = 'all') {
        const tbody = document.getElementById('messagesBody');
        const recentTbody = document.getElementById('recentMessagesBody');
        if (!tbody && !recentTbody) return;

        const messages = JSON.parse(localStorage.getItem('hamzaMessages') || '[]');

        let filtered = messages;
        if (filter === 'unread') filtered = messages.filter(m => !m.read);
        if (filter === 'read') filtered = messages.filter(m => m.read);

        const renderRow = (msg) => {
            const statusClass = msg.read ? 'status-read' : 'status-unread';
            const statusText = msg.read ? 'Read' : 'Unread';
            return `
                <tr>
                    <td><strong>${Utils.sanitize(msg.name)}</strong></td>
                    <td><a href="mailto:${Utils.sanitize(msg.email)}">${Utils.sanitize(msg.email)}</a></td>
                    <td>${Utils.sanitize(msg.service)}</td>
                    <td>${msg.budget ? Utils.sanitize(msg.budget) : '-'}</td>
                    <td>${Utils.formatDate(msg.date)}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <div class="action-group">
                            <button class="action-btn" onclick="Admin.viewMessage('${msg.id}')" title="View message">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            ${!msg.read ? `
                            <button class="action-btn" onclick="Admin.markAsRead('${msg.id}')" title="Mark as read">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="12 1 12 13 17 18"/><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/></svg>
                            </button>` : ''}
                            <button class="action-btn action-danger" onclick="Admin.deleteMessage('${msg.id}')" title="Delete message">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        };

        const renderRecentRow = (msg) => {
            const statusClass = msg.read ? 'status-read' : 'status-unread';
            const statusText = msg.read ? 'Read' : 'Unread';
            return `
                <tr>
                    <td><strong>${Utils.sanitize(msg.name)}</strong></td>
                    <td><a href="mailto:${Utils.sanitize(msg.email)}">${Utils.sanitize(msg.email)}</a></td>
                    <td>${Utils.sanitize(msg.service)}</td>
                    <td>${Utils.formatDate(msg.date)}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        };

        if (tbody) {
            if (filtered.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No messages found</td></tr>';
            } else {
                tbody.innerHTML = filtered.map(renderRow).join('');
            }
        }

        if (recentTbody) {
            const recent = messages.slice(0, 5);
            if (recent.length === 0) {
                recentTbody.innerHTML = '<tr><td colspan="5" class="empty-state">No messages yet</td></tr>';
            } else {
                recentTbody.innerHTML = recent.map(renderRecentRow).join('');
            }
        }
    },

    renderProjects() {
        const tbody = document.getElementById('projectsBody');
        if (!tbody) return;

        const projects = JSON.parse(localStorage.getItem('hamzaProjects') || '[]');

        if (projects.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No projects yet</td></tr>';
            return;
        }

        tbody.innerHTML = projects.map(project => `
            <tr>
                <td><strong>${Utils.sanitize(project.name)}</strong></td>
                <td>${Utils.sanitize(project.type)}</td>
                <td>${Utils.sanitize(project.stack)}</td>
                <td><span class="status-badge status-read">${Utils.sanitize(project.status)}</span></td>
                <td>${Utils.sanitize(project.year)}</td>
            </tr>
        `).join('');
    },

    viewMessage(id) {
        const messages = JSON.parse(localStorage.getItem('hamzaMessages') || '[]');
        const msg = messages.find(m => m.id === id);
        if (!msg) return;

        const modal = document.getElementById('messageModal');
        const detail = document.getElementById('messageDetail');
        if (!modal || !detail) return;

        const services = {
            frontend: 'Custom Frontend',
            backend: 'Backend Development',
            database: 'Database Architecture',
            ecommerce: 'E-commerce',
            admin: 'Admin Dashboard',
            api: 'API Integration',
            other: 'Other'
        };

        detail.innerHTML = `
            <div class="message-detail-content">
                <div class="detail-row">
                    <h4>Name</h4>
                    <p>${Utils.sanitize(msg.name)}</p>
                </div>
                <div class="detail-row">
                    <h4>Email</h4>
                    <p><a href="mailto:${Utils.sanitize(msg.email)}">${Utils.sanitize(msg.email)}</a></p>
                </div>
                ${msg.phone ? `
                <div class="detail-row">
                    <h4>Phone</h4>
                    <p>${Utils.sanitize(msg.phone)}</p>
                </div>` : ''}
                <div class="detail-row">
                    <h4>Service</h4>
                    <p>${services[msg.service] || Utils.sanitize(msg.service)}</p>
                </div>
                ${msg.budget ? `
                <div class="detail-row">
                    <h4>Budget</h4>
                    <p>${Utils.sanitize(msg.budget)}</p>
                </div>` : ''}
                <div class="detail-row">
                    <h4>Date</h4>
                    <p>${Utils.formatDate(msg.date)}</p>
                </div>
                <div class="detail-row">
                    <h4>Message</h4>
                    <div class="message-text">${Utils.sanitize(msg.message)}</div>
                </div>
            </div>
        `;

        modal.style.display = 'flex';

        if (!msg.read) {
            this.markAsRead(id, true);
        }
    },

    markAsRead(id, silent = false) {
        const messages = JSON.parse(localStorage.getItem('hamzaMessages') || '[]');
        const msg = messages.find(m => m.id === id);
        if (!msg) return;

        msg.read = true;
        localStorage.setItem('hamzaMessages', JSON.stringify(messages));

        this.renderStats();
        this.renderMessages();
        if (!silent) {
            Utils.showNotification('Message marked as read', 'success');
        }
    },

    deleteMessage(id) {
        if (!confirm('Are you sure you want to delete this message?')) return;

        let messages = JSON.parse(localStorage.getItem('hamzaMessages') || '[]');
        messages = messages.filter(m => m.id !== id);
        localStorage.setItem('hamzaMessages', JSON.stringify(messages));

        this.renderStats();
        this.renderMessages();
        Utils.showNotification('Message deleted successfully', 'success');

        const modal = document.getElementById('messageModal');
        if (modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    },

    switchSection(section) {
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

        const targetSection = document.getElementById(`section-${section}`);
        if (targetSection) targetSection.classList.add('active');

        const targetLink = document.querySelector(`.sidebar-link[data-section="${section}"]`);
        if (targetLink) targetLink.classList.add('active');

        const pageTitle = document.querySelector('.admin-page-title');
        if (pageTitle) {
            const titles = { dashboard: 'Dashboard', messages: 'Messages', projects: 'Projects' };
            pageTitle.textContent = titles[section] || 'Dashboard';
        }
    },

    setupEventListeners() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                Auth.logout();
            });
        }

        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.switchSection(section);
                window.location.hash = section;

                const sidebar = document.getElementById('adminSidebar');
                if (sidebar && window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            });
        });

        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('messageModal');
        if (modalClose && modal) {
            modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') modal.style.display = 'none';
            });
        }

        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarEl = document.getElementById('adminSidebar');
        const sidebarClose = document.getElementById('sidebarClose');
        if (sidebarToggle && sidebarEl) {
            sidebarToggle.addEventListener('click', () => {
                sidebarEl.classList.toggle('active');
            });
        }
        if (sidebarClose && sidebarEl) {
            sidebarClose.addEventListener('click', () => {
                sidebarEl.classList.remove('active');
            });
        }

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderMessages(btn.getAttribute('data-filter'));
            });
        });

        if (window.innerWidth <= 768) {
            document.addEventListener('click', (e) => {
                const sidebar = document.getElementById('adminSidebar');
                const toggle = document.getElementById('sidebarToggle');
                if (sidebar && toggle && sidebar.classList.contains('active')) {
                    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                        sidebar.classList.remove('active');
                    }
                }
            });
        }
    },

    startAutoRefresh() {
        const countdownEl = document.getElementById('refreshCountdown');
        if (countdownEl) {
            this.refreshCount = 30;
            countdownEl.textContent = this.refreshCount;
        }

        if (this.refreshInterval) clearInterval(this.refreshInterval);

        this.refreshInterval = setInterval(() => {
            this.refreshCount--;
            const countdownEl = document.getElementById('refreshCountdown');
            if (countdownEl) countdownEl.textContent = this.refreshCount;

            if (this.refreshCount <= 0) {
                this.refreshCount = 30;
                this.renderStats();
                this.renderMessages();
                this.renderProjects();
            }
        }, 1000);
    }
};

/* ======== INITIALIZATION ======== */
document.addEventListener('DOMContentLoaded', () => {
    DemoData.init();
    Navbar.init();
    MobileMenu.init();
    ScrollAnimations.init();
    TypedText.init();
    CardTilt.init();
    ScrollProgress.init();
    BackToTop.init();
    Particles.init();
    ContactForm.init();
    LoginForm.init();

    if (document.querySelector('.admin-page')) {
        Admin.init();
    }

    const heroStat = document.querySelector('.stat-number[data-count]');
    if (heroStat) {
        const target = parseInt(heroStat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                heroStat.textContent = target;
                clearInterval(timer);
            } else {
                heroStat.textContent = Math.floor(current);
            }
        }, 30);
    }
});
