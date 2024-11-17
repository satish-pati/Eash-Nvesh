//videomodal for displaying videoes
function showVideoModal(videos) {
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#ffffff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '800px';
    modalContent.style.textAlign = 'center';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';
    modalContent.style.border = '3px solid #4caf50';
//search bar for searching videos
    const searchAndCloseContainer = document.createElement('div');
    searchAndCloseContainer.style.display = 'flex';
    searchAndCloseContainer.style.alignItems = 'center';
    searchAndCloseContainer.style.justifyContent = 'space-between';
    searchAndCloseContainer.style.width = '100%';
    searchAndCloseContainer.style.marginBottom = '20px';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search videos...';
    searchInput.style.padding = '10px';
    searchInput.style.width = '80%';
    searchInput.style.borderRadius = '5px';
    searchInput.style.border = '2px solid #4caf50'; // Border color
    searchInput.style.backgroundColor = '#f0f0f0'; 
    searchInput.style.color = '#555'; 
    
//close modal
    const closeModalBtn = document.createElement('button');
    closeModalBtn.innerText = 'Close';
    closeModalBtn.style.padding = '10px 20px';
    closeModalBtn.style.backgroundColor = '#ff4d4d';
    closeModalBtn.style.border = 'none';
    closeModalBtn.style.borderRadius = '5px';
    closeModalBtn.style.color = 'white';
    closeModalBtn.style.marginLeft = '10px';
    closeModalBtn.addEventListener('click', () => {
        modal.remove();
    });

    searchAndCloseContainer.appendChild(searchInput);
    searchAndCloseContainer.appendChild(closeModalBtn);

    const videoTutorialsLabel = document.createElement('div');
    videoTutorialsLabel.innerText = 'Video Tutorials';
    videoTutorialsLabel.style.fontSize = '20px';
    videoTutorialsLabel.style.fontWeight = 'bold';
    videoTutorialsLabel.style.color = '#333';
    videoTutorialsLabel.style.marginBottom = '20px';
//Creating video list
    const videoList = document.createElement('div');
    videoList.style.maxHeight = '400px';
    videoList.style.overflowY = 'scroll';
    videoList.style.display = 'flex';
    videoList.style.flexDirection = 'column';
    videoList.style.gap = '15px';
    videoList.style.padding = '0';
    videoList.style.width = '100%';
//rendering videolist
    function renderVideoList(filteredVideos) {
        videoList.innerHTML = '';
        filteredVideos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.style.display = 'flex';
            videoItem.style.alignItems = 'center';
            videoItem.style.padding = '10px';
            videoItem.style.cursor = 'pointer';
            videoItem.style.borderRadius = '8px';
            videoItem.style.transition = 'background-color 0.3s';
            videoItem.style.backgroundColor = '#f1f1f1';
            videoItem.addEventListener('click', () => {
                videoList.style.display = 'none';
                searchAndCloseContainer.style.display = 'none';
                videoTutorialsLabel.style.display = 'none';

                const videoContainer = document.createElement('div');
                videoContainer.style.width = '100%';
                videoContainer.style.display = 'flex';
                videoContainer.style.flexDirection = 'column';
                videoContainer.style.alignItems = 'center';

                const videoPlayer = document.createElement('video');
                videoPlayer.src = video.url;
                videoPlayer.controls = true;
                videoPlayer.style.width = '100%';
                videoContainer.appendChild(videoPlayer);

                const videoTitle = document.createElement('span');
                videoTitle.innerText = video.title;
                videoTitle.style.fontSize = '16px';
                videoTitle.style.fontWeight = 'bold';
                videoTitle.style.color = '#333';
                videoTitle.style.marginTop = '10px';
                videoContainer.appendChild(videoTitle);

                const backButton = document.createElement('button');
                backButton.innerText = 'Back to List';
                backButton.style.padding = '10px 20px';
                backButton.style.backgroundColor = '#4caf50';
                backButton.style.border = 'none';
                backButton.style.borderRadius = '5px';
                backButton.style.color = 'white';
                backButton.style.marginTop = '15px';
                backButton.addEventListener('click', () => {
                    videoContainer.remove();
                    videoList.style.display = 'flex';
                    searchAndCloseContainer.style.display = 'flex';
                    videoTutorialsLabel.style.display = 'block';
                });
                videoContainer.appendChild(backButton);

                modalContent.appendChild(videoContainer);
                videoPlayer.play();
            });
//creating thumbnail for videos
            const thumbnail = document.createElement('img');
            thumbnail.src = video.thumbnail || 'https://mainstreammarketing.ca/wp-content/uploads/2021/08/Post-4-Image-2048x1536.jpeg';
            thumbnail.alt = 'Thumbnail';
            thumbnail.style.width = '80px';
            thumbnail.style.height = 'auto';
             thumbnail.style.borderRadius = '5px';
            thumbnail.style.marginRight = '15px';

            const videoTitle = document.createElement('span');
            videoTitle.innerText = video.title;
            videoTitle.style.fontSize = '16px';
            videoTitle.style.fontWeight = 'bold';
            videoTitle.style.color = '#333';

            videoItem.appendChild(thumbnail);
            videoItem.appendChild(videoTitle);
            videoList.appendChild(videoItem);
        });
    }

    renderVideoList(videos);
//searching videos
    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.toLowerCase();
        const filteredVideos = videos.filter(video => 
            video.title.toLowerCase().includes(searchQuery)
        );
        renderVideoList(filteredVideos);
    });

    modalContent.appendChild(searchAndCloseContainer);
    modalContent.appendChild(videoTutorialsLabel);
    modalContent.appendChild(videoList);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
