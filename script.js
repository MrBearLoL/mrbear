document.addEventListener('DOMContentLoaded', () => {
    const skinContainer = document.getElementById('skin_container');
    const skinInput = document.getElementById('skin_input');
    const rotateBtn = document.getElementById('rotate_btn');
    const walkBtn = document.getElementById('walk_btn');

    // Initialize Skin Viewer
    const skinViewer = new skinview3d.SkinViewer({
        canvas: skinContainer,
        width: 400,
        height: 400,
        skin: "https://textures.minecraft.net/texture/b3fbd454b599df593f57101bfca7ed2dd87f8faa39e3550099c5430e0e40dd", // Default Steve skin (or random)
    });

    // Set initial properties
    skinViewer.width = skinContainer.parentElement.clientWidth;
    skinViewer.height = skinContainer.parentElement.clientHeight;
    skinViewer.fov = 70;
    skinViewer.zoom = 0.9;
    
    // Auto-rotate by default
    skinViewer.autoRotate = true;
    skinViewer.autoRotateSpeed = 0.5;
    rotateBtn.classList.add('active');

    // Handle Window Resize
    window.addEventListener('resize', () => {
        skinViewer.width = skinContainer.parentElement.clientWidth;
        skinViewer.height = skinContainer.parentElement.clientHeight;
    });

    // Handle File Upload
    skinInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const skinImage = new Image();
                skinImage.src = e.target.result;
                skinImage.onload = () => {
                    skinViewer.loadSkin(e.target.result);
                    // Reset animation if needed or keep it
                };
            };
            reader.readAsDataURL(file);
        }
    });

    // Toggle Rotation
    rotateBtn.addEventListener('click', () => {
        skinViewer.autoRotate = !skinViewer.autoRotate;
        if (skinViewer.autoRotate) {
            rotateBtn.classList.add('active');
        } else {
            rotateBtn.classList.remove('active');
        }
    });

    // Toggle Walk Animation
    let isWalking = false;
    walkBtn.addEventListener('click', () => {
        isWalking = !isWalking;
        if (isWalking) {
            skinViewer.animation = new skinview3d.WalkingAnimation();
            walkBtn.classList.add('active');
        } else {
            skinViewer.animation = null;
            walkBtn.classList.remove('active');
        }
    });

    // Add drag control support (built-in to skinview3d usually, but ensuring it works)
    // skinview3d handles mouse interaction on the canvas automatically.
});
