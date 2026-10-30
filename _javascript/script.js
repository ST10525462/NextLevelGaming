/**
 * Project: Esports Arena Web Application - Functional Script & Validation
 * Author: Development Team
 * Description: Handles dynamic map injection, calendar date constraints (current onwards), 
 *              fee calculations, multi-package summaries, numeric phone restrictions,
 *              inline exclamation validation for empty fields, popup alert validation for format errors, 
 *              and success screen generation.
 * 
 * References (Harvard Anglia):
 * - Mozilla Developer Network (MDN), 2025. Introduction to the DOM. [online] 
 *   MDN Web Docs. Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model>.
 * - World Wide Web Consortium (W3C), 2024. HTML5 Form Validation. [online] 
 *   W3C. Available at: <https://www.w3.org/TR/html52/sec-forms.html>.
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. DYNAMIC MAP INJECTION (Contact Page)
    // ==========================================
    const mapContainer = document.getElementById("map-container");
    if (mapContainer) {
        mapContainer.innerHTML = `
            <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=28.030%2C-26.150%2C28.050%2C-26.140&amp;layer=mapnik&amp;marker=-26.145%2C28.040" style="border: 0; filter: invert(90%) hue-rotate(180deg);"></iframe>
        `;
    }

    // ==========================================
    // 2. PHONE NUMBER NUMERIC RESTRICTION
    // ==========================================
    const phoneInputs = document.querySelectorAll("#phone-number, #contact-phone");
    phoneInputs.forEach(input => {
        if (input) {
            input.addEventListener("input", () => {
                input.value = input.value.replace(/\D/g, ''); // Strips non-numeric characters instantly
            });
        }
    });

    // ==========================================
    // 3. BOOKING DATE CONSTRAINT (Current Date Onwards)
    // ==========================================
    const dateInput = document.getElementById("booking-date");
    const todayStr = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.setAttribute("min", todayStr);
    }

    // ==========================================
    // 4. CALCULATE FEES PAGE LOGIC & VALIDATION
    // ==========================================
    const calculateBtn = document.getElementById("calculate-btn");
    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {
        const packageRows = document.querySelectorAll(".package-row");
        const summaryPackagesList = document.getElementById("summary-packages-list");
        const summaryPlayers = document.getElementById("summary-players");
        const summaryBase = document.getElementById("summary-base");
        const summaryDiscount = document.getElementById("summary-discount");
        const summaryTotal = document.getElementById("summary-total");

        function calculateFees() {
            let totalPlayers = 0;
            let baseTotal = 0;
            let selectedPackagesHtml = "";

            packageRows.forEach(row => {
                const input = row.querySelector(".player-input");
                const playerCount = parseInt(input.value) || 0;
                const pricePerPerson = parseFloat(row.dataset.price) || 0;
                const packageName = row.dataset.name;

                if (playerCount > 0) {
                    totalPlayers += playerCount;
                    const itemTotal = playerCount * pricePerPerson;
                    baseTotal += itemTotal;

                    selectedPackagesHtml += `
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--text-main); background: var(--bg-input); padding: 8px 10px; border-radius: 4px; border: 1px solid var(--border-color);">
                            <span>${packageName} (${playerCount}x)</span>
                            <span style="color: var(--accent-cyan); font-weight: 600;">R${itemTotal.toFixed(2)}</span>
                        </div>
                    `;
                }
            });

            if (totalPlayers === 0) {
                if (summaryPackagesList) summaryPackagesList.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;">No packages selected yet.</span>`;
            } else {
                if (summaryPackagesList) summaryPackagesList.innerHTML = selectedPackagesHtml;
            }

            let discountPercent = totalPlayers >= 8 ? 10 : (totalPlayers >= 4 ? 5 : 0);
            const discountAmount = (baseTotal * discountPercent) / 100;
            const finalTotal = baseTotal - discountAmount;

            if (summaryPlayers) summaryPlayers.textContent = totalPlayers;
            if (summaryBase) summaryBase.textContent = `R${baseTotal.toFixed(2)}`;
            if (summaryDiscount) summaryDiscount.textContent = `R${discountAmount.toFixed(2)} (${discountPercent}%)`;
            if (summaryTotal) summaryTotal.textContent = `R${finalTotal.toFixed(2)}`;
        }

        if (calculateBtn) {
            calculateBtn.addEventListener("click", (e) => {
                e.preventDefault();
                packageRows.forEach(row => {
                    const input = row.querySelector(".player-input");
                    if (parseInt(input.value) < 0 || isNaN(parseInt(input.value))) {
                        input.value = 0;
                    }
                });
                calculateFees();

                const summaryBox = document.querySelector(".summary-box");
                if (summaryBox) {
                    summaryBox.style.borderColor = "var(--accent-cyan)";
                    summaryBox.style.boxShadow = "0 0 25px rgba(0, 240, 255, 0.3)";
                    setTimeout(() => {
                        summaryBox.style.borderColor = "var(--border-color)";
                        summaryBox.style.boxShadow = "none";
                    }, 800);
                }
            });
        }

        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullNameInput = document.getElementById("full-name");
            const emailInput = document.getElementById("email-address");
            const phoneInput = document.getElementById("phone-number");

            const fullName = fullNameInput ? fullNameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const bookingDate = dateInput ? dateInput.value : "";

            let totalPlayers = 0;
            packageRows.forEach(row => {
                const input = row.querySelector(".player-input");
                if (parseInt(input.value) < 0) input.value = 0;
                totalPlayers += parseInt(input.value) || 0;
            });

            // Reset all inline exclamation errors first
            document.querySelectorAll(".inline-error").forEach(el => el.style.display = "none");

            let hasEmptyFields = false;

            // 1. Check if ALL fields are empty
            const allEmpty = (!fullName && !email && !phone && !bookingDate && totalPlayers === 0);
            if (allEmpty) {
                document.getElementById("err-full-name").style.display = "block";
                document.getElementById("err-email-address").style.display = "block";
                document.getElementById("err-phone-number").style.display = "block";
                document.getElementById("err-booking-date").style.display = "block";
                document.getElementById("err-packages").style.display = "block";
                if (fullNameInput) fullNameInput.focus();
                return;
            }

            // 2. Check SPECIFIC empty fields
            if (!fullName) {
                document.getElementById("err-full-name").style.display = "block";
                hasEmptyFields = true;
            }
            if (!email) {
                document.getElementById("err-email-address").style.display = "block";
                hasEmptyFields = true;
            }
            if (!phone) {
                document.getElementById("err-phone-number").style.display = "block";
                hasEmptyFields = true;
            }
            if (!bookingDate) {
                document.getElementById("err-booking-date").style.display = "block";
                hasEmptyFields = true;
            }
            if (totalPlayers === 0) {
                document.getElementById("err-packages").style.display = "block";
                hasEmptyFields = true;
            }

            if (hasEmptyFields) {
                return; // Stop here if any required fields are empty (inline warnings shown)
            }

            // Specific format & logic validations using POP-UP alerts
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Error: Please enter a valid email address format.");
                if (emailInput) emailInput.focus();
                return;
            }
            if (!/^\d+$/.test(phone) || phone.length < 10) {
                alert("Error: Phone number is invalid. It must contain numbers only and be at least 10 digits long.");
                if (phoneInput) phoneInput.focus();
                return;
            }
            if (bookingDate < todayStr) {
                alert("Error: Booking date cannot be in the past. Please select today or a future date.");
                if (dateInput) dateInput.focus();
                return;
            }

            calculateFees();
            const totalText = summaryTotal ? summaryTotal.textContent : "R0.00";

            const formLayout = document.querySelector(".form-layout");
            if (formLayout) {
                formLayout.outerHTML = `
                    <div class="form-box" style="grid-column: 1 / -1; text-align: center; padding: 50px 35px; border-color: #00ff64; box-shadow: 0 0 30px rgba(0, 255, 100, 0.2);">
                        <div class="badge-tag" style="background: rgba(0, 255, 100, 0.1); border-color: #00ff64; color: #00ff64; box-shadow: 0 0 15px rgba(0, 255, 100, 0.25); margin-bottom: 20px;">Booking Confirmed</div>
                        <h1 class="page-title" style="font-size: 2.2rem; color: var(--text-main);">Booking Successful!</h1>
                        <p class="subtitle" style="margin-bottom: 30px;">Thank you, <strong style="color: var(--accent-cyan);">${fullName}</strong>. Your esports arena slot has been secured.</p>
                        
                        <div style="max-width: 500px; margin: 0 auto 30px auto; text-align: left; background: var(--bg-input); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;"><span style="color: var(--text-muted);">Email:</span><span style="color: var(--text-main);">${email}</span></div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;"><span style="color: var(--text-muted);">Phone:</span><span style="color: var(--text-main);">${phone}</span></div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;"><span style="color: var(--text-muted);">Booking Date:</span><span style="color: var(--accent-cyan); font-weight: 600;">${bookingDate}</span></div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;"><span style="color: var(--text-muted);">Total Players:</span><span style="color: var(--text-main);">${totalPlayers}</span></div>
                            <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color); font-size: 1.1rem; font-weight: 800;"><span style="color: var(--text-main);">Total Fee:</span><span style="color: var(--accent-cyan);">${totalText}</span></div>
                        </div>

                        <div style="display: flex; gap: 15px; justify-content: center; max-width: 500px; margin: 0 auto;">
                            <a href="index.html" class="btn-card cyan" style="flex: 1; padding: 12px; text-decoration: none; text-align: center;">Return to Home</a>
                            <button onclick="window.location.reload();" class="btn-primary-orange" style="flex: 1; padding: 12px; cursor: pointer; border: none;">Book Another Session</button>
                        </div>
                    </div>
                `;
            }
        });
    }

    // ==========================================
    // 5. CONTACT PAGE FORM VALIDATION & SUCCESS
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("contact-name");
            const emailInput = document.getElementById("contact-email");
            const phoneInput = document.getElementById("contact-phone");
            const msgInput = document.getElementById("contact-message");

            const cName = nameInput ? nameInput.value.trim() : "";
            const cEmail = emailInput ? emailInput.value.trim() : "";
            const cPhone = phoneInput ? phoneInput.value.trim() : "";
            const cMessage = msgInput ? msgInput.value.trim() : "";

            // Reset all contact inline exclamation errors first
            document.querySelectorAll("#contact-form .inline-error").forEach(el => el.style.display = "none");

            let hasEmptyFields = false;

            // 1. Check if ALL contact fields are empty
            const allEmpty = (!cName && !cEmail && !cPhone && !cMessage);
            if (allEmpty) {
                document.getElementById("err-contact-name").style.display = "block";
                document.getElementById("err-contact-email").style.display = "block";
                document.getElementById("err-contact-phone").style.display = "block";
                document.getElementById("err-contact-message").style.display = "block";
                if (nameInput) nameInput.focus();
                return;
            }

            // 2. Check SPECIFIC empty fields
            if (!cName) {
                document.getElementById("err-contact-name").style.display = "block";
                hasEmptyFields = true;
            }
            if (!cEmail) {
                document.getElementById("err-contact-email").style.display = "block";
                hasEmptyFields = true;
            }
            if (!cPhone) {
                document.getElementById("err-contact-phone").style.display = "block";
                hasEmptyFields = true;
            }
            if (!cMessage) {
                document.getElementById("err-contact-message").style.display = "block";
                hasEmptyFields = true;
            }

            if (hasEmptyFields) {
                return; // Stop here if any contact fields are empty (inline warnings shown)
            }

            // Specific format validations using POP-UP alerts
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(cEmail)) {
                alert("Error: Please enter a valid email address format.");
                if (emailInput) emailInput.focus();
                return;
            }
            if (!/^\d+$/.test(cPhone) || cPhone.length < 10) {
                alert("Error: Phone number is invalid. It must contain numbers only and be at least 10 digits long.");
                if (phoneInput) phoneInput.focus();
                return;
            }

            // Successful Submission Screen Replacement
            const formLayout = document.querySelector(".form-layout");
            if (formLayout) {
                formLayout.outerHTML = `
                    <div class="form-box" style="grid-column: 1 / -1; text-align: center; padding: 50px 35px; border-color: #00ff64; box-shadow: 0 0 30px rgba(0, 255, 100, 0.2);">
                        <div class="badge-tag" style="background: rgba(0, 255, 100, 0.1); border-color: #00ff64; color: #00ff64; box-shadow: 0 0 15px rgba(0, 255, 100, 0.25); margin-bottom: 20px;">Message Sent</div>
                        <h1 class="page-title" style="font-size: 2.2rem; color: var(--text-main);">Thank You, ${cName}!</h1>
                        <p class="subtitle" style="margin-bottom: 30px;">Your inquiry has been successfully received. Our support team will get back to you shortly at <strong style="color: var(--accent-cyan);">${cEmail}</strong>.</p>
                        
                        <div style="max-width: 500px; margin: 0 auto 30px auto; text-align: left; background: var(--bg-input); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color);">
                            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 5px; text-transform: uppercase; font-weight: 700;">Your Message:</div>
                            <div style="font-size: 0.95rem; color: var(--text-main); font-style: italic; line-height: 1.5;">"${cMessage}"</div>
                        </div>

                        <div style="display: flex; gap: 15px; justify-content: center; max-width: 500px; margin: 0 auto;">
                            <a href="index.html" class="btn-card cyan" style="flex: 1; padding: 12px; text-decoration: none; text-align: center;">Return to Home</a>
                            <button onclick="window.location.reload();" class="btn-primary-orange" style="flex: 1; padding: 12px; cursor: pointer; border: none;">Send Another Message</button>
                        </div>
                    </div>
                `;
            }
        });
    }
});