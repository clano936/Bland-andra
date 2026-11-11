<GameList>
För varje spel renderas ett <OneGame game={game} />.En komponent som använder useEffect och onValue för att lyssna på games i Firebase. Datan kommer som ett objekt { nyckel: spel, ... }. Den görs om till en lista där Firebase-nyckeln blir id, och sparas i state (games).  Eftersom onValue är en live-lyssnare uppdateras listan automatiskt när databasen ändras.

<OneGame> 
En komponent som tar emot ett spel som prop och visar namn, beskrivning, speltid och antal spelare. Namnet är en <Link to={'/game/' + game.id}>.

<OneGamePage> 
När användaren klickar på länken byter routern till /game/:id. OneGamePage läser id med useParams(), hämtar just det spelet med get() (en engångsläsning) och visar det. Under hämtningen visas “Laddar...”, och om spelet saknas visas “Spelet finns inte”.

_///////////////////////////////////////////////////////////////////////////////////////_
AppRouter
omsluter allt i BrowserRouter, som läser webbadressen. Routes väljer sedan vilken komponent som visas:

App
Startsidan (App) visar rubrik och layout och renderar <GameList />.

Game
definierar GameProps (id, name, description, time, people, imageUrl och flaggorna spicy, family och så vidare). Alla filer importerar typen, så att TypeScript kan varna om du stavar fel eller glömmer ett fält.
_///////////////////////////////////////////////////////////////////////////////////////_
src/
├── main.tsx Startpunkt, monterar appen i HTML
├── AppRouter.tsx Routing: vilken URL visar vilken sida
├── App.tsx Startsidan ("/")
├── firebase.ts Anslutning till databasen (exporterar db)
├── types/
│ └── Game.ts Typen GameProps (hur ett spel ser ut)
└── components/
├── GameList.tsx Hämtar alla spel och visar en lista
├── OneGame.tsx Ett spelkort i listan
└── OneGamePage.tsx Detaljsidan för ett spel ("/game/:id")
