// Password protection for personal page
(function() {
    // ========================================
    // TOGGLE PASSWORD PROTECTION ON/OFF
    // Set to false to disable password (open access)
    // Set to true to enable password protection
    // ========================================
    const PASSWORD_ENABLED = false;

    const PASSWORD = 'more!';
    const STORAGE_KEY = 'personal_page_unlocked';
    const SESSION_DURATION = 3600000; // 1 hour in milliseconds

    let modal, mainContent, passwordForm, passwordInput, passwordError;

    // Check if already unlocked in this session
    function checkAccess() {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
            const unlockData = JSON.parse(stored);
            const now = Date.now();

            // Check if session is still valid
            if (now - unlockData.timestamp < SESSION_DURATION) {
                unlockPage();
                return true;
            } else {
                sessionStorage.removeItem(STORAGE_KEY);
            }
        }
        return false;
    }

    // Unlock the page
    function unlockPage() {
        // Hide modal
        modal.classList.add('hidden');
        modal.style.display = 'none';

        // Show main content
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'block';
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';

        // Force all child elements to be visible (fix for opacity issues)
        const allElements = mainContent.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });

        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
    }

    // Lock the page
    function lockPage() {
        modal.classList.remove('hidden');
        mainContent.classList.add('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Show error message
    function showError(message) {
        passwordError.textContent = message;
        passwordError.style.display = 'block';
        passwordInput.classList.add('error');

        // Shake animation
        passwordInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);

        setTimeout(() => {
            passwordError.style.display = 'none';
            passwordInput.classList.remove('error');
        }, 3000);
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        // Get DOM elements after DOM is loaded
        modal = document.getElementById('passwordModal');
        mainContent = document.getElementById('mainContent');
        passwordForm = document.getElementById('passwordForm');
        passwordInput = document.getElementById('passwordInput');
        passwordError = document.getElementById('passwordError');

        // Handle form submission
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const enteredPassword = passwordInput.value;

            if (enteredPassword === PASSWORD) {
                // Store unlock status in session
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
                    timestamp: Date.now()
                }));

                // Success animation
                passwordInput.classList.add('success');
                passwordForm.querySelector('button').innerHTML = '<i class="fas fa-check"></i> Unlocked!';

                setTimeout(() => {
                    unlockPage();
                }, 500);
            } else {
                showError('Incorrect password. Try again!');
                passwordInput.value = '';
            }
        });

        // Clear input when clicking outside (but keep modal)
        passwordInput.addEventListener('blur', function() {
            if (passwordError.style.display === 'block') {
                passwordError.style.display = 'none';
                passwordInput.classList.remove('error');
            }
        });

        // Check if password protection is enabled
        if (!PASSWORD_ENABLED) {
            // Password disabled - auto unlock
            unlockPage();
        } else {
            // Password enabled - check access
            if (!checkAccess()) {
                lockPage();
                passwordInput.focus();
            }
        }
    });
})();