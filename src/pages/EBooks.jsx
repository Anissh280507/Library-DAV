import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BASE = "https://www.eklavya.in/images/FlipBooks/English/";
const BASE_WL = "https://www.eklavya.in/images/FlipBooks/Wordless/";

const sections = [
  { id: "beginning", label: "Beginning Readers" },
  { id: "religion",  label: "Religion & Spirituality" },
  { id: "children",  label: "Children's Books", externalUrl: "https://drive.google.com/drive/folders/1eXNA2zE5k1XXlCfGDgpbBkjy1ru6GI55" },
  { id: "Arya Samaj",  label: "आर्य समाज साहित्य", externalUrl: "https://drive.google.com/drive/folders/1-YETplt45U4CycEFLCVvQ0GaEzk7dAs1?usp=sharing" },
  { id: "English Fiction",  label: "English Fiction", externalUrl: "https://drive.google.com/drive/folders/1z5wH2aKKKonpWn9exLHpTiVsYjSxuG_3?usp=sharing" },
  { id: "Kids",  label: "Kids Books", externalUrl: "https://drive.google.com/drive/folders/1dmELpyvR6HFeLkBr4NZdWZIU3hhIBsSK?usp=sharing" },
   { id: "Hindi Fiction",  label: "Hindi Fiction", externalUrl: "https://drive.google.com/drive/folders/1OeWa8apc9nG6RXE9R-c-K5D--JcHGyaG?usp=sharing" },
  
];

