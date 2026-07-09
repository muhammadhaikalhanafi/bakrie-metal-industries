document.addEventListener('DOMContentLoaded', () => {

    // ================= GLOBAL STATE & DEMO CONFIG =================
    const userProfile = {
        name: 'Administrator',
        email: 'admin@bakriemetal.co.id',
        role: 'Super Admin (Root)',
        department: 'Admin',
        canManageAccounts: true
    };

    const defaultWebsiteInfo = {
        companyName: 'PT. Bakrie Metal Industries',
        companyDomain: 'bakriemetal.co.id',
        heroTitle: 'Kokoh Terpercaya Membangun Indonesia',
        heroDesc: 'PT. Bakrie Metal Industries menyediakan solusi fabrikasi baja berat, pipa baja berkualitas tinggi, dan jasa konstruksi logam presisi untuk infrastruktur nasional dan industri energi global.',
        phone: '+62 (21) 5290-9999',
        email: 'sales@bakriemetal.co.id',
        address: 'Bakrie Tower Lantai 35, Rasuna Said Kuningan, Jakarta Selatan, Indonesia',
        navAboutLabel: 'Tentang',
        navServicesLabel: 'Layanan',
        navProjectsLabel: 'Proyek',
        navTeamLabel: 'Tim',
        navContactLabel: 'Kontak',
        aboutSectionTitle: 'Memimpin transformasi industri manufaktur logam di Indonesia',
        aboutVisionTitle: 'Visi & Misi',
        aboutVisionText: 'Menjadi mitra strategis nasional dalam fabrikasi baja berat, sistem struktur, dan solusi infrastruktur yang aman, presisi, dan berkelanjutan.',
        aboutHighlightTitle: 'Keunggulan Utama',
        aboutMetricOneValue: '500+',
        aboutMetricTwoValue: '24/7',
        aboutMetricThreeValue: '98%',
        aboutBriefTitle: 'Mengapa Memilih Bakrie Metal Industries?',
        aboutBriefDesc: 'Sebagai bagian dari Bakrie Group, kami memiliki pengalaman puluhan tahun dalam menangani proyek infrastruktur strategis nasional di Indonesia dengan standar mutu dan keselamatan yang ketat.',
        serviceOneTitle: 'Fabrikasi Baja Berat',
        serviceOneDesc: 'Fabrikasi struktur baja skala besar untuk jembatan, bangunan bertingkat tinggi, pelabuhan, dan fasilitas industri dengan standar internasional terakreditasi.',
        serviceTwoTitle: 'Manufaktur Pipa Baja',
        serviceTwoDesc: 'Produksi pipa baja berkualitas tinggi untuk sektor minyak dan gas bumi, transmisi air, serta konstruksi struktural dengan presisi ketebalan terbaik.',
        serviceThreeTitle: 'Jasa EPC & Konstruksi',
        serviceThreeDesc: 'Layanan Engineering, Procurement, dan Construction terpadu untuk memastikan proyek diselesaikan tepat waktu, sesuai spesifikasi, dan aman.',
        projectOneTitle: 'Jembatan Tol Nasional',
        projectOneDesc: 'Fabrikasi struktur baja berat untuk penopang utama proyek transportasi nasional.',
        projectOneMeta: 'Infrastructure • 2025',
        projectTwoTitle: 'Terminal LNG & Energi',
        projectTwoDesc: 'Penyediaan pipa baja presisi dan sistem pendukung untuk fasilitas energi.',
        projectTwoMeta: 'Energy • 2024',
        projectThreeTitle: 'Gudang Industri Modern',
        projectThreeDesc: 'Solusi rangka atap, platform, dan struktur komersial skala besar.',
        projectThreeMeta: 'Industrial • 2023',
        teamOneName: 'Raja Baruna Putra',
        teamOneRole: 'Chief Operational Officer',
        teamTwoName: 'Azira Fitri Elsera',
        teamTwoRole: 'Head of Engineering',
        teamThreeName: 'Dean Nugroho',
        teamThreeRole: 'Project Delivery Lead',
        brandPhoto: '',
        dashboardBrandTitle: 'Brand Showcase BMI',
        dashboardBrandDesc: 'Foto dan pesan visual yang bisa diubah admin untuk menarik perhatian klien dan mitra kerja.'
    };

    function loadWebsiteInfo() {
        try {
            const stored = localStorage.getItem('bmiWebsiteInfo');
            if (stored) {
                return { ...defaultWebsiteInfo, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.warn('Unable to load website info:', error);
        }
        return { ...defaultWebsiteInfo };
    }

    function saveWebsiteInfo() {
        try {
            localStorage.setItem('bmiWebsiteInfo', JSON.stringify(websiteInfo));
        } catch (error) {
            console.warn('Unable to save website info:', error);
        }
    }

    let websiteInfo = loadWebsiteInfo();
    let contactInbox = loadContactMessages();
    let announcements = loadAnnouncements();
    let pendingBrandPhoto = websiteInfo.brandPhoto || '';

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

    function loadAnnouncements() {
        try {
            const stored = localStorage.getItem('bmiAnnouncements');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Unable to load announcements:', error);
        }

        return [
            {
                id: 'ann-1',
                title: 'Prosedur Keselamatan Kerja (K3) Baru untuk Pekerjaan Ketinggian',
                badge: 'Penting',
                body: 'Seluruh pekerja lapangan wajib menggunakan full-body harness tipe double lanyard saat bekerja di atas 2 meter.',
                date: '8 Juli 2026'
            },
            {
                id: 'ann-2',
                title: 'Pencapaian 1 Juta Jam Kerja Aman Tanpa LTI',
                badge: 'Info',
                body: 'Manajemen mengucapkan apresiasi kepada seluruh operator dan staf atas pencapaian tersebut.',
                date: '5 Juli 2026'
            }
        ];
    }

    function saveAnnouncements() {
        try {
            localStorage.setItem('bmiAnnouncements', JSON.stringify(announcements));
        } catch (error) {
            console.warn('Unable to save announcements:', error);
        }
    }

    function renderAnnouncements() {
        const noticeBoardList = document.getElementById('noticeBoardList');
        if (!noticeBoardList) return;

        if (!announcements.length) {
            noticeBoardList.innerHTML = '<div class="empty-inbox">Belum ada pengumuman untuk karyawan.</div>';
            return;
        }

        noticeBoardList.innerHTML = announcements.map(item => `
            <div class="notice-item">
                <div class="notice-badge new">${item.badge}</div>
                <h4>${item.title}</h4>
                <p>${item.body}</p>
                <span class="notice-date"><i class="fa-regular fa-clock"></i> Diposting pada ${item.date}</span>
            </div>
        `).join('');
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
                ${canManageAccounts() ? `<button class="reply-select-btn" data-id="${message.id}" type="button">
                    <i class="fa-solid fa-reply"></i> Balas pesan ini
                </button>` : ''}
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
                const parsed = JSON.parse(stored);
                const adminAccount = parsed.find(acc => acc.nip === 'BMI-ADMIN-01' || acc.username?.toLowerCase() === 'adminbmi' || acc.username?.toLowerCase() === 'admin123' || (acc.role?.toLowerCase() === 'admin' && acc.departemen?.toLowerCase() === 'admin'));

                if (adminAccount) {
                    adminAccount.username = 'admin123';
                    adminAccount.sandi = 'admin321';
                    adminAccount.role = 'Admin';
                    adminAccount.canManageAccounts = true;
                    adminAccount.departemen = adminAccount.departemen || 'Admin';
                    adminAccount.status = adminAccount.status || 'Aktif';
                    localStorage.setItem('bmiKaryawanList', JSON.stringify(parsed));
                }

                return parsed;
            }
        } catch (error) {
            console.warn('Unable to load employee accounts:', error);
        }

        return [
            { nip: 'BMI-ADMIN-01', nama: 'Administrator BMI', jabatan: 'System Administrator', departemen: 'Admin', email: 'admin@bakriemetal.co.id', username: 'admin123', sandi: 'admin321', status: 'Aktif', role: 'Admin', canManageAccounts: true },
            { nip: 'BMI-22010', nama: 'Budi Santoso', jabatan: 'Welding Supervisor', departemen: 'Produksi & Fabrikasi', email: 'budi.santoso@bakriemetal.co.id', username: 'bus', sandi: '123', status: 'Aktif', role: 'Karyawan' },
            { nip: 'BMI-24018', nama: 'Siti Rahmawati', jabatan: 'Quality Control Engineer', departemen: 'Quality Assurance & QC', email: 'siti.rahma@bakriemetal.co.id', username: 'sitir', sandi: 'pwd123Sit', status: 'Aktif', role: 'Karyawan' },
            { nip: 'BMI-23005', nama: 'Adi Wijaya', jabatan: 'HSE Safety Officer', departemen: 'HSE & Safety', email: 'adi.wijaya@bakriemetal.co.id', username: 'adiw', sandi: 'pwd123Adi', status: 'Aktif', role: 'Karyawan' },
            { nip: 'BMI-21014', nama: 'Rian Hidayat', jabatan: 'Crane Operator Expert', departemen: 'Produksi & Fabrikasi', email: 'rian.hidayat@bakriemetal.co.id', username: 'rianh', sandi: 'pwd123Ria', status: 'Cuti', role: 'Karyawan' },
            { nip: 'BMI-25002', nama: 'Dewi Lestari', jabatan: 'HR Recruiter Specialist', departemen: 'HR & Legal', email: 'dewi.lestari@bakriemetal.co.id', username: 'dewil', sandi: 'pwd123Dew', status: 'Aktif', role: 'Karyawan' },
            { nip: 'BMI-20001', nama: 'Ahmad Fauzi', jabatan: 'Senior Finance Accountant', departemen: 'Finance & Accounting', email: 'ahmad.fauzi@bakriemetal.co.id', username: 'ahmadf', sandi: 'pwd123Ahm', status: 'Nonaktif', role: 'Karyawan' }
        ];
    }

    let karyawanList = loadKaryawanList();
    let attendanceList = loadAttendanceList();

    function saveKaryawanList() {
        try {
            localStorage.setItem('bmiKaryawanList', JSON.stringify(karyawanList));
        } catch (error) {
            console.warn('Unable to save employee accounts:', error);
        }
    }

    function loadAttendanceList() {
        try {
            const stored = localStorage.getItem('bmiAttendanceList');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Unable to load attendance data:', error);
        }

        return [
            { id: 1, nama: 'Budi Santoso', jabatan: 'Welding Supervisor', tanggal: '2026-07-09', status: 'Hadir' },
            { id: 2, nama: 'Siti Rahmawati', jabatan: 'Quality Control Engineer', tanggal: '2026-07-09', status: 'Izin' },
            { id: 3, nama: 'Adi Wijaya', jabatan: 'HSE Safety Officer', tanggal: '2026-07-09', status: 'Sakit' }
        ];
    }

    function saveAttendanceList() {
        try {
            localStorage.setItem('bmiAttendanceList', JSON.stringify(attendanceList));
        } catch (error) {
            console.warn('Unable to save attendance data:', error);
        }
    }

    function getAttendanceViewList() {
        const currentName = (userProfile.name || '').trim();
        if (!currentName || canManageAccounts()) {
            return attendanceList;
        }
        return attendanceList.filter(item => item.nama === currentName);
    }

    function ensureOwnAttendanceRecord() {
        if (canManageAccounts()) return;

        const currentName = (userProfile.name || '').trim();
        if (!currentName) return;

        const today = new Date().toISOString().slice(0, 10);
        const existing = attendanceList.find(item => item.nama === currentName && item.tanggal === today);

        if (!existing) {
            attendanceList.unshift({
                id: Date.now(),
                nama: currentName,
                jabatan: userProfile.role || userProfile.department || 'Karyawan',
                tanggal: today,
                status: 'Hadir'
            });
            saveAttendanceList();
        }
    }

    function renderAttendanceTable() {
        const attendanceTableBody = document.getElementById('attendanceTableBody');
        const hadirCount = document.getElementById('attendanceHadirCount');
        const izinCount = document.getElementById('attendanceIzinCount');
        const sakitCount = document.getElementById('attendanceSakitCount');
        const attendanceAccessHint = document.getElementById('attendanceAccessHint');

        if (!attendanceTableBody) return;

        ensureOwnAttendanceRecord();
        const viewList = getAttendanceViewList();
        const hadir = viewList.filter(item => item.status === 'Hadir').length;
        const izin = viewList.filter(item => item.status === 'Izin').length;
        const sakit = viewList.filter(item => item.status === 'Sakit').length;

        if (hadirCount) hadirCount.textContent = hadir;
        if (izinCount) izinCount.textContent = izin;
        if (sakitCount) sakitCount.textContent = sakit;
        if (attendanceAccessHint) {
            attendanceAccessHint.textContent = canManageAccounts()
                ? 'Anda dapat mengubah status absensi semua karyawan.'
                : 'Anda hanya dapat mengubah absensi untuk diri sendiri.';
        }

        attendanceTableBody.innerHTML = viewList.map(item => `
            <tr>
                <td>${item.nama}</td>
                <td>${item.jabatan}</td>
                <td>${item.tanggal}</td>
                <td>
                    <select class="attendance-select" data-id="${item.id}">
                        <option value="Hadir" ${item.status === 'Hadir' ? 'selected' : ''}>Hadir</option>
                        <option value="Izin" ${item.status === 'Izin' ? 'selected' : ''}>Izin</option>
                        <option value="Sakit" ${item.status === 'Sakit' ? 'selected' : ''}>Sakit</option>
                    </select>
                </td>
            </tr>
        `).join('');

        attendanceTableBody.querySelectorAll('.attendance-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const id = Number(e.target.getAttribute('data-id'));
                const selectedStatus = e.target.value;
                const record = attendanceList.find(item => item.id === id);
                if (record) {
                    if (!canManageAccounts() && record.nama !== userProfile.name) {
                        return;
                    }
                    record.status = selectedStatus;
                    saveAttendanceList();
                    renderAttendanceTable();
                }
            });
        });
    }

    // ================= DYNAMIC WEBSITE SYNC =================
    function syncWebsiteInfo() {
        const liveTitle = document.getElementById('liveHeroTitle');
        const liveDesc = document.getElementById('liveHeroDesc');
        const liveAddress = document.getElementById('liveAddress');
        const livePhone = document.getElementById('livePhone');
        const liveEmail = document.getElementById('liveEmail');
        const brandName = document.getElementById('brandNameDisplay');
        const brandDomain = document.getElementById('brandDomainDisplay');
        const heroImage = document.getElementById('heroCompanyImage');
        const dashboardImage = document.getElementById('dashboardBrandImage');
        const websitePhotoPreview = document.getElementById('websitePhotoPreview');

        if (liveTitle) liveTitle.textContent = websiteInfo.heroTitle;
        if (liveDesc) liveDesc.textContent = websiteInfo.heroDesc;
        if (liveAddress) liveAddress.textContent = websiteInfo.address;
        if (livePhone) livePhone.textContent = websiteInfo.phone;
        if (liveEmail) liveEmail.textContent = websiteInfo.email;

        const inputTitle = document.getElementById('webHeroTitleInput');
        const inputDesc = document.getElementById('webHeroDescInput');
        const inputPhone = document.getElementById('webPhoneInput');
        const inputEmail = document.getElementById('webEmailInput');
        const inputAddress = document.getElementById('webAddressInput');
        const navAboutInput = document.getElementById('webNavAboutInput');
        const navServicesInput = document.getElementById('webNavServicesInput');
        const navProjectsInput = document.getElementById('webNavProjectsInput');
        const navTeamInput = document.getElementById('webNavTeamInput');
        const navContactInput = document.getElementById('webNavContactInput');
        const aboutTitleInput = document.getElementById('webAboutTitleInput');
        const aboutDescInput = document.getElementById('webAboutDescInput');
        const aboutBriefTitleInput = document.getElementById('webAboutBriefTitleInput');
        const aboutBriefDescInput = document.getElementById('webAboutBriefDescInput');
        const serviceOneTitleInput = document.getElementById('webServiceOneTitleInput');
        const serviceOneDescInput = document.getElementById('webServiceOneDescInput');
        const serviceTwoTitleInput = document.getElementById('webServiceTwoTitleInput');
        const serviceTwoDescInput = document.getElementById('webServiceTwoDescInput');
        const serviceThreeTitleInput = document.getElementById('webServiceThreeTitleInput');
        const serviceThreeDescInput = document.getElementById('webServiceThreeDescInput');
        const projectOneTitleInput = document.getElementById('webProjectOneTitleInput');
        const projectOneDescInput = document.getElementById('webProjectOneDescInput');
        const projectTwoTitleInput = document.getElementById('webProjectTwoTitleInput');
        const projectTwoDescInput = document.getElementById('webProjectTwoDescInput');
        const projectThreeTitleInput = document.getElementById('webProjectThreeTitleInput');
        const projectThreeDescInput = document.getElementById('webProjectThreeDescInput');
        const teamOneNameInput = document.getElementById('webTeamOneNameInput');
        const teamOneRoleInput = document.getElementById('webTeamOneRoleInput');
        const teamTwoNameInput = document.getElementById('webTeamTwoNameInput');
        const teamTwoRoleInput = document.getElementById('webTeamTwoRoleInput');
        const teamThreeNameInput = document.getElementById('webTeamThreeNameInput');
        const teamThreeRoleInput = document.getElementById('webTeamThreeRoleInput');

        if (brandName) brandName.textContent = websiteInfo.companyName;
        if (brandDomain) brandDomain.textContent = websiteInfo.companyDomain;
        document.title = `${websiteInfo.companyName} - Inovasi Struktur & Manufaktur Logam`;

        if (inputTitle) inputTitle.value = websiteInfo.heroTitle;
        if (inputDesc) inputDesc.value = websiteInfo.heroDesc;
        if (inputPhone) inputPhone.value = websiteInfo.phone;
        if (inputEmail) inputEmail.value = websiteInfo.email;
        if (inputAddress) inputAddress.value = websiteInfo.address;

        const navLabels = {
            about: document.getElementById('navAboutLabel'),
            services: document.getElementById('navServicesLabel'),
            projects: document.getElementById('navProjectsLabel'),
            team: document.getElementById('navTeamLabel'),
            contact: document.getElementById('navContactLabel')
        };
        if (navLabels.about) navLabels.about.textContent = websiteInfo.navAboutLabel;
        if (navLabels.services) navLabels.services.textContent = websiteInfo.navServicesLabel;
        if (navLabels.projects) navLabels.projects.textContent = websiteInfo.navProjectsLabel;
        if (navLabels.team) navLabels.team.textContent = websiteInfo.navTeamLabel;
        if (navLabels.contact) navLabels.contact.textContent = websiteInfo.navContactLabel;

        const aboutTitle = document.getElementById('aboutSectionTitle');
        const aboutVisionTitle = document.getElementById('aboutVisionTitle');
        const aboutVisionText = document.getElementById('aboutVisionText');
        const aboutHighlightTitle = document.getElementById('aboutHighlightTitle');
        const aboutMetricOneValue = document.getElementById('aboutMetricOneValue');
        const aboutMetricTwoValue = document.getElementById('aboutMetricTwoValue');
        const aboutMetricThreeValue = document.getElementById('aboutMetricThreeValue');
        const aboutBriefTitle = document.getElementById('aboutBriefTitle');
        const aboutBriefDesc = document.getElementById('aboutBriefDesc');
        const serviceOneTitle = document.getElementById('serviceOneTitle');
        const serviceOneDesc = document.getElementById('serviceOneDesc');
        const serviceTwoTitle = document.getElementById('serviceTwoTitle');
        const serviceTwoDesc = document.getElementById('serviceTwoDesc');
        const serviceThreeTitle = document.getElementById('serviceThreeTitle');
        const serviceThreeDesc = document.getElementById('serviceThreeDesc');
        const projectOneTitle = document.getElementById('projectOneTitle');
        const projectOneDesc = document.getElementById('projectOneDesc');
        const projectOneMeta = document.getElementById('projectOneMeta');
        const projectTwoTitle = document.getElementById('projectTwoTitle');
        const projectTwoDesc = document.getElementById('projectTwoDesc');
        const projectTwoMeta = document.getElementById('projectTwoMeta');
        const projectThreeTitle = document.getElementById('projectThreeTitle');
        const projectThreeDesc = document.getElementById('projectThreeDesc');
        const projectThreeMeta = document.getElementById('projectThreeMeta');
        const teamOneName = document.getElementById('teamOneName');
        const teamOneRole = document.getElementById('teamOneRole');
        const teamTwoName = document.getElementById('teamTwoName');
        const teamTwoRole = document.getElementById('teamTwoRole');
        const teamThreeName = document.getElementById('teamThreeName');
        const teamThreeRole = document.getElementById('teamThreeRole');

        if (aboutTitle) aboutTitle.textContent = websiteInfo.aboutSectionTitle;
        if (aboutVisionTitle) aboutVisionTitle.textContent = websiteInfo.aboutVisionTitle;
        if (aboutVisionText) aboutVisionText.textContent = websiteInfo.aboutVisionText;
        if (aboutHighlightTitle) aboutHighlightTitle.textContent = websiteInfo.aboutHighlightTitle;
        if (aboutMetricOneValue) aboutMetricOneValue.textContent = websiteInfo.aboutMetricOneValue;
        if (aboutMetricTwoValue) aboutMetricTwoValue.textContent = websiteInfo.aboutMetricTwoValue;
        if (aboutMetricThreeValue) aboutMetricThreeValue.textContent = websiteInfo.aboutMetricThreeValue;
        if (aboutBriefTitle) aboutBriefTitle.textContent = websiteInfo.aboutBriefTitle;
        if (aboutBriefDesc) aboutBriefDesc.textContent = websiteInfo.aboutBriefDesc;
        if (serviceOneTitle) serviceOneTitle.textContent = websiteInfo.serviceOneTitle;
        if (serviceOneDesc) serviceOneDesc.textContent = websiteInfo.serviceOneDesc;
        if (serviceTwoTitle) serviceTwoTitle.textContent = websiteInfo.serviceTwoTitle;
        if (serviceTwoDesc) serviceTwoDesc.textContent = websiteInfo.serviceTwoDesc;
        if (serviceThreeTitle) serviceThreeTitle.textContent = websiteInfo.serviceThreeTitle;
        if (serviceThreeDesc) serviceThreeDesc.textContent = websiteInfo.serviceThreeDesc;
        if (projectOneTitle) projectOneTitle.textContent = websiteInfo.projectOneTitle;
        if (projectOneDesc) projectOneDesc.textContent = websiteInfo.projectOneDesc;
        if (projectOneMeta) projectOneMeta.textContent = websiteInfo.projectOneMeta;
        if (projectTwoTitle) projectTwoTitle.textContent = websiteInfo.projectTwoTitle;
        if (projectTwoDesc) projectTwoDesc.textContent = websiteInfo.projectTwoDesc;
        if (projectTwoMeta) projectTwoMeta.textContent = websiteInfo.projectTwoMeta;
        if (projectThreeTitle) projectThreeTitle.textContent = websiteInfo.projectThreeTitle;
        if (projectThreeDesc) projectThreeDesc.textContent = websiteInfo.projectThreeDesc;
        if (projectThreeMeta) projectThreeMeta.textContent = websiteInfo.projectThreeMeta;
        if (teamOneName) teamOneName.textContent = websiteInfo.teamOneName;
        if (teamOneRole) teamOneRole.textContent = websiteInfo.teamOneRole;
        if (teamTwoName) teamTwoName.textContent = websiteInfo.teamTwoName;
        if (teamTwoRole) teamTwoRole.textContent = websiteInfo.teamTwoRole;
        if (teamThreeName) teamThreeName.textContent = websiteInfo.teamThreeName;
        if (teamThreeRole) teamThreeRole.textContent = websiteInfo.teamThreeRole;

        if (navAboutInput) navAboutInput.value = websiteInfo.navAboutLabel;
        if (navServicesInput) navServicesInput.value = websiteInfo.navServicesLabel;
        if (navProjectsInput) navProjectsInput.value = websiteInfo.navProjectsLabel;
        if (navTeamInput) navTeamInput.value = websiteInfo.navTeamLabel;
        if (navContactInput) navContactInput.value = websiteInfo.navContactLabel;
        if (aboutTitleInput) aboutTitleInput.value = websiteInfo.aboutSectionTitle;
        if (aboutDescInput) aboutDescInput.value = websiteInfo.aboutVisionText;
        if (aboutBriefTitleInput) aboutBriefTitleInput.value = websiteInfo.aboutBriefTitle;
        if (aboutBriefDescInput) aboutBriefDescInput.value = websiteInfo.aboutBriefDesc;
        if (serviceOneTitleInput) serviceOneTitleInput.value = websiteInfo.serviceOneTitle;
        if (serviceOneDescInput) serviceOneDescInput.value = websiteInfo.serviceOneDesc;
        if (serviceTwoTitleInput) serviceTwoTitleInput.value = websiteInfo.serviceTwoTitle;
        if (serviceTwoDescInput) serviceTwoDescInput.value = websiteInfo.serviceTwoDesc;
        if (serviceThreeTitleInput) serviceThreeTitleInput.value = websiteInfo.serviceThreeTitle;
        if (serviceThreeDescInput) serviceThreeDescInput.value = websiteInfo.serviceThreeDesc;
        if (projectOneTitleInput) projectOneTitleInput.value = websiteInfo.projectOneTitle;
        if (projectOneDescInput) projectOneDescInput.value = websiteInfo.projectOneDesc;
        if (projectTwoTitleInput) projectTwoTitleInput.value = websiteInfo.projectTwoTitle;
        if (projectTwoDescInput) projectTwoDescInput.value = websiteInfo.projectTwoDesc;
        if (projectThreeTitleInput) projectThreeTitleInput.value = websiteInfo.projectThreeTitle;
        if (projectThreeDescInput) projectThreeDescInput.value = websiteInfo.projectThreeDesc;
        if (teamOneNameInput) teamOneNameInput.value = websiteInfo.teamOneName;
        if (teamOneRoleInput) teamOneRoleInput.value = websiteInfo.teamOneRole;
        if (teamTwoNameInput) teamTwoNameInput.value = websiteInfo.teamTwoName;
        if (teamTwoRoleInput) teamTwoRoleInput.value = websiteInfo.teamTwoRole;
        if (teamThreeNameInput) teamThreeNameInput.value = websiteInfo.teamThreeName;
        if (teamThreeRoleInput) teamThreeRoleInput.value = websiteInfo.teamThreeRole;

        const imageSource = websiteInfo.brandPhoto || '';
        if (heroImage) heroImage.src = imageSource;
        if (dashboardImage) dashboardImage.src = imageSource;
        if (websitePhotoPreview) websitePhotoPreview.src = imageSource;

        if (heroImage && !imageSource) {
            heroImage.style.display = 'none';
        } else if (heroImage) {
            heroImage.style.display = 'block';
        }

        if (dashboardImage && !imageSource) {
            dashboardImage.style.display = 'none';
        } else if (dashboardImage) {
            dashboardImage.style.display = 'block';
        }
    }

    function canManageAccounts() {
        const roleText = `${userProfile.role || ''} ${userProfile.department || ''}`.toLowerCase();
        return userProfile.canManageAccounts || roleText.includes('admin');
    }

    function canViewEmployeeCredentials() {
        const roleText = `${userProfile.role || ''} ${userProfile.department || ''}`.toLowerCase();
        return roleText.includes('admin') || userProfile.canManageAccounts;
    }

    function refreshAccountAccessUI() {
        const addBtn = document.getElementById('addKaryawanBtn');
        if (addBtn) {
            addBtn.style.display = canManageAccounts() ? 'inline-flex' : 'none';
        }
    }

    function applyAdminOnlyReadOnlyState() {
        const formsToToggle = [
            document.getElementById('websiteInfoForm'),
            document.getElementById('settingsForm'),
            document.getElementById('replyContactForm')
        ];

        const isAdmin = canManageAccounts();

        formsToToggle.forEach((form) => {
            if (!form) return;

            const fields = form.querySelectorAll('input, textarea, select, button');
            fields.forEach((field) => {
                if (field.type === 'submit' || field.tagName.toLowerCase() === 'button') {
                    field.style.display = isAdmin ? '' : 'none';
                } else {
                    field.disabled = !isAdmin;
                }
            });

            if (form.id === 'replyContactForm') {
                const textarea = form.querySelector('textarea');
                if (textarea) {
                    textarea.placeholder = isAdmin ? 'Tulis balasan resmi untuk klien...' : 'Hanya admin yang dapat mengirim balasan.';
                }
            }
        });
    }

    // Trigger sync on page load
    syncWebsiteInfo();
    renderContactStatus();
    renderContactInbox();
    renderAnnouncements();
    refreshAccountAccessUI();
    applyAdminOnlyReadOnlyState();

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
                const normalizedUsername = usernameInput.toLowerCase();
                const adminCredentialsMatch = normalizedUsername === 'admin123' && passwordInput === 'admin321';
                const legacyAdmin = usernameInput === 'admin' && passwordInput === 'password123';
                const matchingAccount = !adminCredentialsMatch && !legacyAdmin ? karyawanList.find(acc => acc.username.toLowerCase() === normalizedUsername && acc.sandi === passwordInput && acc.status && acc.status.toLowerCase() === 'aktif') : null;
                const isAdminAccount = adminCredentialsMatch || legacyAdmin || (matchingAccount && (matchingAccount.role?.toLowerCase() === 'admin' || matchingAccount.canManageAccounts || matchingAccount.departemen?.toLowerCase() === 'admin'));

                if (adminCredentialsMatch || legacyAdmin || isAdminAccount) {
                    userProfile.name = matchingAccount?.nama || 'Administrator';
                    userProfile.email = matchingAccount?.email || 'admin@bakriemetal.co.id';
                    userProfile.role = matchingAccount?.jabatan || matchingAccount?.role || 'Super Admin (Root)';
                    userProfile.department = matchingAccount?.departemen || 'Admin';
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
        renderAttendanceTable();
        syncWebsiteInfo();
        applyAdminOnlyReadOnlyState();
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
    const passwordModal = document.getElementById('passwordModal');
    const closePasswordModalBtn = document.getElementById('closePasswordModalBtn');
    const passwordForm = document.getElementById('passwordForm');
    const passwordEmpNip = document.getElementById('passwordEmpNip');
    const passwordEmployeeName = document.getElementById('passwordEmployeeName');
    const newPasswordInput = document.getElementById('newPasswordInput');
    const passwordStatusText = document.getElementById('passwordStatusText');

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
            const canViewCredentials = canViewEmployeeCredentials();
            tr.innerHTML = `
                <td><strong>${emp.nip}</strong></td>
                <td>${emp.nama}</td>
                <td>${emp.jabatan}</td>
                <td>${emp.departemen}</td>
                <td>${emp.email}</td>
                <td><span class="emp-credential">${canViewCredentials ? emp.username : '••••••'}</span></td>
                <td><span class="emp-credential">${canViewCredentials ? emp.sandi : '••••••'}</span></td>
                <td><span class="emp-status ${statusClass}">${emp.status}</span></td>
                <td>
                    ${canManage ? `
                        <div class="table-actions">
                            <button class="btn-edit" data-nip="${emp.nip}" title="Ubah Password">
                                <i class="fa-solid fa-key"></i>
                            </button>
                            <button class="btn-delete" data-nip="${emp.nip}" title="Hapus Karyawan">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    ` : `<span class="view-only-badge">Hanya lihat</span>`}
                </td>
            `;
            karyawanTableBody.appendChild(tr);
        });

        if (canManageAccounts()) {
            const editButtons = karyawanTableBody.querySelectorAll('.btn-edit');
            editButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const nipToEdit = btn.getAttribute('data-nip');
                    openPasswordModal(nipToEdit);
                });
            });

            const deleteButtons = karyawanTableBody.querySelectorAll('.btn-delete');
            deleteButtons.forEach(btn => {
                btn.addEventListener('click', () => {
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

    function openPasswordModal(nip) {
        if (!canManageAccounts()) {
            alert('Hanya akun HR & Legal yang dapat mengubah atau mengelola data akun karyawan.');
            return;
        }

        const emp = karyawanList.find(item => item.nip === nip);
        if (!emp) return;

        if (passwordEmpNip) passwordEmpNip.value = emp.nip;
        if (passwordEmployeeName) passwordEmployeeName.value = `${emp.nama} (${emp.nip})`;
        if (newPasswordInput) {
            newPasswordInput.value = '';
            newPasswordInput.focus();
        }
        if (passwordStatusText) passwordStatusText.textContent = '';
        if (passwordModal) passwordModal.classList.add('active');
    }

    function closePasswordModal() {
        if (passwordModal) passwordModal.classList.remove('active');
        if (passwordForm) passwordForm.reset();
        if (passwordEmpNip) passwordEmpNip.value = '';
        if (passwordStatusText) passwordStatusText.textContent = '';
    }

    if (closePasswordModalBtn && passwordModal) {
        closePasswordModalBtn.addEventListener('click', () => {
            closePasswordModal();
        });

        passwordModal.addEventListener('click', (e) => {
            if (e.target === passwordModal) {
                closePasswordModal();
            }
        });
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!canManageAccounts()) {
                alert('Hanya akun HR & Legal yang dapat mengubah atau mengelola data akun karyawan.');
                return;
            }

            const nipVal = passwordEmpNip?.value.trim();
            const passwordVal = newPasswordInput?.value.trim();

            if (!nipVal || !passwordVal) {
                if (passwordStatusText) {
                    passwordStatusText.textContent = 'Kata sandi baru wajib diisi.';
                    passwordStatusText.style.color = 'var(--warning)';
                }
                return;
            }

            const emp = karyawanList.find(item => item.nip === nipVal);
            if (!emp) return;

            emp.sandi = passwordVal;
            saveKaryawanList();
            renderKaryawanTable(karyawanSearch.value);

            if (passwordStatusText) {
                passwordStatusText.textContent = `Password berhasil diperbarui untuk ${emp.nama}.`;
                passwordStatusText.style.color = 'var(--success)';
            }

            setTimeout(() => {
                closePasswordModal();
            }, 800);
        });
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
            if (!canManageAccounts()) {
                if (replyStatusText) {
                    replyStatusText.textContent = 'Hanya admin yang dapat mengirim balasan.';
                    replyStatusText.style.color = 'var(--warning)';
                }
                return;
            }

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
    const brandPhotoInput = document.getElementById('brandPhotoInput');

    if (brandPhotoInput) {
        brandPhotoInput.addEventListener('change', (event) => {
            const file = event.target.files && event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                pendingBrandPhoto = reader.result;
                websiteInfo.brandPhoto = pendingBrandPhoto;
                syncWebsiteInfo();
            };
            reader.readAsDataURL(file);
        });
    }

    if (websiteInfoForm) {
        websiteInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!canManageAccounts()) {
                if (websiteAlert) {
                    websiteAlert.style.display = 'flex';
                    websiteAlert.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i><span>Hanya admin yang dapat memperbarui data website.</span>';
                    setTimeout(() => {
                        websiteAlert.style.display = 'none';
                    }, 3000);
                }
                return;
            }

            websiteInfo.heroTitle = document.getElementById('webHeroTitleInput').value.trim();
            websiteInfo.heroDesc = document.getElementById('webHeroDescInput').value.trim();
            websiteInfo.navAboutLabel = document.getElementById('webNavAboutInput').value.trim() || defaultWebsiteInfo.navAboutLabel;
            websiteInfo.navServicesLabel = document.getElementById('webNavServicesInput').value.trim() || defaultWebsiteInfo.navServicesLabel;
            websiteInfo.navProjectsLabel = document.getElementById('webNavProjectsInput').value.trim() || defaultWebsiteInfo.navProjectsLabel;
            websiteInfo.navTeamLabel = document.getElementById('webNavTeamInput').value.trim() || defaultWebsiteInfo.navTeamLabel;
            websiteInfo.navContactLabel = document.getElementById('webNavContactInput').value.trim() || defaultWebsiteInfo.navContactLabel;
            websiteInfo.aboutSectionTitle = document.getElementById('webAboutTitleInput').value.trim() || defaultWebsiteInfo.aboutSectionTitle;
            websiteInfo.aboutVisionText = document.getElementById('webAboutDescInput').value.trim() || defaultWebsiteInfo.aboutVisionText;
            websiteInfo.aboutBriefTitle = document.getElementById('webAboutBriefTitleInput').value.trim() || defaultWebsiteInfo.aboutBriefTitle;
            websiteInfo.aboutBriefDesc = document.getElementById('webAboutBriefDescInput').value.trim() || defaultWebsiteInfo.aboutBriefDesc;
            websiteInfo.serviceOneTitle = document.getElementById('webServiceOneTitleInput').value.trim() || defaultWebsiteInfo.serviceOneTitle;
            websiteInfo.serviceOneDesc = document.getElementById('webServiceOneDescInput').value.trim() || defaultWebsiteInfo.serviceOneDesc;
            websiteInfo.serviceTwoTitle = document.getElementById('webServiceTwoTitleInput').value.trim() || defaultWebsiteInfo.serviceTwoTitle;
            websiteInfo.serviceTwoDesc = document.getElementById('webServiceTwoDescInput').value.trim() || defaultWebsiteInfo.serviceTwoDesc;
            websiteInfo.serviceThreeTitle = document.getElementById('webServiceThreeTitleInput').value.trim() || defaultWebsiteInfo.serviceThreeTitle;
            websiteInfo.serviceThreeDesc = document.getElementById('webServiceThreeDescInput').value.trim() || defaultWebsiteInfo.serviceThreeDesc;
            websiteInfo.projectOneTitle = document.getElementById('webProjectOneTitleInput').value.trim() || defaultWebsiteInfo.projectOneTitle;
            websiteInfo.projectOneDesc = document.getElementById('webProjectOneDescInput').value.trim() || defaultWebsiteInfo.projectOneDesc;
            websiteInfo.projectTwoTitle = document.getElementById('webProjectTwoTitleInput').value.trim() || defaultWebsiteInfo.projectTwoTitle;
            websiteInfo.projectTwoDesc = document.getElementById('webProjectTwoDescInput').value.trim() || defaultWebsiteInfo.projectTwoDesc;
            websiteInfo.projectThreeTitle = document.getElementById('webProjectThreeTitleInput').value.trim() || defaultWebsiteInfo.projectThreeTitle;
            websiteInfo.projectThreeDesc = document.getElementById('webProjectThreeDescInput').value.trim() || defaultWebsiteInfo.projectThreeDesc;
            websiteInfo.teamOneName = document.getElementById('webTeamOneNameInput').value.trim() || defaultWebsiteInfo.teamOneName;
            websiteInfo.teamOneRole = document.getElementById('webTeamOneRoleInput').value.trim() || defaultWebsiteInfo.teamOneRole;
            websiteInfo.teamTwoName = document.getElementById('webTeamTwoNameInput').value.trim() || defaultWebsiteInfo.teamTwoName;
            websiteInfo.teamTwoRole = document.getElementById('webTeamTwoRoleInput').value.trim() || defaultWebsiteInfo.teamTwoRole;
            websiteInfo.teamThreeName = document.getElementById('webTeamThreeNameInput').value.trim() || defaultWebsiteInfo.teamThreeName;
            websiteInfo.teamThreeRole = document.getElementById('webTeamThreeRoleInput').value.trim() || defaultWebsiteInfo.teamThreeRole;
            websiteInfo.phone = document.getElementById('webPhoneInput').value.trim();
            websiteInfo.email = document.getElementById('webEmailInput').value.trim();
            websiteInfo.address = document.getElementById('webAddressInput').value.trim();
            websiteInfo.brandPhoto = pendingBrandPhoto || websiteInfo.brandPhoto || '';
            websiteInfo.dashboardBrandTitle = document.getElementById('dashboardBrandTitle')?.textContent || websiteInfo.dashboardBrandTitle;
            websiteInfo.dashboardBrandDesc = document.getElementById('dashboardBrandDesc')?.textContent || websiteInfo.dashboardBrandDesc;

            saveWebsiteInfo();
            syncWebsiteInfo();

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
            if (!canManageAccounts()) {
                if (settingsAlert) {
                    settingsAlert.style.display = 'flex';
                    settingsAlert.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i><span>Hanya admin yang dapat mengubah profil.</span>';
                    setTimeout(() => {
                        settingsAlert.style.display = 'none';
                    }, 3000);
                }
                return;
            }

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

    // ================= INTERNAL ANNOUNCEMENTS =================
    const announcementForm = document.getElementById('announcementForm');

    if (announcementForm) {
        announcementForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('announcementTitleInput').value.trim();
            const badge = document.getElementById('announcementBadgeInput').value.trim();
            const body = document.getElementById('announcementBodyInput').value.trim();

            if (!title || !badge || !body) {
                return;
            }

            announcements.unshift({
                id: `ann-${Date.now()}`,
                title,
                badge,
                body,
                date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            });
            saveAnnouncements();
            renderAnnouncements();
            announcementForm.reset();
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
