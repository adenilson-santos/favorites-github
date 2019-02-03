const INITIAL_STATE =
  JSON.parse(localStorage.getItem("@myrepos:Favorites")) || [];

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.payload.repository];
    case "RM_FAVORITE":
      return state.filter(
        repository => repository.full_name !== action.payload.name
      );
    case "UP_FAVORITE":
      return state.map(repo =>
        repo.id === action.payload.id ? action.payload.repository : repo
      );
    default:
      return state;
  }
}