const beginningBooks = [
    // Hindi Books
  {
    title: "Tumne Mera Anda",
    cover: "https://www.eklavya.in/images/FlipBooks/Tumne_Mera_Anda.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Tumne_Mera_Anda/1/"
  },
  {
    title: "Tesu Raja",
    cover: "https://www.eklavya.in/images/FlipBooks/Tesu_Raja.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Tesu_Raja/1/"
  },
  {
    title: "Teen Dost",
    cover: "https://www.eklavya.in/images/FlipBooks/Teen_Dost.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Teen_Dost/1/"
  },
  {
    title: "Sir Ka Salaan",
    cover: "https://www.eklavya.in/images/FlipBooks/Sir_ka_Salaan.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Sir_ka_Salaan/1/"
  },
  {
    title: "Saap Ne Socha",
    cover: "https://www.eklavya.in/images/FlipBooks/Saap_ne_socha.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Saap_ne_socha/1/"
  },
  {
    title: "Pranav School Me 1 Din",
    cover: "https://www.eklavya.in/images/FlipBooks/Pranav-school-me-1-din.jpg",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Pranav-school-me-1-din/1/"
  },
  {
    title: "Patang Ke Karamat",
    cover: "https://www.eklavya.in/images/FlipBooks/Patang_ke_karamat.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Patang_ke_karamat/1/"
  },
  {
    title: "Pakshi",
    cover: "https://www.eklavya.in/images/FlipBooks/Pakshi.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Pakshi/1/"
  },
  {
    title: "Ont Ka Phool",
    cover: "https://www.eklavya.in/images/FlipBooks/Ont_ka_Phool.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Ont_ka_Phool/1/"
  },
  {
    title: "Nav Chali",
    cover: "https://www.eklavya.in/images/FlipBooks/Nav_Chali.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Nav_Chali/1/"
  },
  {
    title: "Me Toh Billi Hun",
    cover: "https://www.eklavya.in/images/FlipBooks/Me_Toh_Billi_Hun.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Me_Toh_Billi_Hun/1/"
  },
  {
    title: "Main Bhee",
    cover: "https://www.eklavya.in/images/FlipBooks/Main_Bhee.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Main_Bhee/1/"
  },
  {
    title: "Kimiya",
    cover: "https://www.eklavya.in/images/FlipBooks/Kimiya.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Kimiya/1/"
  },
  {
    title: "Khat",
    cover: "https://www.eklavya.in/images/FlipBooks/Khat.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Khat/1/"
  },
  {
    title: "Kardo Koeli",
    cover: "https://www.eklavya.in/images/FlipBooks/Kardo_koeli.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Kardo_koeli/1/"
  },

  {
    title: "Jald Bahut Jalad",
    cover: "https://www.eklavya.in/images/FlipBooks/Jald_bahut_Jalad.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Jald_bahut_Jalad/1/"
  },
  {
    title: "Hamari Gay Jani",
    cover: "https://www.eklavya.in/images/FlipBooks/Hamari_Gay_Jani.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Hamari_Gay_Jani/1/"
  },
  {
    title: "Haleem Chala Chand Par",
    cover: "https://www.eklavya.in/images/FlipBooks/Haleem_Chala_Chand_Par.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Haleem_Chala_Chand_Par/1/"
  },
  {
    title: "Haiko",
    cover: "https://www.eklavya.in/images/FlipBooks/Haiko.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Haiko/1/"
  },
  {
    title: "Dost",
    cover: "https://www.eklavya.in/images/FlipBooks/Dost.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Dost/1/"
  },
  {
    title: "Do Tote",
    cover: "https://www.eklavya.in/images/FlipBooks/Do_Tote.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Do_Tote/1/"
  },
  {
    title: "Cycle Par Kauva",
    cover: "https://www.eklavya.in/images/FlipBooks/Cycle_Par_Kauva.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Cycle_Par_Kauva/1/"
  },
  {
    title: "Chuhe Ko Milee Pencil",
    cover: "https://www.eklavya.in/images/FlipBooks/Chuhe_ko_milee_pencil.PNG",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Chuhe_ko_milee_pencil/1/"
  },
  {
    title: "Chhutki Gilhari",
    cover: "https://www.eklavya.in/images/FlipBooks/Chhutki_Gilhari.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Chhutki_Gilhari/1/"
  },
  {
    title: "Cheenta",
    cover: "https://www.eklavya.in/images/FlipBooks/Cheenta.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Cheenta/1/"
  },

  {
    title: "Bittu Bitti",
    cover: "https://www.eklavya.in/images/FlipBooks/Bittu_Bitti.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Bittu_Bitti/1/"
  },
  {
    title: "Bhaloo Ne Kheli Football",
    cover: "https://www.eklavya.in/images/FlipBooks/Bhaloo_Ne_Kheli_Football.PNG",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Bhaloo_Ne_Kheli_Football/1/"
  },
  {
    title: "Barish",
    cover: "https://www.eklavya.in/images/FlipBooks/Barish.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Barish/1/"
  },
  {
    title: "Barasta Tarbboz",
    cover: "https://www.eklavya.in/images/FlipBooks/Barasta_Tarbboz.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Barasta_Tarbboz/1/"
  },
  {
    title: "Balti Me Samunder",
    cover: "https://www.eklavya.in/images/FlipBooks/Balti_me_Samunder.png",
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-hindi#Balti_me_Samunder/1/"
  },
  {
    title: "Shadow of Darkness", 
    cover: `${BASE}Shadow_of_Darkness.png`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Shadow_of_Darkness/1/" 
  },
  { 
    title: "Three Friends", 
    cover: `${BASE}Three_Friends.png`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Three_Friends/1/" 
  },
  { 
    title: "Soon Very Soon", 
    cover: `${BASE}Soon_Very_Soon.png`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Soon_Very_Soon/1/" 
  },
  { 
    title: "How Pranav Went to School", 
    cover: `${BASE}PRANAV.png`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#PRANAV/1/" 
  },
  { 
    title: "Friends", 
    cover: `${BASE}Friends.png`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Friends/1/" 
  },
  { 
    title: "The Cricket Who Could Not Sing", 
    cover: `${BASE}Cricket_who_could_not_Sing.png`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Cricket_who_could_not_Sing/1/" 
  },
  { 
    title: "Niloufer's Smile", 
    cover: `${BASE}Nilofar_Ki_Muskan.png`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Niloufer_Smile/1/" 
  },
  { 
    title: "The Blue People", 
    cover: `${BASE}Blue_People.png`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#The_Blue_People/1/" 
  },

  { 
    title: "Rhyming Journey", 
    cover: "https://www.svineshonline.in/assets/book/nursery/rhyming-journey.png", 
    url: "https://www.svineshonline.in/flip-book-rhyming-journey-a" 
  },
  { 
    title: "Bal Geet", 
    cover: "https://www.svineshonline.in/assets/book/nursery/baalgeet.png", 
    url: "https://www.svineshonline.in/flip-book-balgeet-a" 
  },
  { 
    title: "Picture Dictionary", 
    cover: "https://www.svineshonline.in/assets/book/nursery/pictures-dictionary-a.png", 
    url: "https://www.svineshonline.in/flip-book-picture-dictionary-a" 
  },
  { 
    title: "English Alphabet", 
    cover: "https://www.svineshonline.in/assets/book/nursery/english-alphabet.png", 
    url: "https://www.svineshonline.in/flip-book-english-alphabet" 
  },
  { 
    title: "Akshar Gyan", 
    cover: "https://www.svineshonline.in/assets/book/nursery/akshar-gyaan.png", 
    url: "https://www.svineshonline.in/flip-book-akshar-gyan" 
  },
  { 
    title: "Akshar Rachna", 
    cover: "https://www.svineshonline.in/assets/book/nursery/akshar-rachna.png", 
    url: "https://www.svineshonline.in/flip-book-akshar-rachna" 
  },
  { 
    title: "Numbers 1-20", 
    cover: "https://www.svineshonline.in/assets/book/nursery/number.png", 
    url: "https://www.svineshonline.in/flip-book-nursery-1-20" 
  },
  { 
    title: "Capital Letters", 
    cover: "https://www.svineshonline.in/assets/book/nursery/capital-letter.png", 
    url: "https://www.svineshonline.in/flip-book-capital-letters" 
  },
  { 
    title: "Art and Craft", 
    cover: "https://www.svineshonline.in/assets/book/nursery/drawing-a.png", 
    url: "https://www.svineshonline.in/flip-book-art-and-craft-a" 
  },

  { 
    title: "The Little Red Hen", 
    cover: "https://www.eklavya.in/images/FlipBooks/English/The_Little_RED_Hen.png#joomlaImage://local-images/FlipBooks/English/The_Little_RED_Hen.png?width=200&height=150", 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#The_Little_Red_Hen/1/" 
  },
  { 
    title: "Tales of Her Ponytail", 
    cover: "https://www.eklavya.in/images/FlipBooks/English/Tales_of_her_ponytail.png#joomlaImage://local-images/FlipBooks/English/Tales_of_her_ponytail.png?width=200&height=267", 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Tales_of_Her_Ponytail/1/" 
  },
  { 
    title: "Rain", 
    cover: "https://www.eklavya.in/images/FlipBooks/English/RAIN.png#joomlaImage://local-images/FlipBooks/English/RAIN.png?width=300&height=313", 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Rain/1/" 
  },
  { 
    title: "The Mouse and the Pencil", 
    cover: "https://www.eklavya.in/images/FlipBooks/English/Mouse_and_the_pencil.PNG#joomlaImage://local-images/FlipBooks/English/Mouse_and_the_pencil.PNG?width=629&height=534", 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#The_Mouse_And_The_Pencil/1/" 
  },
  { 
    title: "Me Too", 
    cover: "https://www.eklavya.in/images/FlipBooks/English/Me_Too.png#joomlaImage://local-images/FlipBooks/English/Me_Too.png?width=200&height=169", 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Me_Too/1/" 
  },
  { 
    title: "Cows", 
    cover: "https://www.eklavya.in/images/FlipBooks/Cows.png#joomlaImage://local-images/FlipBooks/Cows.png?width=300&height=300", 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Cows/1/" 
  },
  { 
    title: "Aalai Goes Flying", 
    cover: "https://www.eklavya.in/images/FlipBooks/English/Aalai_goes_flying.png#joomlaImage://local-images/FlipBooks/English/Aalai_goes_flying.png?width=400&height=341", 
    url: "https://www.eklavya.in/books/flip-books/flip-books-in-english#Aalai_Goes_Flying/1/" 
  },

  { 
    title: "The Walking Stick", 
    cover: `https://www.eklavya.in/images/FlipBooks/Wordless/The_Walking_Stick-Wordless.jpg#joomlaImage://local-images/FlipBooks/Wordless/The_Walking_Stick-Wordless.jpg?width=1066&height=878`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-wordless#The_Walking_Stick/1/" 
  },
  { 
    title: "Loop – Chakkar", 
    cover: `https://www.eklavya.in/images/FlipBooks/Wordless/Loop-chakker-Wordless.jpg#joomlaImage://local-images/FlipBooks/Wordless/Loop-chakker-Wordless.jpg?width=759&height=609`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-wordless#Loop_Chakkar/1/" 
  },
  { 
    title: "Kashti", 
    cover: `https://www.eklavya.in/images/FlipBooks/Wordless/Kashti-Wordless.jpg#joomlaImage://local-images/FlipBooks/Wordless/Kashti-Wordless.jpg?width=636&height=519`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-wordless#Kashti/1/" 
  },
  { 
    title: "A Dog's Day", 
    cover: `https://www.eklavya.in/images/FlipBooks/Wordless/A_dog_Day.png#joomlaImage://local-images/FlipBooks/Wordless/A_dog_Day.png?width=200&height=243`, 
    url: "https://www.eklavya.in/books/flip-books/flip-books-wordless#A_Dogs_Day/1/" 
  }
];

