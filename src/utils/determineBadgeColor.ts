export const determineBadgeColor = (type: string) => {
  switch (type) {
    case "Grass":
      return "success";
    case "Fire":
      return "danger";
    case "Water":
      return "primary";
    case "Electric":
      return "warning";
    case "Bug":
      return "dark";
    case "Normal":
      return "secondary";
    case "Poison":
      return "info";
    case "Ground":
      return "dark";
    case "Fairy":
      return "info";
    case "Fighting":
      return "danger";
    case "Psychic":
      return "warning";
    case "Rock":
      return "dark";
    case "Ghost":
      return "dark";
    case "Ice":
      return "info";
    case "Dragon":
      return "primary";
    case "Steel":
      return "secondary";
    case "Flying":
      return "primary";
    default:
      return "secondary";
  }
};
