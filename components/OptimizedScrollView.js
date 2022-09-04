import { FlatList } from "react-native"

export function OptimizedScrollView(props) {
  return (
    <FlatList
      {...props}
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={() => <>{props.children}</>}
      ListEmptyComponent={null}
      keyExtractor={() => "blank"}
    />
  )
}
