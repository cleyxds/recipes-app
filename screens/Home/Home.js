import { ScrollView } from "react-native"

import { Screen, OptimizedScrollView } from "../../components"

import { RecipesCarousel, CardList } from "./components"

export function Home() {
  const data = [
    {
      thumbnail:
        "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      description: "Salada no almoço (dieta)",
      likes: 125
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      description: "Description",
      likes: 591
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1604634077373-a279cadc62c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Panquecas de café da manhã estilo americano",
      likes: 213
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1602873520153-ec56ca3c205b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      description: "Feijão carioca receita de familia nordestina",
      likes: 1047
    }
  ]

  const todayRecipes = [
    {
      thumbnail:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
      title: "Hamburger crocante de frango estilo coreano",
      time: "30 min",
      likes: 12000,
      author: "Janemo",
      timestamp: Date.now()
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1528736235302-52922df5c122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1254&q=80",
      title: "Torrada estilo americana com queijo",
      time: "10 min",
      likes: 8601,
      author: "ReiDaTorrada",
      timestamp: Date.now()
    }
  ]

  return (
    <Screen>
      <OptimizedScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <RecipesCarousel data={data} />

        <CardList
          title="Receitas de hoje"
          data={todayRecipes}
          style={{ marginTop: "25%" }}
        />

        <CardList
          type="category"
          title="Categorias"
          data={["Prato principal", "Café da manhã", "Almoço", "Regionais"]}
          style={{ marginTop: "5%" }}
        />

        <CardList
          type="popular"
          horizontal={false}
          title="Receitas populares"
          data={todayRecipes}
          style={{ marginTop: "5%" }}
        />
      </OptimizedScrollView>
    </Screen>
  )
}
