import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BASE = "https://www.eklavya.in/images/FlipBooks/English/";
const BASE_WL = "https://www.eklavya.in/images/FlipBooks/Wordless/";

const sections = [
  { id: "beginning", label: "Beginning Readers" },
  { id: "young",     label: "Young Readers" },
  { id: "teen",      label: "Teen Readers" },
  { id: "religion",  label: "Religion & Spirituality" },
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
    cover: "data:image/jpeg;base64,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",
    url: "https://www.rupanugabhajanashram.com/wp-content/uploads/2022/03/Bhagavad-gita-Swami-BG-Narasingha.pdf"
  },
  {
    title: "The Holy Bible",
    cover: "data:image/jpeg;base64,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",
    url: "https://csbible.com/wp-content/uploads/2018/03/CSB_Pew_Bible_2nd_Printing.pdf"
  },
  {
    title: "The Holy Quran",
    cover: "data:image/jpeg;base64,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",
    url: "https://files.alislam.cloud/pdf/Holy-Quran-English.pdf"
  },
  {
    title: "Autobiography of a Yogi",
    cover: "data:image/jpeg;base64,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",
    url: "https://vidyaprabodhinicollege.edu.in/VPCCECM/ebooks/Exhibition/Autobiography%20of%20a%20YOGI.pdf"
  },
  {
    title: "The Alchemist",
    cover: "data:image/jpeg;base64,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",
    url: "https://icrrd.com/public/media/15-05-2021-084550The-Alchemist-Paulo-Coelho.pdf"
  },
  {
    title: "The Power of Now",
    cover: "data:image/jpeg;base64,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",
    url: "https://dn790003.ca.archive.org/0/items/ThePowerOfNowEckhartTolle_201806/The%20Power%20Of%20Now%20-%20Eckhart%20Tolle.pdf"
  },
  {
    title: "The Monk Who Sold Ferrari",
    cover: "https://www.getstoryshots.com/wp-content/uploads/The-Monk-Who-Sold-His-Ferrari-Summary-Review-Quotes-PDF-Robin-Sharma.png",
    url: "https://docs.google.com/file/d/1HMe75Hy3jEVK5EmDECZvsnX5B8W-rdJKu2Z7t6bOLJYeUA2Wlsd_BfiCR__9/edit"
  }
];

const booksMap = { beginning: beginningBooks, young: youngBooks, teen: teenBooks, religion: religionBooks };

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
  const books = booksMap[active];
  const filteredBooks = books.filter((book) =>
    matchesQuery([sections.find(s => s.id === active)?.label, book.title, book.author, book.url], searchQuery)
  );

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
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
