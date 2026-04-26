        /* ========================================
           🔧 DATA CONFIGURATION
           ======================================== */
        const enrichmentStaff = ["Fikri", "Auni", "Amirah", "Syakirin"];
        const kerjaTypes = ["Kerja Penuh", "Separuh Hari", "WRD", "WPH"];
        const cutiTypes = ["RD", "PH", "X", "AL", "MC", "RL", "EL", "CE"];
        const sections = [
            "Children's World", "Show Amphitheatre", "Bear Complex", "Reptile",
            "Savannah", "Mammal Kingdom 1", "Ape Centre", "Carnivore",
            "Mammal Kingdom 2", "Gajah", "Bird House", "Hoof", "Panda Complex",
            "Biodiversity Garden", "Aquarium", "Holding Centre"
        ];
        const enrichmentTypes = [
            "Sensory",
            "Food (Nutritional)",
            "Cognitive",
            "Physical (Structural)",
            "Social"
        ];

        /* ========================================
           📊 STAFF TABLE FUNCTIONS
           ======================================== */

        /**
         * 🔄 Load Staff Attendance Table
         * Generates table with all enrichment staff and status dropdowns
         */
        function loadTable() {
            let table = `
            <table>
                <thead>
                    <tr>
                        <th>Staff</th>
                        <th>Status</th>
                        <th>Butiran</th>
                    </tr>
                </thead>
                <tbody>`;

            enrichmentStaff.forEach((staff, i) => {
                table += `
                <tr id="row_${i}" class="row-incomplete">
                    <td style="font-weight: 700;">${staff}</td>
                    <td style="text-align: center;">
                        <select 
                            id="status_${i}" 
                            onchange="toggleStatus(${i}); updateRowColor(${i})"
                            style="width: 100%;"
                        >
                            <option value="">Pilih</option>
                            <option value="Kerja">Kerja</option>
                            <option value="Cuti">Cuti</option>
                        </select>
                    </td>
                    <td>
                        <select 
                            id="kerja_${i}" 
                            onchange="updateRowColor(${i})" 
                            style="display: none; width: 100%;"
                        >
                            <option value="">Pilih Jenis</option>
                            ${kerjaTypes.map(t => `<option>${t}</option>`).join('')}
                        </select>
                        <select 
                            id="cuti_${i}" 
                            onchange="updateRowColor(${i})" 
                            style="display: none; width: 100%;"
                        >
                            <option value="">Pilih Jenis</option>
                            ${cutiTypes.map(t => `<option>${t}</option>`).join('')}
                        </select>
                    </td>
                </tr>`;
            });

            table += `
                </tbody>
            </table>`;
            document.getElementById("enrichmentTable").innerHTML = table;
        }

        /**
         * 🔀 Toggle Status Dropdowns
         * Shows/hides kerja or cuti dropdowns based on status selection
         * @param {number} i - Staff index
         */
        function toggleStatus(i) {
            const status = document.getElementById(`status_${i}`).value;
            const kerjaSelect = document.getElementById(`kerja_${i}`);
            const cutiSelect = document.getElementById(`cuti_${i}`);

            kerjaSelect.style.display = status === "Kerja" ? "block" : "none";
            cutiSelect.style.display = status === "Cuti" ? "block" : "none";

            // Reset selections
            kerjaSelect.value = "";
            cutiSelect.value = "";
        }

        /**
         * 🎨 Update Row Color Based on Completion
         * Green = complete (status + detail filled)
         * Red = incomplete (missing details)
         * @param {number} i - Staff index
         */
        function updateRowColor(i) {
            const row = document.getElementById(`row_${i}`);
            const status = document.getElementById(`status_${i}`).value;
            const kerja = document.getElementById(`kerja_${i}`).value;
            const cuti = document.getElementById(`cuti_${i}`).value;

            const isComplete = (status === "Kerja" && kerja) || (status === "Cuti" && cuti);

            row.classList.remove("row-complete", "row-incomplete");
            row.classList.add(isComplete ? "row-complete" : "row-incomplete");
        }

        /* ========================================
           🎭 ENRICHMENT REPORT FUNCTIONS
           ======================================== */

        /**
         * ➕ Add New Enrichment Report Row
         * Adds dynamic row to enrichment report table
         */
        function addEnrichmentRow() {
            const table = document.getElementById("enrichmentReportTable");
            const tbody = table.querySelector("tbody");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="text-center" style="font-weight: 600;"></td>
                <td>
                    <input type="text" placeholder="Nama spesis haiwan">
                </td>
                <td>
                    <select>
                        <option value="">Pilih Seksyen</option>
                        ${sections.map(s => `<option>${s}</option>`).join('')}
                    </select>
                </td>
                <td>
                    <select>
                        <option value="">Pilih Jenis</option>
                        ${enrichmentTypes.map(t => `<option>${t}</option>`).join('')}
                    </select>
                </td>
                <td>
                    <input type="text" placeholder="Pemerhatian tingkah laku & respon">
                </td>
                <td style="text-align: center;">
                    <button class="btn btn-delete" onclick="removeEnrichmentRow(this)" title="Padam baris ini">
                        ✕
                    </button>
                </td>
            `;

            tbody.appendChild(row);
            updateEnrichmentNumbers();
        }

        /**
         * 🗑️ Remove Enrichment Report Row
         * Removes row and updates numbering
         * @param {HTMLElement} btn - Delete button element
         */
        function removeEnrichmentRow(btn) {
            if (confirm("Adakah anda pasti ingin memadam baris ini?")) {
                btn.closest("tr").remove();
                updateEnrichmentNumbers();
            }
        }

        /**
         * 🔢 Update Enrichment Report Numbers
         * Auto-numbers all rows in enrichment report
         */
        function updateEnrichmentNumbers() {
            const rows = document.querySelectorAll("#enrichmentReportTable tbody tr");
            rows.forEach((row, i) => {
                row.children[0].innerText = i + 1;
            });
        }

        /* ========================================
           📝 WORK REPORT FUNCTIONS
           ======================================== */

        /**
         * 🔄 Toggle OT Input Field
         * Enables/disables OT remarks input based on checkbox
         */
        function toggleOTInput() {
            const checkbox = document.getElementById("otCheck");
            const input = document.getElementById("otCatatan");
            input.disabled = !checkbox.checked;
            if (!checkbox.checked) {
                input.value = "";
            } else {
                input.focus();
            }
        }

        /**
         * 📋 Auto-Number List
         * Automatically numbers textarea items (1. 2. 3. etc)
         * @param {HTMLElement} el - Textarea element
         */
        function autoNumberList(el) {
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
           ✅ FORM SUBMISSION FUNCTIONS
           ======================================== */

        /**
         * ✅ Validate Form & Submit
         * Checks all required fields before submission
         */
        function submitEnrichment() {
            // Validate required fields
            const date = document.getElementById("date").value;
            const penghantar = document.getElementById("penghantarDropBox").value;

            if (!date) {
                alert("❌ Sila pilih tarikh!");
                return;
            }

            if (!penghantar) {
                alert("❌ Sila pilih penghantar!");
                return;
            }

            // Validate OT if checked
            const otChecked = document.getElementById("otCheck").checked;
            const otCatatan = document.getElementById("otCatatan").value.trim();

            if (otChecked && otCatatan === "") {
                alert("❌ Sila isi catatan untuk Kerja Lebih Masa!");
                document.getElementById("otCatatan").focus();
                return;
            }

            // Confirm submission
            if (!confirm("✅ Adakah anda pasti ingin menghantar laporan ini?")) {
                return;
            }

            // Prepare data for submission
           const reportData = {
    source: "enrichment",   // ⭐ IMPORTANT (THIS TRIGGERS YOUR APPS SCRIPT ROUTE)
    date: date,
    penghantar: penghantar,
    staffData: collectStaffData(),
    enrichmentReports: collectEnrichmentReports(),
    otChecked: otChecked,
    otCatatan: otCatatan,
    lainLain: document.getElementById("lainLain").value,
    timestamp: new Date().toLocaleString('ms-MY')
};

console.log("📊 Enrichment Data:", reportData);

// SEND TO GOOGLE SHEETS
sendToGoogleSheets(reportData);
}

        /**
         * 👥 Collect Staff Data
         * Gathers all staff attendance and status information
         * @returns {Array} Array of staff data objects
         */
        function collectStaffData() {
            const staffData = [];

            enrichmentStaff.forEach((staff, i) => {
                const status = document.getElementById(`status_${i}`).value;
                const kerja = document.getElementById(`kerja_${i}`).value;
                const cuti = document.getElementById(`cuti_${i}`).value;

                staffData.push({
                    name: staff,
                    status: status,
                    kerjaType: kerja,
                    cutiType: cuti
                });
            });

            return staffData;
        }

        /**
         * 🎭 Collect Enrichment Reports
         * Gathers all enrichment activity records
         * @returns {Array} Array of enrichment report objects
         */
        function collectEnrichmentReports() {
            const reports = [];
            const rows = document.querySelectorAll("#enrichmentReportTable tbody tr");

            rows.forEach((row, i) => {
                const cells = row.querySelectorAll("td input, td select");

                // Skip if row is completely empty
                if (cells[0].value === "" && cells[1].value === "" && cells[2].value === "") {
                    return;
                }

                reports.push({
                    no: i + 1,
                    spesis: cells[0].value,
                    seksyen: cells[1].value,
                    jenisEnrichment: cells[2].value,
                    catatan: cells[3].value
                });
            });

            return reports;
        }

        /**
         * 📤 Send Data to Google Sheets (Optional)
         * Uncomment and add your Google Script URL to enable
         * @param {Object} data - Report data to send
         */
        
        /* ========================================
           🔄 INITIALIZE ON PAGE LOAD
           ======================================== */
        window.onload = function () {
            console.log("🌿 Enrichment Centre Report System Loaded");
            loadTable();
            addEnrichmentRow();
        };

const scriptUrl = "https://script.google.com/macros/s/AKfycbxTq8tU5qEnc4ulfvypphkY0ziyLpZkNnJPsZH9RBaQ27iDqWl0RAMVHlf4BqK0Z2gwwA/exec";

function sendToGoogleSheets(reportData) {
    console.log("📤 Sending data:", reportData);
    
    fetch(scriptUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"  // ⬅️ Changed from application/json
        },
        body: JSON.stringify(reportData)
    })
    .then(res => res.text())  // ⬅️ Changed from res.json()
    .then(result => {
        console.log("✅ Server response:", result);
        try {
            const parsed = JSON.parse(result);
            if (parsed.status === "success") {
                alert("✅ Laporan Enrichment berjaya dihantar!");
                // location.reload();
            } else {
                alert("❌ Gagal hantar data: " + (parsed.message || "Unknown error"));
            }
        } catch (e) {
            console.error("Response parse error:", e);
            alert("✅ Data telah dihantar (Response ambiguous)");
        }
    })
    .catch(err => {
        console.error("❌ Fetch error:", err);
        alert("❌ Ralat sambungan ke server:\n" + err.message);
    });
}
