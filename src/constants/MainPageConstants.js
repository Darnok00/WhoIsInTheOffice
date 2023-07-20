const descriptionNegative = "Biuro puste :(";

const descriptionPositive = "Biuro otwarte :D";

const descriptionPlaceholder = "Wybierz herosa";

const optionsCharacters = [
  { label: "Lewandowski", value: "lewandowski" },
  { label: "Małysz", value: "malysz" },
  { label: "Sochan", value: "sochan" },
  { label: "Świątek", value: "swiatek" },
];

const dictCharactersImages = {
  sochan: require("../assets/images/sochan.png"),
  lewandowski: require("../assets/images/lewandowski.jpg"),
  malysz: require("../assets/images/malysz.jpg"),
  swiatek: require("../assets/images/swiatek.jpg"),
};

export {
  descriptionNegative,
  descriptionPlaceholder,
  descriptionPositive,
  dictCharactersImages,
  optionsCharacters,
};
