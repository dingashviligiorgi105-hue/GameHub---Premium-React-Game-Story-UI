// === IMPORTS ===
import detroit from "../assets/games/detroit.webp";
import ac2 from "../assets/games/ac2.jpg";
import batman from "../assets/games/batman.webp";
import dyingLight from "../assets/games/dying-light.jpg";
import fc24 from "../assets/games/fc24.jpg";
import gowRagnarok from "../assets/games/gow-ragnarok.jpg";
import gow from "../assets/games/gow.jpg";
import gta5 from "../assets/games/gta5.png";
import halfLife from "../assets/games/half-life.jpg";
import horizon from "../assets/games/horizon.webp";
import spiderMiles from "../assets/games/spiderman-miles.jpg";
import rdr2 from "../assets/games/rdr2.avif";
import re2 from "../assets/games/re2.jpg";
import re7 from "../assets/games/re7.jpg";
import silentHill2 from "../assets/games/silent-hill-2.jpg";
import spiderman2 from "../assets/games/spiderman2.avif";
import spiderman2018 from "../assets/games/spiderman2018.jpg";
import tlou1 from "../assets/games/tlou1.jpg";
import tlou2 from "../assets/games/tlou2.png";
import tombRaider from "../assets/games/tomb-raider.jpg";
import uncharted4 from "../assets/games/uncharted4.jpg";
import witcher3 from "../assets/games/witcher3.jpg";

// === NEW GAMES ===
import gta6 from "../assets/games/gta6.jpg";
import mw2 from "../assets/games/mw2.avif";
import cs2 from "../assets/games/cs2.jpg";

// === DATA ===
export const games = [
  { id: 1, title: "EA SPORTS FC 24", price: 49.99, category: "sports", image: fc24 },
  { id: 2, title: "GTA V", price: 19.99, category: "action", image: gta5 },
  { id: 3, title: "Red Dead Redemption 2", price: 29.99, category: "action", image: rdr2 },
  { id: 4, title: "Detroit: Become Human", price: 24.99, category: "story", image: detroit },

  { id: 5, title: "God of War", price: 34.99, category: "action", image: gow },
  { id: 6, title: "God of War Ragnarök", price: 59.99, category: "action", image: gowRagnarok },

  { id: 7, title: "Resident Evil 2", price: 19.99, category: "horror", image: re2 },
  { id: 8, title: "Resident Evil 7", price: 14.99, category: "horror", image: re7 },
  { id: 9, title: "Silent Hill 2", price: 49.99, category: "horror", image: silentHill2 },
  { id: 10, title: "Dying Light", price: 14.99, category: "horror", image: dyingLight },

  { id: 11, title: "Marvel's Spider-Man", price: 39.99, category: "action", image: spiderman2018 },
  { id: 12, title: "Spider-Man: Miles Morales", price: 29.99, category: "action", image: spiderMiles },
  { id: 13, title: "Spider-Man 2", price: 69.99, category: "action", image: spiderman2 },

  { id: 14, title: "The Last of Us Part I", price: 39.99, category: "story", image: tlou1 },
  { id: 15, title: "The Last of Us Part II", price: 39.99, category: "story", image: tlou2 },

  { id: 16, title: "The Witcher 3: Wild Hunt", price: 17.99, category: "rpg", image: witcher3 },
  { id: 17, title: "Horizon Zero Dawn", price: 19.99, category: "action", image: horizon },

  { id: 18, title: "Batman: Arkham City", price: 9.99, category: "action", image: batman },
  { id: 19, title: "Tomb Raider (2013)", price: 9.99, category: "adventure", image: tombRaider },
  { id: 20, title: "Uncharted 4", price: 19.99, category: "adventure", image: uncharted4 },

  { id: 21, title: "Assassin's Creed II", price: 9.99, category: "action", image: ac2 },
  { id: 22, title: "Half-Life", price: 7.99, category: "classic", image: halfLife },

  // === NEWLY ADDED ===
  { id: 23, title: "GTA 6", price: 80, category: "action", image: gta6 },
  { id: 24, title: "Call of Duty: MW2", price: 59.99, category: "shooter", image: mw2 },
  { id: 25, title: "CS2", price: 0, category: "shooter", image: cs2 },
];
