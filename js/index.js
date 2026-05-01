    /* ============================================
       CONFIGURATION DATA
       ============================================ */

    const staffBySection = {
      "Children's World": ["Dewi", "Edie", "Alfain", "Aizuddin", "Idzuan", "Luqman", "Imran"],
      "Show Amphitheatre": ["Firdaus Samad", "Fauzi", "Saparizal", "Dinesh", "Faiz", "Hazmi"],
      "Bear Complex": ["Akmal Hadi", "Noor Azman", "Zul Hafiz", "Adib", "Rais", "Al-Baqir"],
      "Reptile": ["M. Hamdan", "Taufik", "Zambri", "Hafizi", "Arif", "Hazrul", "Amir"],
      "Savannah": ["M. Hamdan", "Mohd Fitri", "Ridwan", "Syaza", "Radhi", "Saiful"],
      "Mammal Kingdom 1": ["Hamdan Hamid", "Gunasegar", "Muhammad MD", "Anuar", "Syazwan", "Alif", "Shah"],
      "Ape Centre": ["Shariff", "Mohd Azman", "Mohd Amin", "Syafiei", "Hasrol"],
      "Carnivore": ["Yusrizan", "Azizul", "Adib Hakim", "Fayyadh", "Ashraf"],
      "Mammal Kingdom 2": ["Fairul", "Amirul"],
      "Gajah": ["M. Efffendi", "Abd Halim", "Rohaizad"],
      "Bird House": ["Ahmad Shazrul", "Choirul", "Amirul", "Wafiuddin", "Rafiq", "Shamil", "Afizzul", "Adha", "Syahidullah"],
      "Hoof": ["Azrennizam", "Zikri", "Farhan"],
      "Panda Complex": ["Humaira", "Saiffulah", "Farid", "Darussaleh", "Zharfan"],
      "Biodiversity Garden": ["Syahidah", "Firdaus", "Mimi Aina", "Syahirah", "Azham"],
      "Aquarium": ["Mohd Safuan", "A. Sirajudin", "Hamzah", "Haidrol Azmi", "Kalaivanni", "Shauqi"],
      "Indian Gaur/Capybara": ["Aminuddin", "Azlan"],
      "Holding Centre": ["Hazlie", "Nizar", "Ariff"],
    };

    const cutiTypes = ["RD", "PH", "X", "AL", "MC", "RL", "EL", "CE"];
    const kerjaTypes = ["Kerja Penuh", "Separuh Hari", "WRD", "WPH"];
    const zooSections = [
      "Children's World", "Show Amphitheatre", "Bear Complex", "Reptile", "Savannah",
      "Mammal Kingdom 1", "Ape Centre", "Carnivore", "Mammal Kingdom 2", "Gajah",
      "Bird House", "Hoof", "Panda Complex", "Biodiversity Garden", "Aquarium",
      "Indian Gaur/Capybara", "Holding Centre", "Enrichment Centre", "Hospital", "External"
    ];

    /* ============================================
       STAFF TABLE FUNCTIONS
       ============================================ */

    function updateSubmitterAndTable() {
      const section = document.getElementById("section").value;

      // CHECK FOR SPECIAL SECTIONS
      if (section === "Hospital") {
        const password = prompt("🔒 Masukkan kata laluan:");
        if (password === "78910") {
          window.location.href = "hospital.html";
        } else {
          alert("❌ Kata laluan salah!");
          document.getElementById("section").value = "";
        }
        return;
      }

      if (section === "Enrichment Centre") {
        const go = confirm("🔔 Anda akan pergi ke halaman Enrichment Attendance. Teruskan?");
        if (go) {
          window.location.href = "enrichment.html";
        } else {
          document.getElementById("section").value = "";
        }
        return;
      }

      const submitter = document.getElementById("submitter");
      const div = document.getElementById("staffTableDiv");

      submitter.innerHTML = "";
      div.innerHTML = "";

      if (!section) return;

      // POPULATE SUBMITTER DROPDOWN
      staffBySection[section].forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.text = name;
        submitter.appendChild(option);
      });

      // BUILD STAFF TABLE
      let table = `<table>
        <thead>
          <tr>
            <th>Kakitangan</th>
            <th style="text-align: center;">Status</th>
            <th>Butiran</th>
          </tr>
        </thead>
        <tbody>`;

      staffBySection[section].forEach((staff, i) => {
        table += `
          <tr id="row_${i}">
            <td>${staff}</td>
            <td style="text-align: center;">
              <select id="status_${i}" onchange="toggleStatus(${i})">
                <option value="">Pilih</option>
                <option value="Kerja">Kerja</option>
                <option value="Cuti">Cuti</option>
              </select>
            </td>
            <td>
              <select id="kerja_${i}" style="display: none;" onchange="updateRowColor(${i})">
                <option value="">Pilih</option>
                ${kerjaTypes.map(t => `<option>${t}</option>`).join('')}
              </select>
              <select id="cuti_${i}" style="display: none;" onchange="updateRowColor(${i})">
                <option value="">Pilih</option>
                ${cutiTypes.map(t => `<option>${t}</option>`).join('')}
              </select>
            </td>
          </tr>`;
      });

      table += `</tbody></table>`;
      div.innerHTML = table;

      // UPDATE ROW COLORS
      staffBySection[section].forEach((_, i) => updateRowColor(i));
    }

    function toggleStatus(index) {
      const status = document.getElementById(`status_${index}`).value;
      const kerja = document.getElementById(`kerja_${index}`);
      const cuti = document.getElementById(`cuti_${index}`);

      kerja.style.display = status === "Kerja" ? "inline-block" : "none";
      cuti.style.display = status === "Cuti" ? "inline-block" : "none";
      updateRowColor(index);
    }

    function updateRowColor(index) {
      const row = document.getElementById(`row_${index}`);
      const status = document.getElementById(`status_${index}`).value;
      const kerja = document.getElementById(`kerja_${index}`).value;
      const cuti = document.getElementById(`cuti_${index}`).value;

      row.classList.remove("row-complete", "row-incomplete");

      let isComplete = false;
      if (status === "Kerja" && kerja) isComplete = true;
      if (status === "Cuti" && cuti) isComplete = true;

      row.classList.add(isComplete ? "row-complete" : "row-incomplete");
    }

    /* ============================================
       LAPORAN HAIWAN (ANIMAL REPORT) FUNCTIONS
       ============================================ */

    let animalCount = 0;

    function addAnimalEntry() {
      const container = document.getElementById("animalReportContainer");
      const div = document.createElement("div");
      div.className = "entry-card";
      div.id = `animal_${animalCount}`;

      div.innerHTML = `
        <div class="entry-header">
          <select id="laporan_${animalCount}" onchange="toggleFromTo(${animalCount})" style="flex: 1; min-width: 150px;">
            <option value="">Jenis Laporan</option>
            <option value="Kelahiran/Penetasan">Kelahiran</option>
            <option value="Kematian">Kematian</option>
            <option value="Terlepas">Terlepas</option>
            <option value="Kemasukan">Kemasukan</option>
            <option value="Pemindahan">Pemindahan</option>
          </select>
          <button type="button" class="delete-btn" onclick="removeAnimalEntry(${animalCount})">Padam</button>
        </div>

        <div class="grid-2">
          <input id="species_${animalCount}" placeholder="Spesies">
          <input id="kandang_${animalCount}" placeholder="Kandang">

          <select id="bilangan_${animalCount}">
            <option value="">Bilangan</option>
            ${Array.from({ length: 100 }, (_, i) => `<option>${i + 1}</option>`).join('')}
          </select>

          <select id="jantina_${animalCount}">
            <option value="">Jantina</option>
            <option>Jantan</option>
            <option>Betina</option>
            <option>Unknown</option>
          </select>

          <select id="fromTo_${animalCount}" onchange="toggleExternal(${animalCount})" style="display: none;">
            <option value="">Dari/Ke</option>
            ${zooSections.map(s => `<option>${s}</option>`).join('')}
          </select>

          <input id="external_${animalCount}" placeholder="Pihak Luar" style="display: none;">
        </div>

        <textarea id="catatan_${animalCount}" placeholder="ID Haiwan / Info Tambahan" style="margin-top: 10px;"></textarea>
      `;

      container.appendChild(div);
      animalCount++;
    }

    function toggleFromTo(index) {
      const val = document.getElementById(`laporan_${index}`).value;
      const fromTo = document.getElementById(`fromTo_${index}`);

      if (val === "Kemasukan" || val === "Pemindahan") {
        fromTo.style.display = "block";
      } else {
        fromTo.style.display = "none";
        document.getElementById(`external_${index}`).style.display = "none";
      }
    }

    function toggleExternal(index) {
      const val = document.getElementById(`fromTo_${index}`).value;
      document.getElementById(`external_${index}`).style.display = val === "External" ? "block" : "none";
    }

    function removeAnimalEntry(index) {
      document.getElementById(`animal_${index}`)?.remove();
    }

    function getAnimalReports() {
      const reports = [];
      for (let i = 0; i < animalCount; i++) {
        const entry = document.getElementById(`animal_${i}`);
        if (entry) {
          reports.push({
            laporan: document.getElementById(`laporan_${i}`).value,
            species: document.getElementById(`species_${i}`).value,
            fromTo: document.getElementById(`fromTo_${i}`)?.value || "",
            external: document.getElementById(`external_${i}`)?.value || "",
            kandang: document.getElementById(`kandang_${i}`).value,
            bilangan: document.getElementById(`bilangan_${i}`).value,
            jantina: document.getElementById(`jantina_${i}`).value,
            catatan: document.getElementById(`catatan_${i}`).value
          });
        }
      }
      return reports;
    }

    /* ============================================
       RAWATAN HAIWAN (TREATMENT) FUNCTIONS
       ============================================ */

    let treatmentCount = 0;

    function addTreatmentEntry() {
      const container = document.getElementById("treatmentContainer");
      const div = document.createElement("div");
      div.className = "entry-card";
      div.id = `treatment_${treatmentCount}`;

      div.innerHTML = `
        <div class="entry-header">
          <select id="type_${treatmentCount}" style="flex: 1; min-width: 200px;">
            <option value="">Jenis Rawatan</option>
            <option>Haiwan Lemah dan Sakit</option>
            <option>Rawatan Haiwan</option>
          </select>
          <button type="button" class="delete-btn" onclick="removeTreatmentEntry(${treatmentCount})">Padam</button>
        </div>

        <div class="grid-2">
          <input id="speciesT_${treatmentCount}" placeholder="Spesies">
          <input id="kandangT_${treatmentCount}" placeholder="Kandang">

          <select id="bilT_${treatmentCount}">
            <option value="">Bilangan</option>
            ${Array.from({ length: 100 }, (_, i) => `<option>${i + 1}</option>`).join('')}
          </select>

          <select id="jantinaT_${treatmentCount}">
            <option value="">Jantina</option>
            <option>Jantan</option>
            <option>Betina</option>
            <option>Unknown</option>
          </select>
        </div>

        <textarea id="catatanT_${treatmentCount}" placeholder="Catatan Rawatan / Simptom / Tindakan" style="margin-top: 10px;"></textarea>
      `;

      container.appendChild(div);
      treatmentCount++;
    }

    function removeTreatmentEntry(index) {
      document.getElementById(`treatment_${index}`)?.remove();
    }

    function getTreatmentReports() {
      const reports = [];
      for (let i = 0; i < treatmentCount; i++) {
        const e = document.getElementById(`treatment_${i}`);
        if (e) {
          reports.push({
            type: document.getElementById(`type_${i}`).value,
            species: document.getElementById(`speciesT_${i}`).value,
            kandang: document.getElementById(`kandangT_${i}`).value,
            bilangan: document.getElementById(`bilT_${i}`).value,
            jantina: document.getElementById(`jantinaT_${i}`).value,
            catatan: document.getElementById(`catatanT_${i}`).value
          });
        }
      }
      return reports;
    }

    /* ============================================
       LAPORAN KERJA (WORK REPORT) FUNCTIONS
       ============================================ */

    function toggleKerjaInput(i) {
      const check = document.getElementById(`kerja${i}`);
      const input = document.getElementById(`catatan_kerja${i}`);

      if (!check.checked) {
        input.value = "";
        input.disabled = true;
      } else {
        input.disabled = false;
        input.focus();
      }
    }

    function validateKerjaSection() {
      for (let i = 1; i <= 7; i++) {
        const check = document.getElementById(`kerja${i}`);
        const note = document.getElementById(`catatan_kerja${i}`);

        if (check && check.checked && !note.value.trim()) {
          alert(`❌ Sila isi catatan untuk: Kerja item ${i}`);
          note.focus();
          return false;
        }
      }
      return true;
    }

    function autoNumberList(el) {
      let lines = el.value.split("\n");

      for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(/^\d+\.\s*/, "");

        if (lines[i].trim() !== "") {
          lines[i] = (i + 1) + ". " + lines[i];
        }
      }

      el.value = lines.join("\n");
    }

    /* ============================================
       SUBMIT & CONFIRMATION FUNCTIONS
       ============================================ */

    let preparedData = null;

    function prepareSubmit() {
      if (!validateKerjaSection()) return;

      const date = document.getElementById("date").value;
      const section = document.getElementById("section").value;
      const submitter = document.getElementById("submitter").value;
      const cuaca = document.getElementById("cuaca").value;
      const bencanaAlam = document.getElementById("bencanaAlam").value;

      if (!date || !section || !submitter || !cuaca) {
        alert("❌ Sila lengkapkan: Tarikh, Seksyen, Penghantar, dan Cuaca.");
        return;
      }

      const staffList = staffBySection[section];

      preparedData = {
        date,
        section,
        submitter,
        cuaca,
        bencanaAlam,
        bacaanElektrik: document.getElementById("bacaanElektrik").value,
        disinfektan: document.getElementById("disinfektan").checked,
        catatanSeksyen: document.getElementById("catatanSeksyen").value,
        fecalSubmit: document.getElementById("fecalSubmit").checked,
        meetingSection: document.getElementById("meetingSection").checked,
        kerosakanSeksyen: document.getElementById("kerosakanSeksyen").value,
        timbanganRumput: document.getElementById("timbanganRumput").value,
        timbanganDaun: document.getElementById("timbanganDaun").value,
        showPagi: document.getElementById("showPagi").checked,
        showPetang: document.getElementById("showPetang").checked,
        interactiveShow: document.getElementById("interactiveShow").checked,
        enrichment: document.getElementById("enrichment").checked,
        enrichmentAnimal: document.getElementById("enrichmentAnimal").value,
        lawatanKategori: document.getElementById("lawatanKategori").value,
        lawatanCatatan: document.getElementById("lawatanCatatan").value,
        staffData: staffList.map((staff, i) => ({
          staff,
          status: document.getElementById(`status_${i}`).value,
          kerja: document.getElementById(`kerja_${i}`)?.value || "",
          cuti: document.getElementById(`cuti_${i}`).value
        })),
        animalReports: getAnimalReports(),
        treatmentReports: getTreatmentReports(),
        lainLainKerja: document.getElementById("lainLainKerja").value
      };

      // GET KERJA DATA
     let kerjaList = [];

for (let i = 1; i <= 7; i++) {
  const checked = document.getElementById(`kerja${i}`).checked;
  const catatan = document.getElementById(`catatan_kerja${i}`).value;

  if (checked) {
    kerjaList.push(`(${i}) ${catatan || "Tanpa catatan"}`);
  }
}

preparedData.kerjaSection = kerjaList.length > 0 ? kerjaList.join("\n") : "";

      document.getElementById("confirmBtn").style.display = "inline-flex";
      alert("✅ Data disediakan. Klik tombol 'Sahkan Hantar' untuk menyelesaikan.");
    }

function confirmSubmit() {
  const confirmMessage = "🔒 Pastikan semua data sudah benar sebelum mengirim?\n\nData tidak boleh diubah setelah pengiriman.";
  if (!confirm(confirmMessage)) return;

  const scriptUrl = "https://script.google.com/macros/s/AKfycbyNBmZRWWFtMvja_03TDnZhvrn6hvNeuqreSl_KvTYz1vg_IdvsIt-D8ghJFkanwBvrrw/exec";

  fetch(scriptUrl, {
    method: "POST",
    body: JSON.stringify(preparedData)
  })
    .then(res => res.json())
    .then(data => {
      alert("✅ Berjaya dihantar! ID: " + data.id);
      location.reload();
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Ralat pengiriman: " + err.message);
    });
}

    function toggleEnrichmentAnimal() {
      const check = document.getElementById("enrichment").checked;
      document.getElementById("enrichmentAnimal").style.display = check ? "block" : "none";
    }

    /* ============================================
       PAGE LOAD INITIALIZATION
       ============================================ */

    window.onload = function () {
      for (let i = 1; i <= 7; i++) {
        toggleKerjaInput(i);
      }
      console.log("✅ Form initialized successfully");
    };