const youngBooks = [
{
  title: "Pride and Prejudice",
  cover: "https://covers.openlibrary.org/b/title/Pride%20and%20Prejudice-L.jpg",
  url: "https://www.gutenberg.org/ebooks/1342"
},
{
  title: "Jane Eyre",
  cover: "https://covers.openlibrary.org/b/title/Jane%20Eyre-L.jpg",
  url: "https://www.gutenberg.org/ebooks/1260"
},
{
  title: "Treasure Island",
  cover: "https://covers.openlibrary.org/b/title/Treasure%20Island-L.jpg",
  url: "https://www.gutenberg.org/ebooks/120"
},
{
  title: "The Secret Garden",
  cover: "https://covers.openlibrary.org/b/title/The%20Secret%20Garden-L.jpg",
  url: "https://www.gutenberg.org/ebooks/113"
},
{
  title: "Little Women",
  cover: "https://covers.openlibrary.org/b/title/Little%20Women-L.jpg",
  url: "https://www.gutenberg.org/ebooks/514"
},
{
  title: "Alice's Adventures in Wonderland",
  cover: "https://covers.openlibrary.org/b/title/Alice%27s%20Adventures%20in%20Wonderland-L.jpg",
  url: "https://www.gutenberg.org/ebooks/11"
},
{
  title: "Peter Pan",
  cover: "https://covers.openlibrary.org/b/title/Peter%20Pan-L.jpg",
  url: "https://www.gutenberg.org/ebooks/16"
},
{
  title: "The Jungle Book",
  cover: "https://covers.openlibrary.org/b/title/The%20Jungle%20Book-L.jpg",
  url: "https://www.gutenberg.org/ebooks/236"
},
{
  title: "The Adventures of Tom Sawyer",
  cover: "https://covers.openlibrary.org/b/title/The%20Adventures%20of%20Tom%20Sawyer-L.jpg",
  url: "https://www.gutenberg.org/ebooks/74"
},
{
  title: "Black Beauty",
  cover: "https://covers.openlibrary.org/b/title/Black%20Beauty-L.jpg",
  url: "https://www.gutenberg.org/ebooks/271"
}
];

