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
            }, 50);  // Small delay to ensure the transition takes effect

            // Allow scrolling again after the content is fully displayed
            setTimeout(function () {
                document.body.style.overflow = '';
            }, 2000); // Delay for the fade-in duration
        }, 2000); // 2 seconds for the fade-out
    }, 6500); // 6.5 seconds for the animation
});
