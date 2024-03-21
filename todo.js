 // Add event listeners to all checkboxes
document.querySelectorAll('.form-check-input').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        // Toggle the 'completed' class on the parent <li> element
        this.closest('li').classList.toggle('completed');
    });
});