const teenBooks = [
{
  title: "Moby Dick",
  cover: "https://covers.openlibrary.org/b/title/Moby%20Dick-L.jpg",
  url: "https://www.gutenberg.org/ebooks/2701"
},
{
  title: "Dracula",
  cover: "https://covers.openlibrary.org/b/title/Dracula-L.jpg",
  url: "https://www.gutenberg.org/ebooks/345"
},
{
  title: "Frankenstein",
  cover: "https://covers.openlibrary.org/b/title/Frankenstein-L.jpg",
  url: "https://www.gutenberg.org/ebooks/84"
},
{
  title: "The Adventures of Huckleberry Finn",
  cover: "https://covers.openlibrary.org/b/title/The%20Adventures%20of%20Huckleberry%20Finn-L.jpg",
  url: "https://www.gutenberg.org/ebooks/76"
},
{
  title: "The Time Machine",
  cover: "https://covers.openlibrary.org/b/title/The%20Time%20Machine-L.jpg",
  url: "https://www.gutenberg.org/ebooks/35"
},
{
  title: "The Invisible Man",
  cover: "https://covers.openlibrary.org/b/title/The%20Invisible%20Man-L.jpg",
  url: "https://www.gutenberg.org/ebooks/5230"
},
{
  title: "Around the World in Eighty Days",
  cover: "https://covers.openlibrary.org/b/title/Around%20the%20World%20in%20Eighty%20Days-L.jpg",
  url: "https://www.gutenberg.org/ebooks/103"
},
{
  title: "Twenty Thousand Leagues Under the Seas",
  cover: "https://covers.openlibrary.org/b/title/Twenty%20Thousand%20Leagues%20Under%20the%20Seas-L.jpg",
  url: "https://www.gutenberg.org/ebooks/164"
},
{
  title: "The War of the Worlds",
  cover: "https://covers.openlibrary.org/b/title/The%20War%20of%20the%20Worlds-L.jpg",
  url: "https://www.gutenberg.org/ebooks/36"
},
{
  title: "Robinson Crusoe",
  cover: "https://covers.openlibrary.org/b/title/Robinson%20Crusoe-L.jpg",
  url: "https://www.gutenberg.org/ebooks/521"
},
{
  title: "The Scarlet Letter",
  cover: "https://covers.openlibrary.org/b/title/The%20Scarlet%20Letter-L.jpg",
  url: "https://www.gutenberg.org/ebooks/33"
},
{
  title: "A Tale of Two Cities",
  cover: "https://covers.openlibrary.org/b/title/A%20Tale%20of%20Two%20Cities-L.jpg",
  url: "https://www.gutenberg.org/ebooks/98"
},
{
  title: "Great Expectations",
  cover: "https://covers.openlibrary.org/b/title/Great%20Expectations-L.jpg",
  url: "https://www.gutenberg.org/ebooks/1400"
},
{
  title: "Oliver Twist",
  cover: "https://covers.openlibrary.org/b/title/Oliver%20Twist-L.jpg",
  url: "https://www.gutenberg.org/ebooks/730"
},
{
  title: "The Call of the Wild",
  cover: "https://covers.openlibrary.org/b/title/The%20Call%20of%20the%20Wild-L.jpg",
  url: "https://www.gutenberg.org/ebooks/215"
},
{
  title: "White Fang",
  cover: "https://covers.openlibrary.org/b/title/White%20Fang-L.jpg",
  url: "https://www.gutenberg.org/ebooks/910"
},
{
  title: "Heidi",
  cover: "https://covers.openlibrary.org/b/title/Heidi-L.jpg",
  url: "https://www.gutenberg.org/ebooks/20781"
},
{
  title: "The Wonderful Wizard of Oz",
  cover: "https://covers.openlibrary.org/b/title/The%20Wonderful%20Wizard%20of%20Oz-L.jpg",
  url: "https://www.gutenberg.org/ebooks/55"
},
{
  title: "The Wind in the Willows",
  cover: "https://covers.openlibrary.org/b/title/The%20Wind%20in%20the%20Willows-L.jpg",
  url: "https://www.gutenberg.org/ebooks/289"
},
{
  title: "The Swiss Family Robinson",
  cover: "https://covers.openlibrary.org/b/title/The%20Swiss%20Family%20Robinson-L.jpg",
  url: "https://www.gutenberg.org/ebooks/3836"
}
];

