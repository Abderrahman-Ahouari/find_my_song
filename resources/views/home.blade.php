<!-- Search Page (index.blade.php) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LyricFinder - Find your favorite song lyrics</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #0a1535 0%, #1a103c 100%);
            min-height: 100vh;
        }
        .logo-text {
            background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body class="text-gray-100">
    <header class="container mx-auto py-8 px-4">
        <div class="flex justify-center items-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold logo-text">LyricFinder</h1>
        </div>
        <div class="max-w-4xl mx-auto text-center mb-12">
            <h2 class="text-2xl md:text-3xl mb-4 text-white">Find lyrics to your favorite songs</h2>
            <p class="text-gray-300">Search by artist name, song title, or both to discover lyrics</p>
        </div>
    </header>

    <main class="container mx-auto px-4 pb-12">
        <div class="max-w-4xl mx-auto bg-gray-800 bg-opacity-30 rounded-lg shadow-xl p-6 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label for="artist-input" class="block text-gray-300 mb-2">Artist Name</label>
                    <input 
                        type="text" 
                        id="artist-input" 
                        class="w-full bg-gray-700 border border-gray-600 rounded py-2 px-4 text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Enter artist name...">
                </div>
                <div>
                    <label for="song-input" class="block text-gray-300 mb-2">Song Title</label>
                    <input 
                        type="text" 
                        id="song-input" 
                        class="w-full bg-gray-700 border border-gray-600 rounded py-2 px-4 text-white focus:outline-none focus:border-cyan-500"
                        placeholder="Enter song title...">
                </div>
            </div>
            <div class="flex justify-center">
                <button 
                    id="search-btn" 
                    class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 focus:outline-none">
                    Search Lyrics
                </button>
            </div>
        </div>

        <!-- Loader -->
        <div id="loader" class="hidden flex justify-center mb-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
        </div>

        <!-- Results Container -->
        <div id="results-container" class="max-w-4xl mx-auto">
            <!-- Results will be populated here by JavaScript -->
        </div>
    </main>

    <footer class="bg-gray-900 bg-opacity-50 py-6">
        <div class="container mx-auto px-4 text-center text-gray-400">
            <p>© 2025 LyricFinder. All rights reserved.</p>
        </div>
    </footer>

    <script src="{{ asset('js/lyrics-app.js') }}"></script>
    <script>
        const songDetailUrl = "{{ route('song_detail') }}";
    </script>
</body>
</html>