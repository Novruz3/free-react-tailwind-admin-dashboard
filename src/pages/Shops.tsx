import { useQuery } from "@tanstack/react-query"
import { getShops } from "../api/queries/Getters"


const Shops = () => {

  const {
    data: data,
    refetch: refetchShops,
    isLoading, 
    isError
  } = useQuery('getShops', () => getShops(), {
    refetchOnWindowFocus: false
  })

  return (
    <div>Shops</div>
  )
}

export default Shops