const religionBooks = [
  {
    title: "Bhagavad Gita",
    cover: "https://covers.openlibrary.org/b/id/12817242-L.jpg",
    url: "https://www.rupanugabhajanashram.com/wp-content/uploads/2022/03/Bhagavad-gita-Swami-BG-Narasingha.pdf"
  },
  {
    title: "The Holy Bible",
    cover: "https://covers.openlibrary.org/b/id/10534241-L.jpg",
    url: "https://csbible.com/wp-content/uploads/2018/03/CSB_Pew_Bible_2nd_Printing.pdf"
  },
  {
    title: "The Holy Quran",
    cover: "https://covers.openlibrary.org/b/id/8311410-L.jpg",
    url: "https://files.alislam.cloud/pdf/Holy-Quran-English.pdf"
  },
  {
    title: "Autobiography of a Yogi",
    cover: "https://covers.openlibrary.org/b/id/8233342-L.jpg",
    url: "https://vidyaprabodhinicollege.edu.in/VPCCECM/ebooks/Exhibition/Autobiography%20of%20a%20YOGI.pdf"
  },
  {
    title: "The Alchemist",
    cover: "https://covers.openlibrary.org/b/id/12711642-L.jpg",
    url: "https://icrrd.com/public/media/15-05-2021-084550The-Alchemist-Paulo-Coelho.pdf"
  },
  {
    title: "The Power of Now",
    cover: "https://covers.openlibrary.org/b/id/10433241-L.jpg",
    url: "https://dn790003.ca.archive.org/0/items/ThePowerOfNowEckhartTolle_201806/The%20Power%20Of%20Now%20-%20Eckhart%20Tolle.pdf"
  },
  {
    title: "The Monk Who Sold Ferrari",
    cover: "https://www.getstoryshots.com/wp-content/uploads/The-Monk-Who-Sold-His-Ferrari-Summary-Review-Quotes-PDF-Robin-Sharma.png",
    url: "https://docs.google.com/file/d/1HMe75Hy3jEVK5EmDECZvsnX5B8W-rdJKu2Z7t6bOLJYeUA2Wlsd_BfiCR__9/edit"
  }
];

