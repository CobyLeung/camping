document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for the save button
  document.getElementById('save-btn').addEventListener('click', function() {
    // Collect form data
    const formData = {
      destination: document.getElementById('destination').value,
      startDate: document.getElementById('start-date').value,
      endDate: document.getElementById('end-date').value,
      activities: [],
      notes: document.getElementById('notes').value
    };

    // Collect checked activities
    const activityCheckboxes = document.querySelectorAll('input[name="activities"]:checked');
    activityCheckboxes.forEach(checkbox => {
      formData.activities.push(checkbox.value);
    });

    // Validate required fields
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields (Destination, Start Date, End Date).');
      return;
    }

    // Save to localStorage
    try {
      localStorage.setItem('campingPreferences', JSON.stringify(formData));
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      alert('Failed to save preferences. Please try again.');
    }
  });

  // Load saved data when the page loads
  const savedData = localStorage.getItem('campingPreferences');
  if (savedData) {
    const formData = JSON.parse(savedData);

    // Populate form fields
    document.getElementById('destination').value = formData.destination || '';
    document.getElementById('start-date').value = formData.startDate || '';
    document.getElementById('end-date').value = formData.endDate || '';
    document.getElementById('notes').value = formData.notes || '';

    // Check activity checkboxes
    formData.activities.forEach(activity => {
      const checkbox = document.querySelector(`input[value="${activity}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }
});