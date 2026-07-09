document.addEventListener('DOMContentLoaded', () => {

    // ================= GLOBAL STATE & DEMO CONFIG =================
    const userProfile = {
        name: 'Administrator',
        email: 'admin@bakriemetal.co.id',
        role: 'Super Admin (Root)',
        department: 'Admin',
        canManageAccounts: true
    };

    // Global Website Information State
    const websiteInfo = {
        companyName: 'PT. Bakrie Metal Industries',
        companyDomain: 'bakriemetal.co.id',
        heroTitle: 'Kokoh Terpercaya Membangun Indonesia',
        heroDesc: 'PT. Bakrie Metal Industries menyediakan solusi fabrikasi baja berat, pipa baja berkualitas tinggi, dan jasa konstruksi logam presisi untuk infrastruktur nasional dan industri energi global.',
        phone: '+62 (21) 5290-9999',
        email: 'sales@bakriemetal.co.id',
        address: 'Bakrie Tower Lantai 35, Rasuna Said Kuningan, Jakarta Selatan, Indonesia'
    };

    let contactInbox = loadContactMessages();

    function loadContactMessages() {
        try {
            const stored = localStorage.getItem('bmiContactInbox');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Unable to load contact inbox:', error);
            return [];
        }
    }

    function saveContactMessages() {
        try {
            localStorage.setItem('bmiContactInbox', JSON.stringify(contactInbox));
        } catch (error) {
            console.warn('Unable to save contact inbox:', error);
        }
    }

    function renderContactStatus() {
        const statusCard = document.getElementById('contactStatusCard');
        const statusTitle = document.getElementById('contactStatusTitle');
        const statusBody = document.getElementById('contactStatusBody');

        if (!statusCard || !statusTitle || !statusBody) return;

        const latest = [...contactInbox].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))[0];
        if (!latest) {
            statusCard.style.display = 'none';
            return;
        }

        statusCard.style.display = 'block';
        if (latest.status === 'replied') {
            statusTitle.textContent = 'Balasan admin telah dikirim';
            statusBody.innerHTML = `<strong>${latest.replyBy}</strong> menanggapi permintaan Anda: “${latest.reply}”`;
        } else {
            statusTitle.textContent = 'Pesan Anda sedang menunggu balasan';
            statusBody.innerHTML = `Tim admin BMI menerima pesan mengenai <strong>${latest.subject}</strong> dan akan menghubungi Anda secepatnya.`;
        }
    }

    function renderContactInbox() {
        const inboxList = document.getElementById('contactInboxList');
        if (!inboxList) return;

        if (contactInbox.length === 0) {
            inboxList.innerHTML = '<div class="empty-inbox">Belum ada pesan kontak dari klien.</div>';
            return;
        }

        inboxList.innerHTML = contactInbox.map(message => `
            <div class="contact-message-card ${message.status === 'replied' ? 'replied' : ''}">
                <div class="contact-message-head">
                    <div>
                        <h4>${message.name}</h4>
                        <p>${message.email}</p>
                    </div>
                    <span class="contact-pill ${message.status === 'replied' ? 'replied' : 'pending'}">${message.status === 'replied' ? 'Sudah dibalas' : 'Menunggu'}</span>
                </div>
                <div class="contact-message-meta">${message.subject} • ${new Date(message.submittedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                <div class="contact-message-body">${message.message}</div>
                ${message.reply ? `<div class="admin-reply-preview"><strong>Balasan admin:</strong> ${message.reply}</div>` : ''}
                <button class="reply-select-btn" data-id="${message.id}" type="button">
                    <i class="fa-solid fa-reply"></i> Balas pesan ini
                </button>
            </div>
        `).join('');

        inboxList.querySelectorAll('.reply-select-btn').forEach(button => {
            button.addEventListener('click', () => {
                const selectedId = button.getAttribute('data-id');
                const selectedMessage = contactInbox.find(item => item.id === selectedId);
                const replyTargetHint = document.getElementById('replyTargetHint');
                const replyContactId = document.getElementById('replyContactId');
                const replyText = document.getElementById('replyText');

                if (selectedMessage && replyTargetHint && replyContactId && replyText) {
                    replyContactId.value = selectedMessage.id;
                    replyTargetHint.textContent = `Balas untuk ${selectedMessage.name} — ${selectedMessage.subject}`;
                    replyText.focus();
                }
            });
        });
    }

    // Initial Employee Data (Extended with account credentials)
    function loadKaryawanList() {
        try {
            const stored = localStorage.getItem('bmiKaryawanList');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Unable to load employee accounts:', error);
        }

        return [
            { nip: 'BMI-22010', nama: 'Budi Santoso', jabatan: 'Welding Supervisor', departemen: 'Produksi & Fabrikasi', email: 'budi.santoso@bakriemetal.co.id', username: 'bus', sandi: '123', status: 'Aktif', role: 'Karyawan' },
            { nip: 'BMI-24018', nama: 'Siti Rahmawati', jabatan: 'Quality Control Engineer', departemen: 'Quality Assurance & QC', email: 'siti.rahma@bakriemetal.co.id', username: 'sitir', sandi: 'pwd123Sit', status: 'Aktif', role: 'Karyawan' },
            { nip: 'BMI-23005', nama: 'Adi Wijaya', jabatan: 'HSE Safety Officer', departemen: 'HSE & Safety', email: 'adi.wijaya@bakriemetal.co.id', username: 'adiw', sandi: 'pwd123Adi', status: 'Aktif', role: 'Karyawan' },
            { nip: 'BMI-21014', nama: 'Rian Hidayat', jabatan: 'Crane Operator Expert', departemen: 'Produksi & Fabrikasi', email: 'rian.hidayat@bakriemetal.co.id', username: 'rianh', sandi: 'pwd123Ria', status: 'Cuti', role: 'Karyawan' },
            { nip: 'BMI-25002', nama: 'Dewi Lestari', jabatan: 'HR Recruiter Specialist', departemen: 'HR & Legal', email: 'dewi.lestari@bakriemetal.co.id', username: 'dewil', sandi: 'pwd123Dew', status: 'Aktif', role: 'Karyawan' },
            { nip: 'BMI-20001', nama: 'Ahmad Fauzi', jabatan: 'Senior Finance Accountant', departemen: 'Finance & Accounting', email: 'ahmad.fauzi@bakriemetal.co.id', username: 'ahmadf', sandi: 'pwd123Ahm', status: 'Nonaktif', role: 'Karyawan' }
        ];
    }

    let karyawanList = loadKaryawanList();

    function saveKaryawanList() {
        try {
            localStorage.setItem('bmiKaryawanList', JSON.stringify(karyawanList));
        } catch (error) {
            console.warn('Unable to save employee accounts:', error);
        }
    }

    // ================= DYNAMIC WEBSITE SYNC =================
    function syncWebsiteInfo() {
        // Landing Page Elements
        const liveTitle = document.getElementById('liveHeroTitle');
        const liveDesc = document.getElementById('liveHeroDesc');
        const liveAddress = document.getElementById('liveAddress');
        const livePhone = document.getElementById('livePhone');
        const liveEmail = document.getElementById('liveEmail');
        const brandName = document.getElementById('brandNameDisplay');
        const brandDomain = document.getElementById('brandDomainDisplay');

        if (liveTitle) liveTitle.textContent = websiteInfo.heroTitle;
        if (liveDesc) liveDesc.textContent = websiteInfo.heroDesc;
        if (liveAddress) liveAddress.textContent = websiteInfo.address;
        if (livePhone) livePhone.textContent = websiteInfo.phone;
        if (liveEmail) liveEmail.textContent = websiteInfo.email;

        // Admin Website Settings Form Inputs
        const inputTitle = document.getElementById('webHeroTitleInput');
        const inputDesc = document.getElementById('webHeroDescInput');
        const inputPhone = document.getElementById('webPhoneInput');
        const inputEmail = document.getElementById('webEmailInput');
        const inputAddress = document.getElementById('webAddressInput');

        if (brandName) brandName.textContent = websiteInfo.companyName;
        if (brandDomain) brandDomain.textContent = websiteInfo.companyDomain;
        document.title = `${websiteInfo.companyName} - Inovasi Struktur & Manufaktur Logam`;

        if (inputTitle) inputTitle.value = websiteInfo.heroTitle;
        if (inputDesc) inputDesc.value = websiteInfo.heroDesc;
        if (inputPhone) inputPhone.value = websiteInfo.phone;
        if (inputEmail) inputEmail.value = websiteInfo.email;
        if (inputAddress) inputAddress.value = websiteInfo.address;
    }

    function canManageAccounts() {
        const roleText = `${userProfile.role || ''} ${userProfile.department || ''}`.toLowerCase();
        return userProfile.canManageAccounts || roleText.includes('hr') || roleText.includes('legal');
    }

    function refreshAccountAccessUI() {
        const addBtn = document.getElementById('addKaryawanBtn');
        if (addBtn) {
            addBtn.style.display = canManageAccounts() ? 'inline-flex' : 'none';
        }
    }

    // Trigger sync on page load
    syncWebsiteInfo();
    renderContactStatus();
    renderContactInbox();
    refreshAccountAccessUI();

    // ================= MOBILE NAVIGATION TOGGLE =================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            }

            // Manage active class
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ================= REAL-TIME CONTACT FORM VALIDATION =================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                const submitBtn = document.getElementById('submitContactBtn');
                const originalContent = submitBtn.innerHTML;

                // Show sending animation
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Mengirim...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;

                setTimeout(() => {
                    const newMessage = {
                        id: `msg-${Date.now()}`,
                        name: document.getElementById('contactName').value.trim(),
                        email: document.getElementById('contactEmail').value.trim(),
                        subject: document.getElementById('contactSubject').value.trim(),
                        message: document.getElementById('contactMessage').value.trim(),
                        submittedAt: new Date().toISOString(),
                        status: 'menunggu',
                        reply: '',
                        replyBy: '',
                        replyAt: ''
                    };

                    contactInbox.unshift(newMessage);
                    saveContactMessages();
                    renderContactStatus();
                    renderContactInbox();

                    contactForm.reset();
                    inputs.forEach(input => input.parentElement.classList.remove('invalid'));

                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                }, 1500);
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const parent = field.parentElement;
        let isValid = true;

        if (field.hasAttribute('required') && value === '') {
            isValid = false;
        } else if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        if (isValid) {
            parent.classList.remove('invalid');
        } else {
            parent.classList.add('invalid');
        }

        return isValid;
    }

    // ================= LOGIN MODAL SYSTEM =================
    const loginModal = document.getElementById('loginModal');
    const openLoginBtn = document.getElementById('openLoginBtn');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const loginForm = document.getElementById('loginForm');
    const loginAlert = document.getElementById('loginAlert');
    const loginAlertText = document.getElementById('loginAlertText');

    if (openLoginBtn && loginModal) {
        openLoginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    }

    if (closeLoginBtn && loginModal) {
        closeLoginBtn.addEventListener('click', () => {
            closeModal();
        });

        // Close modal when clicking outside card
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
        loginForm.reset();
        loginAlert.style.display = 'none';
    }

    // Auth Submission Handler (Mock Authentication)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username').value.trim();
            const passwordInput = document.getElementById('password').value;
            const loginSubmitBtn = document.getElementById('loginSubmitBtn');
            const btnText = loginSubmitBtn.querySelector('.btn-text');
            const spinner = loginSubmitBtn.querySelector('.spinner');

            loginAlert.style.display = 'none';

            // Show loading animation
            loginSubmitBtn.disabled = true;
            btnText.style.opacity = '0.5';
            spinner.style.display = 'inline-block';

            setTimeout(() => {
                const isAdmin = usernameInput === 'admin' && passwordInput === 'password123';
                const matchingAccount = !isAdmin ? karyawanList.find(acc => acc.username.toLowerCase() === usernameInput.toLowerCase() && acc.sandi === passwordInput && acc.status && acc.status.toLowerCase() === 'aktif') : null;

                if (isAdmin) {
                    userProfile.name = 'Administrator';
                    userProfile.email = 'admin@bakriemetal.co.id';
                    userProfile.role = 'Super Admin (Root)';
                    userProfile.department = 'Admin';
                    userProfile.canManageAccounts = true;
                    closeModal();
                    enterDashboard();
                } else if (matchingAccount) {
                    userProfile.name = matchingAccount.nama;
                    userProfile.email = matchingAccount.email;
                    userProfile.role = matchingAccount.jabatan || matchingAccount.role || 'Karyawan';
                    userProfile.department = matchingAccount.departemen || '';
                    userProfile.canManageAccounts = /hr|legal/i.test(`${matchingAccount.departemen || ''} ${matchingAccount.jabatan || ''} ${matchingAccount.role || ''}`);
                    closeModal();
                    enterDashboard();
                } else {
                    loginAlertText.textContent = 'Username atau kata sandi tidak valid!';
                    loginAlert.style.display = 'flex';
                }

                // Reset submit button state
                loginSubmitBtn.disabled = false;
                btnText.style.opacity = '1';
                spinner.style.display = 'none';
            }, 1800);
        });
    }

    // ================= DASHBOARD TRANSITION & LOGIC =================
    const publicContainer = document.getElementById('publicContainer');
    const dashboardArea = document.getElementById('dashboardArea');
    const logoutBtn = document.getElementById('logoutBtn');

    function enterDashboard() {
        publicContainer.classList.add('hidden');
        dashboardArea.classList.remove('hidden');
        window.scrollTo(0, 0);

        // Sync displays & data
        updateDashboardProfileDisplay();
        setCurrentDate();
        renderKaryawanTable();
        syncWebsiteInfo();
    }

    function exitDashboard() {
        dashboardArea.classList.add('hidden');
        publicContainer.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin keluar dari dashboard?')) {
                exitDashboard();
            }
        });
    }

    // Update Dashboard UI elements from state
    function updateDashboardProfileDisplay() {
        const adminNameDisplays = document.querySelectorAll('#adminNameDisplay');
        const adminNameInput = document.getElementById('adminNameInput');
        const adminEmailInput = document.getElementById('adminEmailInput');
        const avatarDisplay = document.getElementById('avatarDisplay');

        adminNameDisplays.forEach(el => el.textContent = userProfile.name);

        if (adminNameInput) adminNameInput.value = userProfile.name;
        if (adminEmailInput) adminEmailInput.value = userProfile.email;

        if (avatarDisplay) {
            avatarDisplay.textContent = userProfile.name.charAt(0).toUpperCase();
        }
    }

    // Display formatted local date
    function setCurrentDate() {
        const dateEl = document.getElementById('currentDateDisplay');
        if (dateEl) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const today = new Date();
            dateEl.textContent = today.toLocaleDateString('id-ID', options);
        }
    }

    // ================= DASHBOARD NAVIGATION & TAB SWITCHING =================
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const tabContents = document.querySelectorAll('.db-tab-content');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');

            // Remove active classes
            sidebarLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Set active states
            link.classList.add('active');
            const targetTab = document.getElementById(`tab-${tabId}`);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Close mobile sidebar after navigation
            const sidebar = document.querySelector('.db-sidebar');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Mobile Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            const sidebar = document.querySelector('.db-sidebar');
            if (sidebar) {
                sidebar.classList.add('active');
            }
        });
    }

    // Close sidebar clicking outside on mobile
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.db-sidebar');
        const toggle = document.getElementById('sidebarToggle');

        if (sidebar && sidebar.classList.contains('active') && toggle) {
            if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // ================= DATA KARYAWAN FUNCTIONALITIES =================
    const karyawanTableBody = document.getElementById('karyawanTableBody');
    const karyawanSearch = document.getElementById('karyawanSearch');
    const addKaryawanBtn = document.getElementById('addKaryawanBtn');
    const employeeModal = document.getElementById('employeeModal');
    const closeEmployeeModalBtn = document.getElementById('closeEmployeeModalBtn');
    const employeeForm = document.getElementById('employeeForm');

    // 1. Render Table
    function renderKaryawanTable(filterText = '') {
        if (!karyawanTableBody) return;

        refreshAccountAccessUI();
        karyawanTableBody.innerHTML = '';

        const filtered = karyawanList.filter(emp => {
            const term = filterText.toLowerCase();
            return emp.nama.toLowerCase().includes(term) ||
                emp.nip.toLowerCase().includes(term) ||
                emp.jabatan.toLowerCase().includes(term) ||
                emp.departemen.toLowerCase().includes(term) ||
                emp.username.toLowerCase().includes(term) ||
                emp.email.toLowerCase().includes(term);
        });

        if (filtered.length === 0) {
            karyawanTableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; color: var(--text-secondary); padding: 30px;">
                        <i class="fa-solid fa-users-slash" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                        Tidak ada data karyawan yang cocok dengan pencarian Anda.
                    </td>
                </tr>
            `;
            return;
        }

        filtered.forEach(emp => {
            const statusClass = emp.status.toLowerCase();
            const tr = document.createElement('tr');
            const canManage = canManageAccounts();
            tr.innerHTML = `
                <td><strong>${emp.nip}</strong></td>
                <td>${emp.nama}</td>
                <td>${emp.jabatan}</td>
                <td>${emp.departemen}</td>
                <td>${emp.email}</td>
                <td><span class="emp-credential">${emp.username}</span></td>
                <td><span class="emp-credential">${emp.sandi}</span></td>
                <td><span class="emp-status ${statusClass}">${emp.status}</span></td>
                <td>
                    ${canManage ? `<button class="btn-delete" data-nip="${emp.nip}" title="Hapus Karyawan">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>` : `<span class="view-only-badge">Hanya lihat</span>`}
                </td>
            `;
            karyawanTableBody.appendChild(tr);
        });

        if (canManageAccounts()) {
            const deleteButtons = karyawanTableBody.querySelectorAll('.btn-delete');
            deleteButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const nipToDelete = btn.getAttribute('data-nip');
                    deleteKaryawan(nipToDelete);
                });
            });
        }
    }

    // 2. Search Filter
    if (karyawanSearch) {
        karyawanSearch.addEventListener('input', (e) => {
            renderKaryawanTable(e.target.value);
        });
    }

    // 3. Modal Opening/Closing
    if (addKaryawanBtn && employeeModal) {
        addKaryawanBtn.addEventListener('click', () => {
            if (!canManageAccounts()) {
                alert('Hanya akun HR & Legal yang dapat mengubah atau mengelola data akun karyawan.');
                return;
            }
            employeeModal.classList.add('active');
        });
    }

    if (closeEmployeeModalBtn && employeeModal) {
        closeEmployeeModalBtn.addEventListener('click', () => {
            closeEmployeeModal();
        });

        employeeModal.addEventListener('click', (e) => {
            if (e.target === employeeModal) {
                closeEmployeeModal();
            }
        });
    }

    function closeEmployeeModal() {
        employeeModal.classList.remove('active');
        employeeForm.reset();
    }

    // 4. Add Employee Form Submission (with account parameters)
    if (employeeForm) {
        employeeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!canManageAccounts()) {
                alert('Hanya akun HR & Legal yang dapat mengubah atau mengelola data akun karyawan.');
                return;
            }

            const nipVal = document.getElementById('empNIP').value.trim();
            const nameVal = document.getElementById('empName').value.trim();
            const usernameVal = document.getElementById('empUsername').value.trim();
            const passwordVal = document.getElementById('empPassword').value;
            const posVal = document.getElementById('empPosition').value.trim();
            const deptVal = document.getElementById('empDepartment').value;
            const emailVal = document.getElementById('empEmail').value.trim();
            const statusVal = document.getElementById('empStatus').value;

            // Simple validation: NIP must be unique
            const isNipExists = karyawanList.some(emp => emp.nip.toLowerCase() === nipVal.toLowerCase());
            if (isNipExists) {
                alert(`NIP ${nipVal} sudah terdaftar di sistem! Silakan gunakan NIP lain.`);
                return;
            }

            // Simple validation: Username must be unique
            const isUsernameExists = karyawanList.some(emp => emp.username.toLowerCase() === usernameVal.toLowerCase());
            if (isUsernameExists) {
                alert(`Username "${usernameVal}" sudah digunakan! Silakan gunakan username lain.`);
                return;
            }

            // Create new employee object with credentials
            const newEmp = {
                nip: nipVal,
                nama: nameVal,
                username: usernameVal,
                sandi: passwordVal,
                jabatan: posVal,
                departemen: deptVal,
                email: emailVal,
                status: statusVal,
                role: 'Karyawan'
            };

            // Push to state array and persist
            karyawanList.unshift(newEmp);
            saveKaryawanList();

            // Re-render and close
            renderKaryawanTable(karyawanSearch.value);
            closeEmployeeModal();

            alert(`Berhasil membuat akun karyawan: ${nameVal} (Username: ${usernameVal})`);
        });
    }

    // 5. Delete Employee
    function deleteKaryawan(nip) {
        const emp = karyawanList.find(e => e.nip === nip);
        if (!emp) return;

        if (!canManageAccounts()) {
            alert('Hanya akun HR & Legal yang dapat mengubah atau mengelola data akun karyawan.');
            return;
        }

        if (confirm(`Apakah Anda yakin ingin menghapus data karyawan ${emp.nama} (${emp.nip}) dari database perusahaan?`)) {
            karyawanList = karyawanList.filter(e => e.nip !== nip);
            saveKaryawanList();
            renderKaryawanTable(karyawanSearch.value);
        }
    }

    // ================= CONTACT REPLY HANDLER =================
    const replyContactForm = document.getElementById('replyContactForm');
    const replyContactId = document.getElementById('replyContactId');
    const replyText = document.getElementById('replyText');
    const replyStatusText = document.getElementById('replyStatusText');

    if (replyContactForm) {
        replyContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!replyContactId.value || !replyText.value.trim()) {
                if (replyStatusText) {
                    replyStatusText.textContent = 'Pilih pesan klien dan tulis balasan terlebih dahulu.';
                    replyStatusText.style.color = 'var(--warning)';
                }
                return;
            }

            const message = contactInbox.find(item => item.id === replyContactId.value);
            if (!message) return;

            message.reply = replyText.value.trim();
            message.replyBy = userProfile.name;
            message.replyAt = new Date().toISOString();
            message.status = 'replied';

            saveContactMessages();
            renderContactInbox();
            renderContactStatus();

            if (replyStatusText) {
                replyStatusText.textContent = `Balasan berhasil dikirim ke ${message.name}.`;
                replyStatusText.style.color = 'var(--success)';
            }

            replyContactForm.reset();
            replyContactId.value = '';
            const replyTargetHint = document.getElementById('replyTargetHint');
            if (replyTargetHint) replyTargetHint.textContent = 'Pilih pesan dari klien untuk membalas.';
        });
    }

    // ================= WEBSITE INFO EDITOR HANDLER =================
    const websiteInfoForm = document.getElementById('websiteInfoForm');
    const websiteAlert = document.getElementById('websiteAlert');

    if (websiteInfoForm) {
        websiteInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            websiteInfo.heroTitle = document.getElementById('webHeroTitleInput').value.trim();
            websiteInfo.heroDesc = document.getElementById('webHeroDescInput').value.trim();
            websiteInfo.phone = document.getElementById('webPhoneInput').value.trim();
            websiteInfo.email = document.getElementById('webEmailInput').value.trim();
            websiteInfo.address = document.getElementById('webAddressInput').value.trim();

            // Sync text elements in public landing page
            syncWebsiteInfo();

            // Show success alert
            if (websiteAlert) {
                websiteAlert.style.display = 'flex';
                setTimeout(() => {
                    websiteAlert.style.display = 'none';
                }, 3000);
            }
        });
    }

    // ================= SETTINGS FORM HANDLER =================
    const settingsForm = document.getElementById('settingsForm');
    const settingsAlert = document.getElementById('settingsAlert');

    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameVal = document.getElementById('adminNameInput').value.trim();
            const emailVal = document.getElementById('adminEmailInput').value.trim();
            const passwordVal = document.getElementById('adminPasswordInput').value;

            if (nameVal && emailVal) {
                userProfile.name = nameVal;
                userProfile.email = emailVal;

                // Show success feedback
                if (settingsAlert) {
                    settingsAlert.style.display = 'flex';
                    setTimeout(() => {
                        settingsAlert.style.display = 'none';
                    }, 3000);
                }

                // Update UI elements
                updateDashboardProfileDisplay();

                // Clear password input
                document.getElementById('adminPasswordInput').value = '';
            }
        });
    }

    // ================= HERO COUNTER ANIMATIONS (MICRO EFFECT) =================
    let safetyRate = 99.80;
    let projCount = 450;

    const uptimeEl = document.getElementById('statUptime');
    const clientsEl = document.getElementById('statClients');

    const statInterval = setInterval(() => {
        if (safetyRate < 99.99) {
            safetyRate += 0.01;
            if (uptimeEl) uptimeEl.textContent = safetyRate.toFixed(2) + '%';
        }

        if (projCount < 500) {
            projCount += 5;
            if (clientsEl) clientsEl.textContent = projCount + '+';
        }

        if (safetyRate >= 99.99 && projCount >= 500) {
            clearInterval(statInterval);
        }
    }, 100);

});
