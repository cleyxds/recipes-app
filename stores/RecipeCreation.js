import create from "zustand"

const DEFAULT_STATE = {
  categories: [],
  description: "",
  specs: [null, 1, "Fácil"],
  summary: "",
  title: ""
}

const STEPS_DEFAULT_STATE = []

export const useRecipeCreationStore = create(set => ({
  recipe: DEFAULT_STATE,
  steps: STEPS_DEFAULT_STATE,
  setSteps: steps =>
    set(state => ({
      ...state,
      steps
    })),
  deleteStepByIndex: index =>
    set(state => ({
      ...state,
      steps: state.steps.filter((_, _index) => _index !== index)
    })),
  setRecipe: recipe =>
    set(state => ({
      ...state,
      recipe
    })),
  clearRecipeCreation: () =>
    set(state => ({
      ...state,
      steps: STEPS_DEFAULT_STATE,
      recipe: DEFAULT_STATE
    }))
}))