const booksMap = { 
  beginning: beginningBooks, 
  young: youngBooks, 
  teen: teenBooks, 
  religion: religionBooks,
  children: [] 
};

function matchesQuery(values, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
}

function BookCard({ title, subtitle, cover, url }) {
  const inner = (
    <Card className="border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group h-full rounded-xl overflow-hidden p-0">
      <div className="overflow-hidden h-44 bg-gray-100">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${encodeURIComponent(title)}/300/380`; }}
        />
      </div>
      <CardContent className="pt-4 pb-4">
        <p className="font-semibold text-gray-800 text-sm leading-snug">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#1a1a6e]">
          Read Now {url && <ExternalLink size={11} />}
        </div>
      </CardContent>
    </Card>
  );

  return url
    ? <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline block h-full">{inner}</a>
    : <div className="h-full">{inner}</div>;
}

export default function EBooks({ searchQuery = "" }) {
  const [active, setActive] = useState("beginning");
  const books = booksMap[active] || [];
  const filteredBooks = books.filter((book) =>
    matchesQuery([sections.find(s => s.id === active)?.label, book.title, book.author, book.url], searchQuery)
  );

  const handleTabClick = (section) => {
    if (section.externalUrl) {
      window.open(section.externalUrl, "_blank", "noopener,noreferrer");
    } else {
      setActive(section.id);
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => handleTabClick(s)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all
              ${active === s.id
                ? "bg-[#1a1a6e] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-extrabold !text-black px-4 py-2 rounded-full">
          {sections.find(s => s.id === active)?.label}
        </h2>

        <Badge variant="secondary" className="text-xs">
          {filteredBooks.length} of {books.length} books
        </Badge>
      </div>

      <Separator className="mb-6" />

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBooks.map((b, i) => (
            <BookCard key={i} title={b.title} subtitle={b.author} cover={b.cover} url={b.url} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No books found.
        </div>
      )}
    </div>
  );
}