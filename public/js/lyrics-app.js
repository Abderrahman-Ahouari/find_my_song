
// Search page functionality
document.addEventListener('DOMContentLoaded', function() {
    const artistInput = document.getElementById('artist-input');
    const songInput = document.getElementById('song-input');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results-container');
    
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
                    <a href="" 
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
    
    
    let searchTerm = '';
    if (artist && song) {
        searchTerm = `${artist} ${song}`;
    } else {
        searchTerm = artist || song;
    }

    
    try {
        const response = await fetch(`https://api.lyrics.ovh/suggest/${encodeURIComponent(searchTerm)}`);
        
        const data = await response.json();
        

        if (data.data) {
            const resultsHTML = data.data.slice(0, 10).map(track => createResultHTML(track)).join('');
            resultsContainer.innerHTML = resultsHTML;
        } else {
            alert('No results found for your search. Please try again with different keywords.');
        }
    } catch (error) {
        alert('An error occurred while fetching the data. Please try again later.');    
    }
    }
    
    // Event listeners
    searchBtn.addEventListener('click', searchSongs);
    });
    
  