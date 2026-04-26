
        /* ========================================
           DATA CONFIGURATION
           ======================================== */
        const hospitalStaff = [
            "Dr. Suhailiza",
            "Dr. Cassie",
            "Dr. Qurratul",
            "Dr. Houris",
            "Syirin",
            "Ainina",
            "Hardiff",
            "Najihah",
            "Parwaiz",
            "Haslina"
        ];

        const kerjaTypes = ["Kerja Penuh", "Separuh Hari", "WRD", "WPH"];
        const cutiTypes = ["RD", "PH", "X", "AL", "MC", "RL", "EL", "CE"];

        const sections = [
            "Children's World",
            "Show Amphitheatre",
            "Bear Complex",
            "Reptile",
            "Savannah",
            "Mammal Kingdom 1",
            "Ape Centre",
            "Carnivore",
            "Mammal Kingdom 2",
            "Gajah",
            "Bird House",
            "Hoof",
            "Panda Complex",
            "Biodiversity Garden",
            "Aquarium",
            "Indian Gaur/Capybara",
            "Holding Centre"
        ];

        /* ========================================
           STAFF TABLE FUNCTIONS
           ======================================== */
        /**
         * Load hospital staff attendance table
         */
        function loadHospitalStaff() {
            let table = `
                <table>
                    <tr>
                        <th>Staff</th>
                        <th>Status</th>
                        <th>Butiran</th>
                    </tr>
            `;

            hospitalStaff.forEach((staff, i) => {
                table += `
                    <tr id="staffRow_${i}" class="row-incomplete">
                        <td style="text-align: left; font-weight: bold;">${staff}</td>
                        <td>
                            <select id="status_${i}" onchange="toggleStatus(${i}); updateStaffRow(${i})">
                                <option value="">Pilih</option>
                                <option value="Kerja">Kerja</option>
                                <option value="Cuti">Cuti</option>
                            </select>
                        </td>
                        <td>
                            <select id="kerja_${i}" onchange="updateStaffRow(${i})" style="display: none;">
                                <option value="">Pilih</option>
                                ${kerjaTypes.map(t => `<option>${t}</option>`).join('')}
                            </select>
                            <select id="cuti_${i}" onchange="updateStaffRow(${i})" style="display: none;">
                                <option value="">Pilih</option>
                                ${cutiTypes.map(t => `<option>${t}</option>`).join('')}
                            </select>
                        </td>
                    </tr>
                `;
            });

            table += "</table>";
            document.getElementById("hospitalStaffTable").innerHTML = table;
        }

        /**
         * Toggle between Kerja and Cuti options
         */
        function toggleStatus(i) {
            const status = document.getElementById(`status_${i}`).value;
            const kerjaSelect = document.getElementById(`kerja_${i}`);
            const cutiSelect = document.getElementById(`cuti_${i}`);

            kerjaSelect.style.display = status === "Kerja" ? "block" : "none";
            cutiSelect.style.display = status === "Cuti" ? "block" : "none";

            if (status === "") {
                kerjaSelect.value = "";
                cutiSelect.value = "";
            }
        }

        /**
         * Update staff row color based on completion status
         */
        function updateStaffRow(i) {
            const row = document.getElementById(`staffRow_${i}`);
            const status = document.getElementById(`status_${i}`).value;
            const kerja = document.getElementById(`kerja_${i}`).value;
            const cuti = document.getElementById(`cuti_${i}`).value;

            row.classList.remove("row-complete", "row-incomplete");

            let isComplete = false;
            if (status === "Kerja" && kerja !== "") isComplete = true;
            if (status === "Cuti" && cuti !== "") isComplete = true;

            row.classList.add(isComplete ? "row-complete" : "row-incomplete");
        }

        /* ========================================
           RAWATAN TABLE FUNCTIONS
           ======================================== */
        /**
         * Add new rawatan (treatment) row to table
         */
        function addRawatanRow() {
            const tbody = document.querySelector("#rawatanTable tbody");
            const row = tbody.insertRow();

            row.innerHTML = `
                <td></td>
                <td>
                    <select required>
                        <option value="">Pilih</option>
                        ${sections.map(s => `<option>${s}</option>`).join('')}
                    </select>
                </td>
                <td><input type="text" placeholder="Species" required></td>
                <td>
                    <select>
                        <option>-</option>
                        <option>Jantan</option>
                        <option>Betina</option>
                        <option>Unknown</option>
                    </select>
                </td>
                <td><input type="text" placeholder="ID / House Name"></td>
                <td>
                    <select required>
                        <option value="">Pilih</option>
                        <option>Rawatan</option>
                        <option>Checkup</option>
                        <option>Kecemasan</option>
                    </select>
                </td>
                <td><input type="text" placeholder="Contoh: suntikan antibiotik, pemeriksaan luka"></td>
            `;

            updateNumbers("#rawatanTable");
        }

        /* ========================================
           HAIWAN TABLE FUNCTIONS
           ======================================== */
        /**
         * Add new haiwan (animal) row to table
         */
        function addHaiwanRow() {
            const tbody = document.querySelector("#haiwanTable tbody");
            const row = tbody.insertRow();

            row.innerHTML = `
                <td></td>
                <td>
                    <select required>
                        <option value="">Pilih</option>
                        <option>Adm.</option>
                        <option>D/C</option>
                        <option>Kematian</option>
                    </select>
                </td>
                <td><input type="text" placeholder="Spesies" required></td>
                <td>
                    <select>
                        <option>-</option>
                        <option>Jantan</option>
                        <option>Betina</option>
                        <option>Unknown</option>
                    </select>
                </td>
                <td><input type="text" placeholder="ID / House Name"></td>
                <td>
                    <select onchange="this.nextElementSibling.style.display=(this.value==='External'?'block':'none')" required>
                        <option value="">Pilih</option>
                        ${sections.map(s => `<option>${s}</option>`).join('')}
                        <option>External</option>
                    </select>
                    <input type="text" placeholder="Nyatakan External" style="display: none; margin-top: 5px;">
                </td>
                <td><input type="text" placeholder="Contoh: keadaan klinikal, rawatan, respon haiwan"></td>
            `;

            updateNumbers("#haiwanTable");
        }

        /* ========================================
           POST MORTEM TABLE FUNCTIONS
           ======================================== */
        /**
         * Add new post mortem row to table
         */
        function addPostMortemRow() {
            const tbody = document.querySelector("#postMortemTable tbody");
            const row = tbody.insertRow();

            row.innerHTML = `
                <td></td>
                <td>
                    <select required>
                        <option value="">Pilih</option>
                        ${sections.map(s => `<option>${s}</option>`).join('')}
                    </select>
                </td>
                <td><input type="text" placeholder="Spesies" required></td>
                <td>
                    <select>
                        <option>-</option>
                        <option>Jantan</option>
                        <option>Betina</option>
                        <option>Unknown</option>
                    </select>
                </td>
                <td><input type="text" placeholder="ID / House Name"></td>
                <td>
                    <select required>
                        <option value="">Pilih</option>
                        <option>Post Mortem</option>
                        <option>Sebab Kematian</option>
                        <option>Autopsy</option>
                    </select>
                </td>
                <td><input type="text" placeholder="Contoh: keadaan sebelum kematian, sebab disyaki, pemerhatian post mortem"></td>
            `;

            updateNumbers("#postMortemTable");
        }

        /* ========================================
           TABLE UTILITY FUNCTIONS
           ======================================== */
        /**
         * Update row numbers in all tables
         */
        function updateNumbers(tableId) {
            const rows = document.querySelectorAll(`${tableId} tbody tr`);
            rows.forEach((row, i) => {
                row.cells[0].innerText = i + 1;
            });
        }

        /* ========================================
           TEXT FORMATTING FUNCTIONS
           ======================================== */
        /**
         * Auto-number kerja entries
         */
        function autoNumberKerja(el) {
            let lines = el.value.split("\n");

            for (let i = 0; i < lines.length; i++) {
                // Remove existing numbering
                lines[i] = lines[i].replace(/^\d+\.\s*/, "");

                // Add new numbering if line is not empty
                if (lines[i].trim() !== "") {
                    lines[i] = (i + 1) + ". " + lines[i];
                }
            }

            el.value = lines.join("\n");
        }

        /* ========================================
           SUBMISSION FUNCTIONS
           ======================================== */
       /**
 * Validate and submit report
 */
