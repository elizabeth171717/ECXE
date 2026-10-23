
import boyWinterBdayBlack from "../assets/boy-winter-bday-black.png";
import boyWinterBdayWhite from "../assets/boy-winter-bday-white.png";
import boyCowboyBdayBlack from "../assets/boy-cowboy-bday-black.png";
import boyCowboyBdayWhite from "../assets/boy-cowboy-bday-white.png";
import boyEmojiBdayBlack from "../assets/boy-emoji-bday-black.png";
import boyEmojiBdayWhite from "../assets/boy-emoji-bday-white.png";
import girlEmojiBdayBlack from "../assets/girl-emoji-bday-black.png";
import girlEmojiBdayWhite from "../assets/girl-emoji-bday-white.png";
import boyDragonballBdayBlack from "../assets/boy-dragonball-bday-black.png";
import boyDragonballBdayWhite from "../assets/boy-dragonball-bday-white.png";
import girlDragonballBdayBlack from "../assets/girl-dragonball-bday-black.png";
import girlDragonballBdayWhite from "../assets/girl-dragonball-bday-white.png";
import boyPokemonBdayBlack from "../assets/boy-pokemon-bday-black.png";
import boyPokemonBdayWhite from "../assets/boy-pokemon-bday-white.png";
import girlPokemonBdayBlack from "../assets/girl-pokemon-bday-black.png";
import girlPokemonBdayWhite from "../assets/girl-pokemon-bday-white.png";
import girlColorfulBdayBlack from "../assets/girl-colorful-bday-black.png";
import girlColorfulBdayWhite from "../assets/girl-colorful-bday-white.png";
import girlHotpinkBdayBlack from "../assets/girl-hotpink-bday-black.png";
import girlHotpinkBdayWhite from "../assets/girl-hotpink-bday-white.png";
import girlGoldBdayBlack from "../assets/girl-gold-bday-black.png";
import girlGoldBdayWhite from "../assets/girl-gold-bday-white.png";
import girlCowboyBdayWhite from "../assets/girl-cowboy-bday-white.png";
import girlCowboyBdayBlack from "../assets/girl-cowboy-bday-black.png";

const products = [
  // Birthday T-Shirts
  {
    id: 1,
    name: "Winter B-day Shirt",
    price: 25,
    
    description: "Fun birthday design for girls",
    collectionId: 1,
     colors: {
    white: boyWinterBdayWhite,
    black: boyWinterBdayBlack,
  },
    options: [
      {
    name: "Color",
    values: ["White", "Black"],
  },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
     
    ],
  },
{
    id: 2,
    name: "Cowboy B-day Shirt",
    price: 25,
    
    description: "Fun birthday design for girls",
    collectionId: 1,
     colors: {
    white: boyCowboyBdayWhite,
    black: boyCowboyBdayBlack,
  },
    options: [
      {
    name: "Color",
    values: ["White", "Black"],
  },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
     
    ],
  },
  {
    id: 3,
    name: "Emoji B-day Shirt",
    price: 25,
    
    description: "Fun birthday design for girls",
    collectionId: 1,
     colors: {
    white: boyEmojiBdayWhite,
    black: boyEmojiBdayBlack,
  },
    options: [
      {
    name: "Color",
    values: ["White", "Black"],
  },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
     
    ],
  },
  {
    id: 4,
    name: "Dragonball B-day Shirt",
    price: 25,
    
    description: "Fun birthday design for girls",
    collectionId: 1,
     colors: {
    white: boyDragonballBdayWhite,
    black: boyDragonballBdayBlack,
  },
    options: [
      {
    name: "Color",
    values: ["White", "Black"],
  },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
     
    ],
  },
{
    id: 5,
    name: "Pokemon B-day Shirt",
    price: 25,
    
    description: "Fun birthday design for girls",
    collectionId: 1,
     colors: {
    white: boyPokemonBdayWhite,
    black: boyPokemonBdayBlack,
  },
    options: [
      {
    name: "Color",
    values: ["White", "Black"],
  },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
     
    ],
  },



  {
    id: 6,
    name: "Dragonball B-day Shirt",
    price: 25,
    
    description: "Fun birthday design for girls",
    collectionId: 2,
     colors: {
    white: girlDragonballBdayWhite,
    black: girlDragonballBdayBlack,
  },
    options: [
      {
    name: "Color",
    values: ["White", "Black"],
  },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
     
    ],
  },
 
  {
    id: 7,
    name: "Emoji B-day Shirt",
    price: 25,
    
    description: "Fun birthday design for girls",
    collectionId: 2,
     colors: {
    black: girlGoldBdayBlack,
    white: girlGoldBdayWhite,
  },
    options: [
      {
    name: "Color",
    values: ["White", "Black"],
  },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
     
    ],
  },
  {
    id: 8,
    name: "Cowboy B-day Shirt",
    price: 25,
    
    description: "Fun birthday design for girls",
    collectionId: 2,
     colors: {
    black: girlCowboyBdayBlack,
    white: girlCowboyBdayWhite,
  },
    options: [
      {
    name: "Color",
    values: ["White", "Black"],
  },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
     
    ],
  },
];

export default products;