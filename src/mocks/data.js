// Fake playlist + track data backing the mock layer.
//
// Tracks are grouped into reusable "packs"; each mock playlist points at a pack.
// Every track is shaped { artistName, songName } — exactly what the real
// getXPlaylist() functions return after parsing each platform's API response.

export const TRACK_PACKS = {
  todaysHits: [
    { artistName: "Dua Lipa", songName: "Levitating" },
    { artistName: "The Weeknd", songName: "Blinding Lights" },
    { artistName: "Harry Styles", songName: "As It Was" },
    { artistName: "Olivia Rodrigo", songName: "good 4 u" },
    { artistName: "Doja Cat", songName: "Say So" },
    { artistName: "Glass Animals", songName: "Heat Waves" },
    { artistName: "Lizzo", songName: "About Damn Time" },
    { artistName: "Bad Bunny", songName: "Tití Me Preguntó" },
    { artistName: "SZA", songName: "Kill Bill" },
    { artistName: "Miley Cyrus", songName: "Flowers" },
    { artistName: "Post Malone", songName: "Circles" },
    { artistName: "Billie Eilish", songName: "bad guy" },
  ],
  throwback2000s: [
    { artistName: "OutKast", songName: "Hey Ya!" },
    { artistName: "Gnarls Barkley", songName: "Crazy" },
    { artistName: "The Killers", songName: "Mr. Brightside" },
    { artistName: "Kelly Clarkson", songName: "Since U Been Gone" },
    { artistName: "Usher", songName: "Yeah!" },
    { artistName: "Beyoncé", songName: "Crazy in Love" },
    { artistName: "Coldplay", songName: "Clocks" },
    { artistName: "Nelly", songName: "Hot in Herre" },
    { artistName: "Maroon 5", songName: "This Love" },
    { artistName: "50 Cent", songName: "In Da Club" },
    { artistName: "Avril Lavigne", songName: "Complicated" },
    { artistName: "Snow Patrol", songName: "Chasing Cars" },
  ],
  indieChill: [
    { artistName: "Bon Iver", songName: "Holocene" },
    { artistName: "Fleet Foxes", songName: "White Winter Hymnal" },
    { artistName: "Sufjan Stevens", songName: "Chicago" },
    { artistName: "The National", songName: "Bloodbuzz Ohio" },
    { artistName: "Beach House", songName: "Space Song" },
    { artistName: "Alt-J", songName: "Breezeblocks" },
    { artistName: "Hozier", songName: "Cherry Wine" },
    { artistName: "Vampire Weekend", songName: "A-Punk" },
    { artistName: "Tame Impala", songName: "The Less I Know the Better" },
    { artistName: "Phoebe Bridgers", songName: "Motion Sickness" },
    { artistName: "Sufjan Stevens", songName: "Should Have Known Better" },
  ],
  rockClassics: [
    { artistName: "Queen", songName: "Bohemian Rhapsody" },
    { artistName: "Led Zeppelin", songName: "Stairway to Heaven" },
    { artistName: "The Rolling Stones", songName: "Paint It Black" },
    { artistName: "Fleetwood Mac", songName: "Dreams" },
    { artistName: "David Bowie", songName: "Heroes" },
    { artistName: "Pink Floyd", songName: "Wish You Were Here" },
    { artistName: "The Beatles", songName: "Come Together" },
    { artistName: "Nirvana", songName: "Smells Like Teen Spirit" },
    { artistName: "Guns N' Roses", songName: "Sweet Child O' Mine" },
    { artistName: "AC/DC", songName: "Back in Black" },
    { artistName: "The Who", songName: "Baba O'Riley" },
  ],
  hipHopEssentials: [
    { artistName: "Kendrick Lamar", songName: "HUMBLE." },
    { artistName: "Drake", songName: "God's Plan" },
    { artistName: "J. Cole", songName: "No Role Modelz" },
    { artistName: "Travis Scott", songName: "SICKO MODE" },
    { artistName: "Kanye West", songName: "Stronger" },
    { artistName: "A$AP Rocky", songName: "Praise the Lord" },
    { artistName: "Tyler, The Creator", songName: "EARFQUAKE" },
    { artistName: "Nas", songName: "N.Y. State of Mind" },
    { artistName: "JAY-Z", songName: "99 Problems" },
    { artistName: "Cardi B", songName: "Bodak Yellow" },
  ],
  workoutEnergy: [
    { artistName: "Kanye West", songName: "Power" },
    { artistName: "Eminem", songName: "Till I Collapse" },
    { artistName: "Survivor", songName: "Eye of the Tiger" },
    { artistName: "The Prodigy", songName: "Breathe" },
    { artistName: "Calvin Harris", songName: "Feel So Close" },
    { artistName: "Avicii", songName: "Levels" },
    { artistName: "Rihanna", songName: "Don't Stop the Music" },
    { artistName: "Daft Punk", songName: "Harder, Better, Faster, Stronger" },
    { artistName: "Skrillex", songName: "Bangarang" },
    { artistName: "Swedish House Mafia", songName: "Don't You Worry Child" },
  ],
};

// Per-platform playlist metadata. `pack` keys into TRACK_PACKS above. Names are
// flavored to feel native to each platform's typical library.
export const MOCK_PLAYLISTS = {
  Spotify: [
    { id: "sp_liked", name: "Liked Songs", pack: "todaysHits" },
    { id: "sp_chill", name: "indie chill ☕", pack: "indieChill" },
    { id: "sp_throwback", name: "2000s Throwbacks", pack: "throwback2000s" },
    { id: "sp_workout", name: "Beast Mode", pack: "workoutEnergy" },
    { id: "sp_rock", name: "Rock Classics", pack: "rockClassics" },
  ],
  Youtube: [
    { id: "yt_mix", name: "My Mix", pack: "todaysHits" },
    { id: "yt_hiphop", name: "Hip-Hop Essentials", pack: "hipHopEssentials" },
    { id: "yt_rock", name: "Classic Rock Anthems", pack: "rockClassics" },
    { id: "yt_gym", name: "Gym Playlist 💪", pack: "workoutEnergy" },
  ],
  Napster: [
    { id: "np_faves", name: "My Favorites", pack: "throwback2000s" },
    { id: "np_indie", name: "Indie & Chill", pack: "indieChill" },
    { id: "np_hiphop", name: "Hip-Hop Heat", pack: "hipHopEssentials" },
  ],
  Deezer: [
    { id: "dz_flow", name: "Deezer Flow", pack: "todaysHits" },
    { id: "dz_rock", name: "Rock Legends", pack: "rockClassics" },
    { id: "dz_throwback", name: "Throwback Hits", pack: "throwback2000s" },
    { id: "dz_workout", name: "Cardio Boost", pack: "workoutEnergy" },
  ],
};