function submitReport() {
    const date = document.getElementById("hospitalDate").value;
    const penghantar = document.getElementById("penghantarHospital").value;

    if (!date) {
        alert("❌ Sila isi Tarikh");
        return;
    }

    if (!penghantar) {
        alert("❌ Sila pilih Penghantar");
        return;
    }

    if (confirm("✅ Hantar laporan sekarang?")) {
        console.log("📤 Laporan dalam hantar...");
        
        const reportData = {
            source: "hospital",  // ⭐ IMPORTANT - tells Apps Script which handler to use
            date,
            penghantar,
            staffData: getHospitalStaff(),
            rawatanData: getRawatanData(),
            haiwanData: getHaiwanData(),
            postMortemData: getPostMortemData(),
            kerjaTambahan: document.getElementById("laporanKerja").value || ""
        };

        console.log("📋 Data yang dihantar:", reportData); // ✅ SEE WHAT YOU'RE SENDING

        const scriptUrl = "https://script.google.com/macros/s/AKfycbyNBmZRWWFtMvja_03TDnZhvrn6hvNeuqreSl_KvTYz1vg_IdvsIt-D8ghJFkanwBvrrw/exec";

fetch("https://script.google.com/macros/s/AKfycbyNBmZRWWFtMvja_03TDnZhvrn6hvNeuqreSl_KvTYz1vg_IdvsIt-D8ghJFkanwBvrrw/exec", {
    method: "POST",
    body: JSON.stringify(reportData)
})
.then(res => res.text())
.then(result => {
    console.log("RAW RESPONSE:", result);

    try {
        const parsed = JSON.parse(result);

        if (parsed.status === "success") {
            alert("✅ Laporan Berjaya Dihantar ke Server");
        } else {
            alert("❌ Error: " + parsed.message);
        }
    } catch (e) {
        console.log("Parse error:", e);
        alert("⚠️ Response diterima tapi format tak jelas");
    }
})
.catch(error => {
    console.error("❌ Fetch Error:", error);
    alert("❌ Gagal menghantar laporan:\n" + error.message);
});

    }
}

