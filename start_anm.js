document.addEventListener('DOMContentLoaded', function () {
    // Ensure no scrolling
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
        // Start fade out of the animation container
        document.querySelector('.animation-container').style.transition = 'opacity 2s';
        document.querySelector('.animation-container').style.opacity = '0';

        setTimeout(function () {
            // After fade out, hide animation container and show content with fade-in
            document.querySelector('.animation-container').style.display = 'none';

            // Prepare to fade in the content
            const content = document.querySelector('.anm-content');
            content.style.display = 'block';  // Make it visible
            setTimeout(function () {
                content.style.opacity = '1';  // Start the fade-in
            }, 25);  // Small delay to ensure the transition takes effect

            // Allow scrolling again after the content is fully displayed
            setTimeout(function () {
                document.body.style.overflow = '';
            }, 1200); // fade-in duration
        }, 1800); // fade-out duration
    }, 6000); // 5.75 seconds for the animation
});