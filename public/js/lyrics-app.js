
// Search page functionality
document.addEventListener('DOMContentLoaded', function() {
    const artistInput = document.getElementById('artist-input');
    const songInput = document.getElementById('song-input');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results-container');
    const loaderElement = document.getElementById('loader');
    
    // Format duration from seconds to MM:SS
    function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    // Create results HTML for search page 
    function createResultHTML(track) {
        return `
            <div class="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row mb-4">
                <div class="w-full md:w-1/4">
                    <img src="${track.album.cover_medium}" alt="${track.album.title}" class="w-full h-auto object-cover">
                </div>
                <div class="p-4 flex-grow">
                    <h3 class="text-xl font-bold text-white">${track.title}</h3>
                    <p class="text-cyan-400">${track.artist.name}</p>
                    <p class="text-gray-300">Album: ${track.album.title}</p>
                    <p class="text-gray-400">Duration: ${formatDuration(track.duration)}</p>
                </div>
                <div class="p-4 flex items-center">
                    <a href="${songDetailUrl}?artist=${encodeURIComponent(track.artist.name)}&song=${encodeURIComponent(track.title)}" 
                       class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                        See Lyrics
                    </a>
                </div>
            </div>
        `;
    }
    
    
    // Search function 
    async function searchSongs() {
    const artist = artistInput.value.trim();
    const song = songInput.value.trim();
    
    if (!artist && !song) {
        alert('Please enter an artist name or song title');
        return;
    }
    
    let searchTerm = '';
    if (artist && song) {
        searchTerm = `${artist} ${song}`;
    } else {
        searchTerm = artist || song;
    }
    
    // Show loader
    loaderElement.classList.remove('hidden');
    resultsContainer.innerHTML = '';
    
    try {
        const response = await fetch(`https://api.lyrics.ovh/suggest/${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Hide loader
        loaderElement.classList.add('hidden');
        
        if (data.data && data.data.length > 0) {
            // Display results
            const resultsHTML = data.data.slice(0, 10).map(track => createResultHTML(track)).join('');
            resultsContainer.innerHTML = resultsHTML;
        } else {
            resultsContainer.innerHTML = `
                <div class="bg-gray-800 bg-opacity-50 p-4 rounded-lg text-center">
                    <p class="text-white">No results found. Please try again with different search terms.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        loaderElement.classList.add('hidden');
        resultsContainer.innerHTML = `
            <div class="bg-red-800 bg-opacity-50 p-4 rounded-lg text-center">
                <p class="text-white">An error occurred while searching. Please try again later.</p>
            </div>
        `;
    }
    }
    
    // Event listeners
    searchBtn.addEventListener('click', searchSongs);
    
    // Allow enter key to trigger search
    [artistInput, songInput].forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchSongs();
        }
    });
    });
    });
    
    // Lyrics page functionality
    if (document.getElementById('lyrics-container')) {
    document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const artist = urlParams.get('artist');
    const song = urlParams.get('song');
    const lyricsContainer = document.getElementById('lyrics-container');
    const songDetailsContainer = document.getElementById('song-details');
    const loaderElement = document.getElementById('loader');
    
    async function fetchLyrics() {
        if (!artist || !song) {
            lyricsContainer.innerHTML = '<p class="text-red-400">Missing artist or song information.</p>';
            return;
        }
        
        try {
            // Show loader
            loaderElement.classList.remove('hidden');
            
            // Fetch lyrics
            const lyricsResponse = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`);
            
            if (!lyricsResponse.ok) {
                throw new Error('Failed to fetch lyrics');
            }
            
            const lyricsData = await lyricsResponse.json();
            
            // Format lyrics by replacing newlines with <br> tags
            const formattedLyrics = lyricsData.lyrics
                .replace(/\r\n|\r|\n/g, '<br>')
                .replace(/\n\n/g, '<p class="my-4"></p>');
            
            // Display lyrics
            lyricsContainer.innerHTML = `
                <div class="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                    <h2 class="text-2xl font-bold text-white mb-4">${song}</h2>
                    <h3 class="text-xl text-cyan-400 mb-6">by ${artist}</h3>
                    <div class="text-gray-100 lyrics-text">
                        ${formattedLyrics}
                    </div>
                </div>
            `;
            
            // Hide loader
            loaderElement.classList.add('hidden');
            
            // Try to fetch additional song details for display
            try {
                const detailsResponse = await fetch(`https://api.lyrics.ovh/suggest/${encodeURIComponent(artist + " " + song)}`);
                const detailsData = await detailsResponse.json();
                
                // Find the most relevant result
                const trackDetails = detailsData.data.find(track => 
                    track.artist.name.toLowerCase().includes(artist.toLowerCase()) && 
                    track.title.toLowerCase().includes(song.toLowerCase())
                );
                
                if (trackDetails) {
                    songDetailsContainer.innerHTML = `
                        <div class="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden shadow-lg mb-6">
                            <div class="md:flex">
                                <div class="md:w-1/3">
                                    <img src="${trackDetails.album.cover_big || trackDetails.album.cover_medium}" 
                                         alt="${trackDetails.album.title}" 
                                         class="w-full h-auto">
                                </div>
                                <div class="p-6">
                                    <h2 class="text-2xl font-bold text-white">${trackDetails.title}</h2>
                                    <p class="text-cyan-400 text-xl">${trackDetails.artist.name}</p>
                                    <p class="text-gray-300 mt-2">Album: ${trackDetails.album.title}</p>
                                    <p class="text-gray-400">Duration: ${Math.floor(trackDetails.duration / 60)}:${(trackDetails.duration % 60).toString().padStart(2, '0')}</p>
                                    ${trackDetails.preview ? `
                                        <div class="mt-4">
                                            <p class="text-gray-300 mb-2">Preview:</p>
                                            <audio controls class="w-full">
                                                <source src="${trackDetails.preview}" type="audio/mpeg">
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Error fetching song details:', error);
                // Don't show an error to the user, just log it
            }
            
        } catch (error) {
            console.error('Error:', error);
            loaderElement.classList.add('hidden');
            lyricsContainer.innerHTML = `
                <div class="bg-red-800 bg-opacity-50 p-6 rounded-lg text-center">
                    <p class="text-white">Sorry, we couldn't find lyrics for this song. Please try another song.</p>
                </div>
            `;
        }
    }
    
    fetchLyrics();
    });
    }
    