/**
 * Get staff data from hospital staff table
 */
function getHospitalStaff() {
    const staffData = [];
    
    hospitalStaff.forEach((staff, i) => {
        const status = document.getElementById(`status_${i}`).value;
        const kerja = document.getElementById(`kerja_${i}`).value;
        const cuti = document.getElementById(`cuti_${i}`).value;
        
        if (status) {
            staffData.push({
                staff: staff,
                status: status,
                kerja: kerja || "",
                cuti: cuti || ""
            });
        }
    });
    
    return staffData;
}

/**
 * Get rawatan data from treatment table
 */
function getRawatanData() {
    const rawatanData = [];
    const rows = document.querySelectorAll("#rawatanTable tbody tr");
    
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells[1].querySelector("select").value) { // Check if section is filled
            rawatanData.push({
                section: cells[1].querySelector("select").value,
                species: cells[2].querySelector("input").value,
                jantina: cells[3].querySelector("select").value,
                id: cells[4].querySelector("input").value,
                jenis: cells[5].querySelector("select").value,
                catatan: cells[6].querySelector("input").value
            });
        }
    });
    
    return rawatanData;
}

/**
 * Get haiwan data from animal table
 */
function getHaiwanData() {
    const haiwanData = [];
    const rows = document.querySelectorAll("#haiwanTable tbody tr");
    
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const laporan = cells[1].querySelector("select").value;
        if (laporan) { // Check if laporan type is filled
            const sectionSelect = cells[5].querySelector("select");
            const externalInput = cells[5].querySelector("input");
            let section = sectionSelect.value;
            let external = "";
            
            if (section === "External") {
                external = externalInput.value;
            }
            
            haiwanData.push({
                laporan: laporan,
                species: cells[2].querySelector("input").value,
                jantina: cells[3].querySelector("select").value,
                id: cells[4].querySelector("input").value,
                section: section,
                external: external,
                catatan: cells[6].querySelector("input").value
            });
        }
    });
    
    return haiwanData;
}

/**
 * Get post mortem data from table
 */
function getPostMortemData() {
    const postMortemData = [];
    const rows = document.querySelectorAll("#postMortemTable tbody tr");
    
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells[1].querySelector("select").value) { // Check if section is filled
            postMortemData.push({
                section: cells[1].querySelector("select").value,
                species: cells[2].querySelector("input").value,
                jantina: cells[3].querySelector("select").value,
                id: cells[4].querySelector("input").value,
                jenis: cells[5].querySelector("select").value,
                catatan: cells[6].querySelector("input").value
            });
        }
    });
    
    return postMortemData;
}

        /* ========================================
           INITIALIZATION
           ======================================== */
        /**
         * Initialize page on load
         */
        window.onload = () => {
            console.log("🚀 Hospital Report System Started");
            
            loadHospitalStaff();
            addRawatanRow();
            addHaiwanRow();
            addPostMortemRow();

            console.log("✅ All sections loaded");
        };
