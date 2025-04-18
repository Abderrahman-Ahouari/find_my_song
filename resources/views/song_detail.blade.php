<!-- Lyrics Page (lyrics.blade.php) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Song Lyrics | LyricFinder</title>
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
        .lyrics-text {
            line-height: 1.8;
            white-space: pre-wrap;
        }
    </style>
</head>
<body class="text-gray-100">
    <header class="container mx-auto py-6 px-4">
        <div class="flex justify-between items-center mb-8">
            <a href="/" class="text-3xl font-bold logo-text">LyricFinder</a>
            <a href="/" class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors duration-300">
                ← Back to Search
            </a>
        </div>
    </header>

    <main class="container mx-auto px-4 pb-12">
        <!-- Loader -->
        <div id="loader" class="flex justify-center mb-6">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
        </div>

        <!-- Song Details Section -->
        <div id="song-details" class="max-w-4xl mx-auto mb-8">
            <!-- Song details will be populated here by JavaScript -->
        </div>

        <!-- Lyrics Container -->
        <div id="lyrics-container" class="max-w-4xl mx-auto">
            <!-- Lyrics will be populated here by JavaScript -->
        </div>
    </main>

    <footer class="bg-gray-900 bg-opacity-50 py-6">
        <div class="container mx-auto px-4 text-center text-gray-400">
            <p>© 2025 LyricFinder. All rights reserved.</p>
        </div>
    </footer>

    <script src="{{ asset('js/lyrics-app.js') }}"></script>

</body>
</html>