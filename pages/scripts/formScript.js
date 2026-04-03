
document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('feedbackForm');
    const contact = document.getElementById('contact-email');
    const category = document.getElementById('category-input');
    const message = document.getElementById('feedback-message');

    const resetBtn = document.getElementById('resetBtn'); 
    const submitBtn = document.getElementById('submitBtn');
    
    //const charCounter = document.createElement('small');
// add content here



    const allInputs = document.querySelectorAll('input:not([type="color"])');

 /*
 	function validateMatch() {
  //add content
  
  
    }


    message.addEventListener('input', () => {
        validateMatch();
        const val = pwdInput.value;
        
        // --- Character Counter Logic ---
        
        
        
        // --- Requirement Checklist Logic ---
    
    
    

        Object.keys(requirements).forEach(rule => {
            const element = document.getElementById(`req-${rule}`);
            if (element) {
                element.classList.toggle('valid', requirements[rule]);
                element.classList.toggle('invalid', !requirements[rule]);
            }
        });

        
        // --- Strength Meter Logic ---
        const strength = Object.values(requirements).filter(Boolean).length;
        meter.value = strength;
        
        const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
       
       //add content here
       
       
       
    });

    confirmPwdInput.addEventListener('input', validateMatch);


    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const isPassword = input.type === 'password';
            
            input.type = isPassword ? 'text' : 'password';
            button.textContent = isPassword ? 'Hide' : 'Show';
        });
    });
*/

    allInputs.forEach(input => {
        input.addEventListener('blur', () => {
            const errorSpan = document.getElementById(`${input.id}-error`);
            const isValid = input.checkValidity();
            
            input.classList.toggle('invalid', !isValid);
            input.classList.toggle('valid', isValid);

            if (errorSpan) {
                errorSpan.textContent = isValid ? '' : input.validationMessage;
                errorSpan.style.display = isValid ? 'none' : 'block';
            }
        });
    });


    function resetForm() {
        form.reset();
        // Reset validation states
        allInputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            const errorSpan = document.getElementById(`${input.id}-error`);
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }
        });
    }

    form.addEventListener('reset', (e) => {
        e.preventDefault();
        resetForm();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            alert("Please correct the errors in the form before submitting.");
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Processing...";

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                alert("Feedback submitted successfully! Thank you.");
                resetForm();
            } else {
                alert("Failed to submit feedback. Please try again later.");
            }
        } catch (err) {
            console.error("Error submitting feedback:", err);
            alert("An error occurred while submitting your feedback. Please try again later.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    console.log("Semantic Form Controller initialized.");
});